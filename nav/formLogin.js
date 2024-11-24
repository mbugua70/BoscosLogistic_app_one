const loginEl = document.getElementById("frmSignIn");
const checkLog = document.getElementById("check_login");
const storedDataTwo = localStorage.getItem("dataStorage");
const allStoredDataTwo = JSON.parse(storedDataTwo);
const rmCheck = document.getElementById('rememberme');
const localstorage  = window.localStorage;
const password = document.getElementById("password");
const firstChild = document.getElementById("icons_show_password");
const secondChild = document.getElementById("icons_hide_password");
// code for rememberme button


// console.log(allStoredDataTwo);
// if(remCheckStorage !== ""){
//   rmCheck.setAttribute("checked","checked");
//  document.getElementById('password').value = allStoredDataTwo.user.password;
//  document.getElementById('customer_phone').value = allStoredDataTwo.user.customer_phone;
// }else{
//   rmCheck.removeAttribute('checked');
//   document.getElementById('password').value = "";
//   document.getElementById('customer_phone').value = "";

// }

// const remembermeFun = () =>{
//   localstorage.setItem("remChecks",rmCheck.value);
//   console.log(rmCheck.value);

// }

loginEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginEl);
  const loginData = {
    customer_phone: formData.get('customer_phone'),
    password: formData.get('password')
   }

   console.log(loginData)
 try{
   const response = await fetch("https://api5.staging.iguru.co.ke/api/Customerlogin",{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(loginData)
   });
   if(response.ok){
    const data = await response.json();
    const loginInfoStored = JSON.stringify(data);
    localStorage.setItem("dataStorage", loginInfoStored);
    const storedDataTwo = localStorage.getItem("dataStorage");
    const allStoredDataTwo = JSON.parse(storedDataTwo);
    // console.log(data)

    workingNotifier("Login successfully");
    setTimeout(function(){
      location.href = "../page-user-profile.html";
    },1000)
   }else{
         appNotifier("Login failed, Please check your credentials and try again!")
   }
 }catch(error){
  console.error("Error occured:",error);
  appNotifier("An error occurred during login. Please try again!");
 }
},false);


document.getElementById("icons_show_password").addEventListener("click",  ()=>{
  if(password.type === "password"){
    password.type = "text";
    firstChild.style.display = "none";
    secondChild.style.display = "block";

  }else{
    password.type = "password";
  }
})

document.getElementById("icons_hide_password").addEventListener("click", () => {
  if(password.type === "text"){
    password.type = "password";
    firstChild.style.display = "block";
    secondChild.style.display = "none";
  }else{
   password.type = "text";
  }
})

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
