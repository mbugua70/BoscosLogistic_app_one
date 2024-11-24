const logEl = document.getElementById("logout-el");
const storedDataTem = localStorage.getItem("dataStorage");
// const storedDataReg = localStorage.getItem("dataStorageTwo");
// const allStoredDataReg = JSON.parse(storedDataReg);
const allStoredDataLogOut = JSON.parse(storedDataTem);
// console.log(allStoredDataLogOut);
const storeAuth = allStoredDataLogOut.authorization.token;


const logOutUser = (e) =>{
    e.preventDefault();
    console.log("working");
    fetch("https://api5.staging.iguru.co.ke/api/logmeout",{
        method:"GET",
        // headers:{
        //     "Authorization":"Bearer " + storeAuth,
        // }
    }).then(response => {
        if(response.ok){
            // console.log("logged out succesfully");
             new swal({
                title:"confirmation",
                text:"Are you sure you want to logout",
                icon:"question",
                showCancelButton: true,
                confirmButtonText: "yes",
                showLoaderOnConfirm: true,
               preConfirm: () => {
                localStorage.removeItem("dataStorage");
            logOutWorking("You have successfully logout");
             setTimeout(() => {
                location.href = "../page-login.html";
             },1000)
               }
              })
        }else{
            console.log("log out failed");

        }
    }).catch(error => {
        console.log("The error is:", error)
    })

}

logEl.addEventListener("click",(e)=>{
    logOutUser(e)
},false);

function logOutWorking (message){
   new swal({
        title:"",
        text:message,
        icon:"success"
    })
}
