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
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/allcustomerpackages/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        console.log(data);
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
       await displayPackageStatus(packageData.id);
    //  console.log(packageStatus);

        return `
        <div class="card" id="card-${packageData.id}">
        <h4 class="icons_headers_package"><img src="img/package1.png"></h4>
        <hr/>
        <p class="flex-package" id="package_numbers"> <span>Package Number:</span><span>${packageData.package_number} </span> </p>
        <hr/>
        <p class="flex-package"> <span>Package Description:</span><span>${packageData.package_description} </span> </p>
        <hr/>
        <p class="flex-package"><span>Shop Contact:</span><span>${packageData.shop_contact}</span></p>
        <hr/>
        ${packageData.cancel_status !== "cancelled" ? ` <p class="flex-package"> <span>Cancellation Reason:</span><span> Order not cancelled</span> </p>` : ` <p class="flex-package"> <span>Cancellation Reason:</span><span>${packageData.cancel_reason} </span> </p>`}
        <hr/>
        <p class="flex-package"><span>Dispatch Date:</span><span>${packageData.preffered_dispatch_date === null ? "Date Not Set" : packageData.preffered_dispatch_date}</span></p>
        <hr/>
        <div class="form-groups forms-group-two">
      <button type="submit"  class="btn btn-edit yellow-color float-end" data-loading-text="Loading..." data-package-id="${packageData.id}"><span class="material-symbols-outlined">
      calendar_today
      </span>Choose Dispatch Date</button>

    </div>
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

const swalEdit = (e) =>{
  e.preventDefault();
  const packageIds = e.target.dataset.packageId;
  console.log(packageIds);
    new swal({
        title: 'Dispatch Date',
        html: `
     <div class="form-group hide-overflow row">
<div class="forms-child">
    <input class="form-control dispatch-date text-3 h-auto py-2 input" placeholder="Choose Date"  type="date"  name="preffered_dispatch_date" id="preffered_dispatch_date" required>
</div>
</div>
     `,
        // showCancelButton: true,
        confirmButtonText: "submit",
        focusConfirm: false,
        preConfirm: async () => {

          const dispatchDate= document.getElementById("preffered_dispatch_date").value;

          // formdata object
          const editData = new FormData ();

          //  appending the output

          editData.append("preffered_dispatch_date",dispatchDate);
          editData.append("package_id",packageIds);

          console.log([...editData]);
            // sending edited data to the database
              try {
            const response = await fetch(`https://api5.staging.iguru.co.ke/api/dispatchdate`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(Object.fromEntries(editData)),
            });
            if (!response.ok) {
              throw new Error("Failed to save changes");
            }
            return await response.json();
          } catch (error) {
            new swal.showValidationMessage(`Error ${error.message}`);
          }
        },
    })
     .then(result => {
        if(result.isConfirmed) {
            new swal("Changes saved!", "Your changes have been successfully saved.", "success");
        }
     });
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




// function to display the cards

async function displayPackages() {
    const cardContainer = document.getElementById("cardscontainer");
    cardContainer.innerHTML = "";
    const customerAccountId =allStoredData.user.id;
    // console.log(customerAccountId)
    const packageDatashow = await fetchPackageData(customerAccountId);

    if(packageDatashow.data.length === 0){
     const preloaderParent = document.querySelector(".preloader-parent");
      preloaderParent.style.display = "flex";
    }else{
      const preloaderParent = document.querySelector(".preloader-parent");
      preloaderParent.style.display = "none";
      packageDatashow.data.forEach(async (packageType)=>{
       if(packageType.dispatch_status !== "dispatched" && packageType.cancel_status !== "cancelled" && packageType.returned_status !== "returned" && packageType.complete_status !== "completed"){
        const cardHTML = await generateCard(packageType);
        cardContainer.innerHTML += cardHTML;
        displayColors();
        const cardShow = document.querySelector(".card");
        showCardPackages(cardShow);
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

function logOutWorking (message){
    Swal({
        title:"",
        text:message,
        icon:"success"
    })
}


// code for saving the dispatched date

document.getElementById("cardscontainer").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    swalEdit(e);
  }
})



// code for package status




displayPackages();

const showCardPackages = (cardShow) =>{
  if(cardShow){
   console.log("working");
   const preloaderParent = document.querySelector(".preloader-parent");
   preloaderParent.style.display = "none";
  }else{
   console.log("not working");
   const cardContainer = document.getElementById("cardscontainer");
   const message = `<p> You don't have a verified order</p>`;
   cardContainer.innerHTML = message;
  }
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