const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");
const storedData = localStorage.getItem("dataStorage");
// const storedDataReg = localStorage.getItem("dataStorageTwo");
// const allStoredDataReg = JSON.parse(storedDataReg);
const allStoredData = JSON.parse(storedData);
// console.log(allStoredData)

// edit-script.js

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

// if(allStoredData){
//   const senderName = allStoredData.user.customer_name;
// const senderPhone = allStoredData.user.customer_phone;
//   userNameOne.textContent = senderName;
//   userPhoneOne.textContent = senderPhone;
// }else{
//   setTimeout(() => {
//     location.href = "../page-login.html";
// })
// }

const editForm = document.getElementById('edit-form');

  // e.preventDefault();
   const packageId = getPackageIdFromQuery();
  // console.log(packageId);
  fetch(`https://api5.staging.iguru.co.ke/api/package/${packageId}`)
  .then(response => {
    if(!response.ok){
      throw new Error ("Failed to get the user data");
    }
    return response.json();
  })
  .then(data => {

    document.getElementById("package_description").value = data.data.package_description;
    document.getElementById("collect_from").value = data.data.collect_from;
    // document.getElementById("building").value = data.data.building;
    // document.getElementById("shop_number").value = data.data.shop_number;
    document.getElementById("shop_contact").value = data.data.shop_contact;
    // document.getElementById("package_type").value = data.data.package_type;
    document.getElementById("Mpesa_code").value = data.data.Mpesa_code;
    document.getElementById("user_town").value = data.data.user_town;
    document.getElementById("user_names").value = data.data.user_names;
    document.getElementById("user_contacts").value = data.data.user_contacts;
    document.getElementById("extra_instruction").value = data.data.extra_instruction;
    // document.getElementById("user_floor").value = data.data.user_floor;
    // document.getElementById("user_road").value = data.data.user_road;
  })


editForm.addEventListener('submit', async (event) => {
  event.preventDefault();
const packageId = getPackageIdFromQuery();
// console.log(packageId);

  // Create an object with edited details
  const formEdit = new FormData (editForm);
  const mydate = new Date ();
  const sendYear = mydate.getFullYear();
  const sendMonth = mydate.getMonth() + 1;
  const sendDates = mydate.getDate();
  const fullDate = [sendYear,sendMonth,sendDates].join('/');
  const senderName = allStoredData.user.customer_name;
  const senderPhone = allStoredData.user.customer_phone;
  const senderLocation = allStoredData.user.customer_location;
  const receiverName = allStoredData.user.customer_name;
  const receiverPhone = allStoredData.user.customer_phone;
  const receiverLocation = allStoredData.user.customer_location;
  const customerId = allStoredData.user.id;
  formEdit.append("sender_name",senderName);
  formEdit.append("sender_phone",senderPhone);
  formEdit.append("sender_location",senderLocation);
  formEdit.append("reciever_name",receiverName);
  formEdit.append("reciever_phone",receiverPhone);
  formEdit.append("reciever_location",receiverLocation);
  formEdit.append("customer_account_id",customerId);
  formEdit.append("package_date",fullDate);
  // console.log([...formEdit]);
  // Send edited data to the server using an API request (e.g., fetch)
  try {
    const response = await fetch(`https://api5.staging.iguru.co.ke/api/package/${packageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formEdit)),
    });

    if (!response.ok) {

      throw new Error('Failed to save changes');
    }

    // Handle success

    workingNotifier("Changes saved successfully");

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
},false);

function getPackageIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('packageId');
}

function workingNotifier (message){
    new swal({
        title:"",
        text:message,
        icon:"success"
    }).then(result => {
      if(result.isConfirmed){
        window.location.href = '../page-user-profile.html';
      }
    })
}