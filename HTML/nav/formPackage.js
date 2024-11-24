const form = document.getElementById("form");


form.addEventListener(
    "submit",
    function (e) {
      e.preventDefault();
      inputVal = $("input").val();

      var inputValProceed = true;
      if (!inputVal) {
        appNotifier("Please fill in all the required field!");
        inputValProceed = false;
        $("input").focus();
      } else {
        const formData_one = new FormData(form);
        console.log([...formData_one]);
        // window.scrollTo({
        //   top: 0,
        //   behavior: "smooth",
        // });
        fetch("https://api3.staging.iguru.co.ke/api/charma_reg", {
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
                location.href = "../index.html";
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
      }
    },
    false
  );




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
