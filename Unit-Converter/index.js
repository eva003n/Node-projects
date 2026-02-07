const measurementEl = document.getElementById("measurement");
const linkElements = document.getElementsByTagName("a");


console.log(linkElements)

Object.values(linkElements).forEach((element) => {
  element.addEventListener("click", (event) => {
    toogle(event.target.innerText.toLowerCase());

    if (!event.target.classList.contains("active")) {
      event.target.classList.add("active");

    }else {
      event.target.classList.remove("active");

    }
  });
});

function toogle(unitName) {
  measurementEl.innerText = `Enter ${unitName} to convert`;


}
