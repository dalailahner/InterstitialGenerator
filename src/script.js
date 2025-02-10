//---------
// GLOBALS
const form = document.querySelector("form");

// advanced tab
document.querySelector(".advancedBtn").addEventListener("click", (ev) => {
  document.querySelector(".advancedCont").classList.toggle("open");
});

// form submit
form.addEventListener("submit", (ev) => formSubmit(ev));

// input change
for (const el of form.querySelectorAll("input")) {
  el.addEventListener("change", (ev) => formSubmit(ev));
}

//-----------
// FUNCTIONS

function formSubmit(event) {
  event.preventDefault();
  const formDataRaw = new FormData(form);
  const formData = Object.fromEntries(formDataRaw.entries());

  // img vs. html toggle
  switch (formData.adVariant) {
    case "adVariantHTML":
      for (const el of document.querySelectorAll(".htmlOnly")) {
        el.style.display = "";
      }
      for (const el of document.querySelectorAll(".imgOnly")) {
        el.style.display = "none";
      }
      break;

    case "adVariantImg":
      for (const el of document.querySelectorAll(".imgOnly")) {
        el.style.display = "";
      }
      for (const el of document.querySelectorAll(".htmlOnly")) {
        el.style.display = "none";
      }
      break;

    default:
      break;
  }

  // img upload
  if (formData.imgUpload) {
    const colorPickerImg = document.querySelector(".colorPickerImg");
    if (colorPickerImg) {
      colorPickerImg.src = URL.createObjectURL(formData.imgUpload);
    }
  }
  // log form data:
  console.log(formData);
}
