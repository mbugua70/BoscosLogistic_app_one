const userTown = document.getElementById("user_town");
const spinnerHolder = document.getElementById("spinner_item_child");
const buttonFill = document.getElementById("fill_user");
console.log(userTown);


buttonFill.addEventListener("click",() => {
  if(userTown.value === ""){
    spinnerHolder.style.display = "inline-block";
    setTimeout(() => {
      spinnerHolder.style.display = "none";
    },1500)
  }else{

  }
})
