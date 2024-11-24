// import  Swal from 'sweetalert2';
const buttonOne = document.getElementById ("button-add-package");
const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");
const storedDataItem = localStorage.getItem("dataStorage");
// const storedDataReg = localStorage.getItem("dataStorageTwo");
// const allStoredDataReg = JSON.parse(storedDataReg);
const allStoredData = JSON.parse(storedDataItem);
let ownParent = document.querySelectorAll(".own_status");

let packageStatus;

if(allStoredData){

}else{
    setTimeout(() => {
        location.href = "../page-login.html";
    })
}

// console.log(preloaderParent);
let number;
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




async function fetchPackageData(customerAccountId) {
 const starting_time = Date.now();
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/dispatched/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        const end_time = Date.now();
        const loading_time = end_time - starting_time;
        console.log("loading time:",loading_time);
        if(loading_time){
          const preloaderParent = document.querySelector(".preloader-parent");
          preloaderParent.style.display = "none";
        }else{
          const preloaderParent = document.querySelector(".preloader-parent");
          preloaderParent.style.display = "flex";
        }
        return  data;
    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

let packageCounter = 1;

// function to generate the card HTML for each package
const  generateCard = async (packageData) => {
  displayColors();
    // console.log(packageData.id)
       await displayPackageStatus(packageData.id);
    //  console.log(packageStatus);
      return `
      <div class="card" id="card-${packageData.id}">
      <h4 class="package-heading"><span>
      ${packageCounter++}
      </span><span>${packageData.package_number}</span> </h4>
      <p class="flex-package"> <span>Package Description:</span><span>${packageData.package_description} </span> </p>
      <hr/>
      <p class="flex-package"><span>Shop Contact:</span><span>${packageData.shop_contact}</span></p>
      <hr/>
      ${packageData.cancel_status !== "cancelled" ? ` <p class="flex-package"> <span>Cancellation Reason:</span><span> Order not cancelled</span> </p>` : ` <p class="flex-package"> <span>Cancellation Reason:</span><span>${packageData.cancel_reason} </span> </p>`}
      <hr/>
      <p class="flex-package"><span>Dispatch Date:</span><span>${packageData.preffered_dispatch_date === null ? "Date Not Set" : packageData.preffered_dispatch_date}</span></p>
    </div>
      `;


}

// code for removing the card /deleting the card

const swalDelete = (e) =>{
    new swal({
        title:"confirmation",
        text:"Are you sure you want to proceed?",
        icon:"question",
        showCancelButton: true,
        confirmButtonText: "yes",
        showLoaderOnConfirm: true,
       preConfirm: () => {
        return new Promise((resolve) => {
         handleDeleteClick(e);
         resolve();
        })
       }
      }).then((result) => {
        if(result.isConfirmed) {
           new swal('Action confirmed', 'You have deleted the card successfully', 'success');
          setTimeout(() => {
            location.reload();
          },2000)
        }else if(result.dismiss === swal.DismissReason.cancel) {
        //    new swal("Action");
        }
      })
}


const removeCardFromDisplay = (packageId) =>{
 const card = document.getElementById(`card-${packageId}`);
 if(card){
    card.remove();
 }
}

// sending requesting to database for that card to be deleted.

// message delete



const handleDeleteClick = async (event) => {
  const packageId = event.target.dataset.packageId;
  if(!packageId){
    console.log("missing the packageId");
    return;
  }else{
    removeCardFromDisplay(packageId);
  }


  try{
    const response = await fetch(`https://api5.staging.iguru.co.ke/api/package/${packageId}`,{
        method:"DELETE",
    });
    if(!response.ok){
     throw new Error("Failed to delete the package");
    }{
    //  workingNotifier("")
    setTimeout(() => {
      location.reload();
     });
    }
    removeCardFromDisplay(packageId);
  }catch(error){
    console.error("Error deleting the package:",error);
  }
}

document.getElementById("cardscontainer").addEventListener("click",(e)=>{
  e.preventDefault();
    if(e.target.classList.contains("btn-delete")){
      swalDelete(e);
    }
})

// document.getElementById("btn-delete").addEventListener("click",()=>{

// })



// function for editing the package



document.getElementById("cardscontainer").addEventListener("click",(e) => {
    if(e.target.classList.contains("btn-edit")){
      const packageId = e.target.dataset.packageId;
      console.log(packageId);
      window.location.href = `../edit-details.html?packageId=${packageId}`;
    }
})

// function to display the cards

async function displayPackages() {
    const cardContainer = document.getElementById("cardscontainer");
    cardContainer.innerHTML = "";
    const customerAccountId =allStoredData.user.id;
    // console.log(customerAccountId)
    const packageDatashow = await fetchPackageData(customerAccountId);
    // console.log(packageDatashow);
    if(packageDatashow.data.length === 0){
      const cardContainer = document.getElementById("cardscontainer");
      const message = `<p> You don't have dispatched Order</p>`;
      cardContainer.innerHTML = message;
    }else{

      packageDatashow.data.forEach(async (packageType)=>{
        if(packageType.verification_status === "yes" && packageType.dispatch_status === "dispatched" && packageType.cancel_status !== "cancelled" && packageType.confirmation_status === "confirmed" && packageType.returned_status !== "returned" && packageType.complete_status !== "completed"){
          const cardHTML = await generateCard(packageType);
          cardContainer.innerHTML += cardHTML;
          displayColors();
        }else{

        }
    });
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



const addPackage = (e) =>{
    e.preventDefault();
  setTimeout(() => {
    location.href = "../blog-full-width.html";
  })
}

function logOutWorking (message){
    Swal({
        title:"",
        text:message,
        icon:"success"
    })
}






// code for package status




displayPackages();

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