const firebaseConfig = {
  apiKey: "AIzaSyBhY3_tw-oYgx4zCQwA5TsO1MHQRqXFlh4",
  authDomain: "fast-fingers-01.firebaseapp.com",
  databaseURL: "https://fast-fingers-01-default-rtdb.firebaseio.com",
  projectId: "fast-fingers-01",
  storageBucket: "fast-fingers-01.appspot.com",
  messagingSenderId: "565551301939",
  appId: "1:565551301939:web:2c230f8a7a21b69a702a46"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const scoresRef = firebase.database().ref("scores");
const storedName = localStorage.getItem("userName");
const storedPhone = localStorage.getItem("PhoneNumber");
const WPM = localStorage.getItem("WPM");
const Accuracy = localStorage.getItem("Accuracy");
const CPM = localStorage.getItem("CPM");
const Mistakes = localStorage.getItem("Mistakes");

const newScore = scoresRef.push();
newScore.set({
    Player:storedName,
    Number:storedPhone,
    wpm: WPM,
    cpm: CPM,
    accuracy: Accuracy,
    mistakes: Mistakes,
    timestamp: firebase.database.ServerValue.TIMESTAMP
});

