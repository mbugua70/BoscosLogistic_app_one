const storedDataItem = localStorage.getItem("dataStorage");
const allStoredData = JSON.parse(storedDataItem);
const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");


if(allStoredData){

}else{
    setTimeout(() => {
        location.href = "../page-login.html";
    })
}

document.getElementById("take_blog").addEventListener("click",(e)=>{
e.preventDefault();
setTimeout(() => {
    location.href = "../blog-full-width.html";
})
})

// user details
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

// all orders code
const customerAccountId =allStoredData.user.id;
console.log(customerAccountId);
async function fetchPackageAllOrder() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/allcustomerpackagescount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("all_orders").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageAllOrder();

// verified orders

async function fetchPackageVerifiedOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/custverifiedorderscount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_verified").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageVerifiedOrders();

// confirmed

async function fetchPackageConfirmedOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/confirmedcount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_confirmed").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageConfirmedOrders();

// colllected

async function fetchPackageCollectedOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/collectedcount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_collected").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageCollectedOrders();

// completed

async function fetchPackageCompletedOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/completedcount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_completed").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageCompletedOrders();

// dispatched

async function fetchPackageDispatchedOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/dispatchedcount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_dispatched").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageDispatchedOrders();

// cancelled

async function fetchPackageCancelledOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/cancelledcount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_cancelled").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageCancelledOrders();

// returned

async function fetchPackageReturnedOrders() {
    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/returnedorderscount/${customerAccountId}`, {
            method:"GET",
            headers:{
                'Content-Type':'application/json',
              }
        });
        if(!response.ok){
            throw new Error("Failed to fetch package data");
        }
        const data = await response.json();
        if(response.ok){
        document.getElementById("order_returned").textContent = data.data;
        }

    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackageReturnedOrders();