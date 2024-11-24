const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");
const storedData = localStorage.getItem("dataStorage");
// const storedDataReg = localStorage.getItem("dataStorageTwo");
const allStoredData = JSON.parse(storedData);
// const allStoredDataReg = JSON.parse(storedDataReg);
// console.log(allStoredData);
// console.log(allStoredDataReg.user.customer_name);
// console.log(allStoredData.CustomerAccount.id);
console.log("clicked");

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
      console.log(data.data);
      const mapData = data.data;
      mapData.map((itemuser) => {
          console.log(itemuser);
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

if(!allStoredData){
  setTimeout(()=>{
  location.href = "../page-login.html"
  },1000)
}else{
  const senderPhone = allStoredData.user.customer_phone;
  const senderName = allStoredData.user.customer_name;
  if(storedData){
    userNameOne.textContent = senderName;
    userPhoneOne.textContent = senderPhone;
  }else{

  }
}
