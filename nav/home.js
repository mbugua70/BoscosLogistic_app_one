const ButtonPackage = document.getElementById("button-home");
const checkLog = document.getElementById("check_login");
const storedDataTwo = localStorage.getItem("dataStorage");
const checkHeight = document.getElementById("check_heights");
const changeColors = document.querySelectorAll(".dropdown-item");
let checkWidth = 992;

window.addEventListener("scroll",()=>{
  if(checkHeight.style.height === "70px" && checkHeight.offsetWidth > checkWidth){
    console.log(checkHeight.style.width)
    changeColors.forEach((items) => {
      items.style.color = "#fff";
    })
    }else if(checkHeight.style.height === "100px" && checkHeight.offsetWidth > checkWidth){
      changeColors.forEach((items) => {
        items.style.color = "#444";
      })
    }
})



// console.log(storedDataTwo);
const newPackageCheck = () =>{
   if(storedDataTwo){
    setTimeout(function(){
        location.href = "../page-user-profile.html";
    })
   }else{
    appNotifier("Please Login to continue!")
    setTimeout(function(){
      location.href = "../page-login.html";
    },2000)
   }
}




checkLog.addEventListener("click",newPackageCheck,false);

ButtonPackage.addEventListener("click",function(){
    if(storedDataTwo){
        setTimeout(function(){
            location.href = "../blog-full-width.html";
        })
       }else{
        appNotifier("Please Login to make an order!")
        setTimeout(function(){
            location.href = "../page-login.html";
        },2000)
       }
},false);

const workingNotifier = (message) => {
    swal({
      title: message,
      text: "",
      icon: "success",
    });
  };

  function appNotifier(message) {
    swal({
      title: message,
      text: "",
      icon: "warning",
    });
  }

  checkLog.addEventListener("click",newPackageCheck,false);