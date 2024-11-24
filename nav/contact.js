// contact form js code
const ContactEl = document.getElementById('contact_element');

ContactEl.addEventListener("submit",async (event) => {
    event.preventDefault();
    const contactForm = new FormData(ContactEl);

    try{
        const response = await fetch("", {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(contactForm),
        })
        if(response.ok){
            const data = response.json();
            workingNotifiers("Your message was sent successfully");
        }else{
            appNotifiers("Your message was not sent");
        }
    }catch(error){
        console.error("Error",error);
    }
})

const workingNotifiers = (message) => {
    swal({
      title: message,
      text: "",
      icon: "success",
    });
  };

function appNotifiers (message) {
    swal({
      title: message,
      text: "",
      icon: "warning",
    });
  }
