const firebaseConfig = {
    apiKey: "AIzaSyBhY3_tw-oYgx4zCQwA5TsO1MHQRqXFlh4",
    authDomain: "fast-fingers-01.firebaseapp.com",
    databaseURL: "https://fast-fingers-01-default-rtdb.firebaseio.com",
    projectId: "fast-fingers-01",
    storageBucket: "fast-fingers-01.appspot.com",
    messagingSenderId: "565551301939",
    appId: "1:565551301939:web:2c230f8a7a21b69a702a46"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);







const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".tryagain"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 120,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
    document.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            event.preventDefault();
        }
        inpField.focus();
    });
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    } else {
        clearInterval(timer);
        inpField.value = "";

        // Calculate WPM and CPM when the countdown timer reaches zero
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        // Calculate accuracy
        let accuracy = ((charIndex - mistakes) / charIndex) * 100;
        accuracy = accuracy.toFixed(2);

        // Add the results to the elements with class 'rescpm', 'reswpm', and 'resaccu'
        const rescpmElements = document.querySelectorAll(".rescpm");
        const reswpmElements = document.querySelectorAll(".reswpm");
        const resaccuElements = document.querySelectorAll(".resaccu");
        const resmisElements = document.querySelectorAll(".resmis");

        rescpmElements.forEach(element => element.innerText = "CPM : "+(charIndex - mistakes));
        reswpmElements.forEach(element => element.innerText = "WPM : "+wpm);
        resaccuElements.forEach(element => element.innerText =  "Accuracy : "+ accuracy + "%");
        resmisElements.forEach(element => element.innerText =  "Mistakes : "+ mistakes);
        document.getElementById("firebasebutton").style.display = "block";
        document.getElementById("firebasebutton").addEventListener("click", function(event) {
            console.log("hey");
            saveGameResults(wpm, charIndex - mistakes, accuracy, mistakes);
        });
    }
}
// function initTyping() {
//     let characters = typingText.querySelectorAll("span");
//     let typedChar = inpField.value.split("")[charIndex];
//     if(charIndex < characters.length - 1 && timeLeft > 0) {
//         if(!isTyping) {
//             timer = setInterval(initTimer, 1000);
//             isTyping = true;
//         }
//         if(typedChar == null) {
//             if(charIndex > 0) {
//                 charIndex--;
//                 if(characters[charIndex].classList.contains("incorrect")) {
//                     mistakes--;
//                 }
//                 characters[charIndex].classList.remove("correct", "incorrect");
//             }
//         } else {
//             if(characters[charIndex].innerText == typedChar) {
//                 characters[charIndex].classList.add("correct");
//             } else {
//                 mistakes++;
//                 characters[charIndex].classList.add("incorrect");
//             }
//             charIndex++;
//         }
//         characters.forEach(span => span.classList.remove("active"));
//         characters[charIndex].classList.add("active");

//         let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
//         wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
//         wpmTag.innerText = wpm;
//         mistakeTag.innerText = mistakes;
//         cpmTag.innerText = charIndex - mistakes;
//     } else {
//         clearInterval(timer);
//         inpField.value = "";
//     }   
// }

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        // wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();

    // Clear the results in resaccu, reswpm, rescpm, and resmi class elements
    const resaccuElements = document.querySelectorAll(".resaccu");
    const reswpmElements = document.querySelectorAll(".reswpm");
    const rescpmElements = document.querySelectorAll(".rescpm");
    const resmiElements = document.querySelectorAll(".resmi");

    resaccuElements.forEach(element => element.innerText = "");
    reswpmElements.forEach(element => element.innerText = "");
    rescpmElements.forEach(element => element.innerText = "");
    resmiElements.forEach(element => element.innerText = "");

    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}


loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


function saveGameResults(wpm, cpm, accuracy, mistakes) {
    const scoresRef = firebase.database().ref("scores");
    const storedName = localStorage.getItem("userName");
    const storedPhone = localStorage.getItem("PhoneNumber");
    const level1score = localStorage.getItem("level1score");
    const newScore = scoresRef.push();
    newScore.set({
        Player:storedName,
        Number:storedPhone,
        Level1score:level1score,
        wpm: wpm,
        cpm: cpm,
        accuracy: accuracy,
        mistakes: mistakes,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        totalmarks:(parseInt(wpm)*3)+parseInt(level1score),
    });
}
