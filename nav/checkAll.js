const ButtonPackage = document.getElementById("button-home");
const checkLog = document.getElementById("check_login");
const storedDataTwo = localStorage.getItem("dataStorage");
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

// ButtonPackage.addEventListener("click",function(){
//     if(storedDataTwo){
//         setTimeout(function(){
//             location.href = "../../bosco_logistics/page-user-profile_home.html";
//         })
//        }else{
//         appNotifier("Please Login to continue!")
//         setTimeout(function(){
//             location.href = "../../bosco_logistics/page-login.html";
//         },2000)
//        }
// },false);

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