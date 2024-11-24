// import { cardContainer, initDomElement} from './formUserDetails.js'
// console.log(initDomElement)
const form = document.getElementById("frmSignUp");
const inputsTwo= document.querySelectorAll("input");
const checkLog = document.getElementById("check_login");
// const storedDataTwo = localStorage.getItem("authToken");
let userInformation = {};
// console.log(loginEl)
form.addEventListener("submit",function(e) {
  e.preventDefault();
  inputVal = $("input").val();

  var inputValProceed = true;
  if (!inputVal) {
    appNotifier("Please fill in all the required field!");
    inputValProceed = false;
    $("input").focus();
  } else {
    const formData_one = new FormData(form);
    // console.log([...formData_one]);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetch("https://api5.staging.iguru.co.ke/api/CustomerRegister", {
      method: "POST",
      body: formData_one,
    })
      .then((res) => res.json())
      .then((data) => {
        var shouldProceed = true;
        // console.log(data);
        if (!data.error) {
          workingNotifier("Your details are successfully submitted!");
          shouldProceed = false;
          const dataStore = JSON.stringify(data);
          localStorage.setItem("dataStorageTwo", dataStore);
          //  const storedData = localStorage.getItem("dataStorage");
          //  const allStoredData = JSON.parse(storedData);
          //  console.log(allStoredData.CustomerAccount.customer_name);

          // userInformation = {
          //   userId: data.userId,
          //   userName: data.customer_name,
          // }
          // console.log(userInformation.userName)
          setTimeout(function () {
            location.href = "../page-login.html";
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
    inputsTwo.forEach((input) => {
      input.value = "";
    });

  }
},false);









// swal libraly
  const workingNotifier = (message) => {
    swal({
      title: message,
      text: "",
      icon: "success",
    });
  };

//   swal libraly
  function appNotifier(message) {
    swal({
      title: message,
      text: "",
      icon: "warning",
    });
  }


  const renderCard = () => {
    cardContainer.innerHTML = '';
    cards.forEach((cardData) =>{
      const card = createCard(cardData, cardData.id);
      cardContainer.appendChild(card);
    });
  }
