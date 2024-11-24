const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");
const storedData = localStorage.getItem("dataStorage");
const allStoredData = JSON.parse(storedData),
profileForm = document.getElementById("profile_form");
const customerId = allStoredData.user.id;

if(allStoredData){

}else{
    setTimeout(() => {
        location.href = "../page-login.html";
    })
}


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
                    document.getElementById('profile_username').value = itemuser.customer_name;
                    document.getElementById('profile_phone').value =  itemuser.customer_phone;
                    document.getElementById('profile_location').value = itemuser.customer_location;
                    // document.getElementById('profile_password').value = allStoredData.user.password;
                    const senderName = itemuser.customer_name;
                    const senderPhone = itemuser.customer_phone;
                      userNameOne.textContent = senderName;
                      userPhoneOne.textContent = senderPhone;
                }else{
                }
            }
        })


    }catch(error){
        console.error('Error fetching package data:',error);
        return [];
    }
}

fetchPackagaUser();
if(allStoredData){
    document.getElementById('profile_username').value = allStoredData.user.customer_name;
    document.getElementById('profile_phone').value =  allStoredData.user.customer_phone;
    document.getElementById('profile_location').value = allStoredData.user.customer_location;
    // document.getElementById('profile_password').value = allStoredData.user.password;
    const senderName = allStoredData.user.customer_name;
    const senderPhone = allStoredData.user.customer_phone;
      userNameOne.textContent = senderName;
      userPhoneOne.textContent = senderPhone;
}else{
    setTimeout(() => {
        location.href = "../page-login.html";
    })
}


profileForm.addEventListener("submit",async (event) => {
    event.preventDefault();
    const profileData = new FormData();
    const customerName = document.getElementById('profile_username').value;
    const customerPhone = document.getElementById('profile_phone').value;
    const customerLocation = document.getElementById('profile_location').value;
    profileData.append("customer_name",customerName);
    profileData.append("customer_phone",customerPhone);
    profileData.append("customer_location",customerLocation);


    try{
        const response = await fetch(`https://api5.staging.iguru.co.ke/api/update/${customerId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(profileData)),
        })
        if(!response.ok){
            throw new Error('Failed to save changes');
        }

        workingNotifier("Changes saved successfully");
        console.log(profileData);
        // const newLocalStorage = JSON.stringify(profileData);
        //  localStorage.setItem("dataStorage", loginInfoStored);
        const data = await response.json();
        console.log(data);
        // const loginInfoStored = JSON.stringify(data);
        // localStorage.setItem("dataStorage", loginInfoStored);

    }catch (error){
    console.log(`Error: ${error.message}`);
    }
})

function workingNotifier (message){
    new swal({
        title:"",
        text:message,
        icon:"success"
    }).then((result) => {
        if(result.isConfirmed){
            fetchPackagaUser();
           location.reload();
        }
    })
}