// import { cardContainer, initDomElement} from './formUserDetails.js'
// console.log(initDomElement)
const form = document.getElementById("form");
const inputs = document.querySelectorAll("input");
const packageTy = document.getElementById("package_type");
const userPhoneOne = document.getElementById("user_phone_one");
const userNameOne = document.getElementById("user_name_one");
const storedData = localStorage.getItem("dataStorage");
const storedDataReg = localStorage.getItem("dataStorageTwo");
const textClear = document.getElementById("instruction");
// const allStoredDataReg = JSON.parse(storedDataReg);
// console.log(allStoredDataReg);

// console.log(allStoredData);
// const logEl = document.getElementById("logout-el");
const allStoredData = JSON.parse(storedData);
// console.log(allStoredData.CustomerAccount.customer_name);
// console.log(allStoredData.CustomerAccount.id);

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

// if(allStoredData){
//   const senderName = allStoredData.user.customer_name;
// const senderPhone = allStoredData.user.customer_phone;
//   userNameOne.textContent = senderName;
//   userPhoneOne.textContent = senderPhone;
// }else{

// }



// const inputVal = document.querySelectorAll("input");
var inputTest = $("input").val();
form.addEventListener(
    "submit",
    function (e) {
      e.preventDefault();
      var inputVal = $("input").val();

      var inputValProceed = true;
      if (!inputVal) {
        appNotifier("Please fill in all the required field!");
        inputValProceed = false;
        $("input").focus();
      } else {
        const formData_one = new FormData(form);
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
        // const packageType =
        formData_one.append("sender_name",senderName);
        formData_one.append("sender_phone",senderPhone);
        formData_one.append("sender_location",senderLocation);
        formData_one.append("reciever_name",receiverName);
        formData_one.append("reciever_phone",receiverPhone);
        formData_one.append("reciever_location",receiverLocation);
        formData_one.append("customer_account_id",customerId);
        formData_one.append("package_date",fullDate);
        // console.log([...formData_one]);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        fetch("https://api5.staging.iguru.co.ke/api/package", {
          method: "POST",
          body: formData_one,
        })
          .then((res) => res.json())
          .then((data) => {
            var shouldProceed = true;
            if (!data.error) {
              workingNotifier("Your details are successfully submitted!");
              shouldProceed = false;
              setTimeout(function () {
                location.href = "../page-user-profile.html";
              }, 2000);
            } else {
              console.log(data.error);
            }
          })
          .catch((err) => {
            var shouldProceed = true;
            if (err) {
              appNotifier("Operation has not been completed!");
              shouldProceed = false;
              console.log(err);
            }
          });
        inputs.forEach((input) => {
          input.value = "";
        });
      //  textClear.value = "";
      }
    },
    false
  );

  // feeling in user details
   document.getElementById("fill_user").addEventListener("click",function (){
    if(allStoredData){
  setTimeout(() => {
    document.getElementById('user_town').value = allStoredData.user.customer_location;
    document.getElementById('user_names').value = allStoredData.user.customer_name;
    document.getElementById('user_contacts').value = allStoredData.user.customer_phone;
  },1500)
    }else{

    }
   })


// swal libraly
  const workingNotifier = (message) => {
    new swal({
      title: message,
      text: "",
      icon: "success",
    });
  };

//   swal libraly
  function appNotifier(message) {
    new swal({
      title: message,
      text: "",
      icon: "warning",
    });
  }


  const renderCard = () =>{
    cardContainer.innerHTML = '';
    cards.forEach((cardData) =>{
      const card = createCard(cardData, cardData.id);
      cardContainer.appendChild(card);
    });
  }
