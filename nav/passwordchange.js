const loginEl = document.getElementById("frmSignIn");
const passwordOne = document.getElementById("password");
const passwordTwo = document.getElementById("confirm_password");
const paragraphChange = document.getElementById("paragraph_change_password");
const userPhone = document.getElementById("customer_contacts");


const checkPassword = () =>{
    passwordTwo.addEventListener("input", () => {
        if(passwordOne.value !== passwordTwo.value){
         paragraphChange.style.display = "block";
         passwordTwo.style.borderColor = "red";
        }else{
            paragraphChange.style.display = "none";
            passwordTwo.style.borderColor = "rgba(0, 0, 0, 0.09)";
        }
    })
}

checkPassword();


async function fetchPackageData() {
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
      const user_data = data.data;
      console.log(user_data);
      return user_data;

  }catch(error){
      console.error('Error fetching package data:',error);
      return [];
  }
}


loginEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const showData = await fetchPackageData();
  console.log(showData);
  showData.forEach(async (items) => {
    if(items.customer_phone === userPhone.value){
      console.log(items.id)
  const formData = new FormData();
  const passwordValue = passwordOne.value;
 formData.append("password",passwordValue);
  console.log([...formData]);
    // var checkPasswordStatus = checkPassword();
    try{
      const response = await  fetch(`https://api5.staging.iguru.co.ke/api/update/${items.id}`,{
       method:"PUT",
       headers:{
         'Content-Type':'application/json',
       },
       body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      // if(response.ok){
      // //  console.log(data);
      //  console.log("working");
      // }else{
      //       appNotifier("Failed to change your password");
      // }
       workingNotifier("Your password has been changed successfully");
        setTimeout(function(){
         location.href = "../page-login.html";
       },2000)
    }catch(error){
     console.error("Error occured:",error);
     appNotifier("An error occurred.Please try again!");
    }
    }
  })
},false);

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