const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
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
        let hi = charIndex-mistakes;
        rescpmElements.forEach(element => element.innerText = "CPM : "+(charIndex - mistakes));
        reswpmElements.forEach(element => element.innerText = "WPM : "+wpm);
        resaccuElements.forEach(element => element.innerText =  "Accuracy : "+ accuracy + "%");
        resmisElements.forEach(element => element.innerText =  "Mistakes : "+ mistakes);
        localStorage.setItem("level1score", hi);
        document.getElementById("level2Button").style.display = "block";
        document.getElementById("tryagain").style.marginRight = "18%";
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
    document.getElementById("level2Button").style.display = "none";
    document.getElementById("tryagain").style.marginRight = "0%";
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
