console.clear();

console.log("Hello!");

// advanced tab
document.querySelector(".advancedBtn").addEventListener("click", (ev) => {
  document.querySelector(".advancedCont").classList.toggle("open");
});

// form submit
const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData(form);
  let output = "";
  for (const entry of formData) {
    output = `${output}${entry[0]} = ${entry[1]}\r`;
  }
  console.log(output);
});
