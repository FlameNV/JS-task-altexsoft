const optionSelector = document.querySelectorAll("option");
const text = document.querySelector("p");

function createLetters() {
  let letter = "";
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0, j = 1; i < 5; i++, j++) {
    letter += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    alphabet = alphabet.replace(letter, "");
    optionSelector[j].innerHTML = letter;
    letter = "";
  }
}
createLetters();

function renderResult() {
  const letterOptions = document.getElementById("letterSelector").options;
  const selectedLetter = document.getElementById("letterSelector")
    .selectedIndex;
  const selectedLetterText = letterOptions[selectedLetter].text;
  text.innerText = " ";
  let counter = 1;
  fetch("./js/list.json")
    .then((response) => response.json())
    .then(function (fetchJson) {
      const obj = fetchJson;
      if (selectedLetterText === "Choose") {
        text.innerText = "Choose a letter";
      } else {
        for (let i = 0; i < obj.length; i++) {
          let nameFirstLetter = obj[i].name.charAt(0);
          if (selectedLetterText === nameFirstLetter) {
            text.innerText += `${counter}. ${obj[i].name} \n`;
            ++counter;
          }
        }
        if (counter === 1) {
          text.innerText = "Sorry, did not match";
        }
      }
    });
}
