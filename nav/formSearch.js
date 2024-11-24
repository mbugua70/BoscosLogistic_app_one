const storedDataItem = localStorage.getItem("dataStorage");
const searchElement = document.getElementById("search_open");
let $searchInput = $("#search_parent");
const searchStore = document.getElementById("search_parent");
const allStoredData = JSON.parse(storedDataItem);
const buttonOne = document.getElementById("button-add-package");
const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");
let ownParent = document.querySelectorAll(".own_status");
const searchInput = document.getElementById("search-input");
let searchController = new AbortController();
let packageStatus;
let number;
let packageCounter = 1;
let isLoading = false;
let debounceClear;

document.getElementById("search_open").addEventListener("click",function(){
    console.log("clicked");
   if(searchStore.style.display === "block"){
    searchStore.style.display = "none";
    searchStore.style.animation = "fade-out 4s 1s ease-out forwards";
   }else{
    searchStore.style.display = "block";
    searchStore.style.animation = "fade-in 1s ease-in forwards"
   }
  })

const handleSearch = _.debounce(async function(){
    const query = this.value.trim().toLowerCase();
    clearTimeout(debounceClear);
    const cardContainers = document.getElementById('cardscontainer');
    cardContainers.innerHTML = "";
     searchController.abort();
     searchController = new AbortController();
     const packageDatashow =  await filterPackages(query,searchController.signal);
     console.log(packageDatashow);
     displayPackages(packageDatashow)

    //  debounceClear = setTimeout(() => {
    //   displayPackages(query,searchController);
    //  },250)


})


  searchInput.addEventListener("input", handleSearch);
// console.log(preloaderParent);

async function fetchPackagaUser() {
  try{
      const response = await fetch(`https://api5.staging.iguru.co.ke/api/CustomerAccounts`, {
          method:"GET",
          headers:{
              'Content-Type':'application/json',
            }
      });
      if(!response.ok){
          throw new Error("Failed to fetch package data");
      }
      const data = await response.json();

      const mapData = data.data;
      mapData.map((itemuser) => {

          if(itemuser){
              if(itemuser.id === allStoredData.user.id){
                  // document.getElementById('profile_password').value = allStoredData.user.password;
                  const senderName = itemuser.customer_name;
                  const senderPhone = itemuser.customer_phone;
                    userNameOne.textContent = senderName;
                    userPhoneOne.textContent = senderPhone;
              }else{

              }
          }else{
            setTimeout(() => {
              location.href = "../page-login.html";
          })
          }
      })


  }catch(error){
      console.error('Error fetching package data:',error);
      return [];
  }
}

fetchPackagaUser();

async function filterPackages(query,signal) {
    if(isLoading) return;
    try {
      // Fetch the package data using the query parameter
      const response = await fetch(`https://api5.staging.iguru.co.ke/api/search/${encodeURIComponent(query)}`,{
        signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }finally{
     isLoading = false;
    }
  }




  async function displayPackages(packageDatashow) {
    const cardContainer = document.getElementById("cardscontainer");
    cardContainer.innerHTML = "";
    const customerAccountId =allStoredData.user.id;
    // console.log(customerAccountId)
    // const packageDatashow = await filterPackages(query,abortingSearch.signal);

    // console.log(packageDatashow);
   if(packageDatashow.data.length === 0){
        cardContainer.innerHTML = `<p> No results found</p>`;
   }else{
       packageDatashow.data.forEach(async (packageType)=>{
      // console.log(packageType.package_number);
       if(customerAccountId === packageType.customer_account_id){
        const cardHTML = await generateCard(packageType);
        cardContainer.innerHTML += cardHTML;
        displayColors();
       }
    });
   }


}

// function to generate the card HTML for each package
const  generateCard = async (packageData) => {

    packageCounter = 1;
  displayColors();
    // console.log(packageData.id)
       await displayPackageStatus(packageData.id);
    //  console.log(packageStatus);
      return `
      <div class="card" id="card-${packageData.id}">
      <h4 class="package-heading"><span>
      ${packageCounter++}
      </span><span class="unique_number">${packageData.package_number}</span> </h4>
      <p class="flex-package"> <span>Package Description:</span><span>${packageData.package_description} </span> </p>
      <hr/>
      <p class="flex-package"> <span>Shop Number:</span><span>${packageData.shop_number}</span>  </p>
      <hr/>
      <p class="flex-package"><span>Shop Contact:</span><span>${packageData.shop_contact}</span></p>
      <hr/>
      <p class="flex-package"><span>Dispatch Date:</span><span>${packageData.preffered_dispatch_date === null ? "Date Not Set" : packageData.preffered_dispatch_date}</span></p>
    </div>
      `;


}

// code for removing the card /deleting the card


const removeCardFromDisplay = (packageId) =>{
 const card = document.getElementById(`card-${packageId}`);
 if(card){
    card.remove();
 }
}


const spinnerEl = document.querySelector(".spinner-grow");

async function displayPackageStatus (packageDataID) {

 try{
  const response = await fetch(`https://api5.staging.iguru.co.ke/api/allpackages`);
  if(!response.ok){
    throw new Error ("Failed to fetch data");

  }

  const data = await response.json();
  const storageData = data.data;


  storageData.map((items) => {

if(items.id === packageDataID){
          if(items.verification_status === "yes" && items.cancel_status !== "cancelled" && items.returned_status !== "returned" && items.collection_status !== "collected" && items.confirmation_status !== "confirmed" && items.dispatch_status !== "dispatched" && items.complete_status !== "completed"){
           packageStatus =  "Verified";
           }else if( items.verification_status === "yes" && items.collection_status === "collected" &&  items.cancel_status !== "cancelled" && items.dispatch_status !== "dispatched" && items.returned_status !== "returned" && items.confirmation_status !== "confirmed"){
           packageStatus = "Collected";
          }else if( items.verification_status === "yes" && items.dispatch_status === "dispatched" && items.cancel_status !== "cancelled" && items.confirmation_status === "confirmed" && items.returned_status !== "returned" && items.complete_status !== "completed"){
            packageStatus = "Dispatched";
          }else if(items.verification_status === "yes" && items.confirmation_status === "confirmed" && items.returned_status !== "returned" && items.cancel_status !== "cancelled" && items.dispatch_status !== "dispatched"  && items.complete_status !== "completed"){
            packageStatus =  "Confirmed";
          }else if(items.verification_status === "yes" && items.confirmation_status === "confirmed" && items.dispatch_status === "dispatched" && items.collection_status === "collected"  && items.complete_status === "completed" && items.returned_status !== "returned"){
            packageStatus =  "Completed";
          }else if(items.cancel_status === "cancelled" && items.returned_status !== "returned"){
           packageStatus  =  "Cancelled";
          }else if(items.returned_status === "returned"){
            packageStatus = "Returned";
          }else{
            packageStatus = "Processing"
          }
    }

  })
 }catch(error){
   console.log("Error:", error);
 }

}

const  displayColors = () => {
 let colorsHolder = document.querySelectorAll(".own_status");
 colorsHolder.forEach((colorsHolderItems) => {
    if(colorsHolderItems.textContent === "Verified"){
      console.log(colorsHolderItems.textContent)
      colorsHolderItems.style.backgroundColor = "#360ef1";
    }else if(colorsHolderItems.textContent === "Collected"){
      colorsHolderItems.style.backgroundColor = "#77718e";
    }else if(colorsHolderItems.textContent === "Confirmed"){
      colorsHolderItems.style.backgroundColor = "#fc8203";
    }else if(colorsHolderItems.textContent === "Dispatched"){
      colorsHolderItems.style.backgroundColor = "#5bad52"
    }else if(colorsHolderItems.textContent === "Completed"){
      colorsHolderItems.style.backgroundColor = "#f79908";
    }else if(colorsHolderItems.textContent === "Cancelled"){
      colorsHolderItems.style.backgroundColor = "#ee1a11";
    }else if(colorsHolderItems.textContent === "Returned"){
      colorsHolderItems.style.backgroundColor = "#9f0d01";
    }

 })
}


function logOutWorking (message){
    Swal({
        title:"",
        text:message,
        icon:"success"
    })
}


if(allStoredData){

}else{
    setTimeout(() => {
        location.href = "../page-login.html";
    })
}




  /*
preloader component

<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-warning" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>
*/