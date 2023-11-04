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

// Reference your database
const taskSet = new Set();
const contactFormDB = firebase.database().ref("scores").on('value', function (snapshot) {
  const uniqueScores = [];

  snapshot.forEach(function (childSnapshot) {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();

    // Check if the user is already in the set
    if (!taskSet.has(childData.Player)) {
      taskSet.add(childData.Player);
      uniqueScores.push(Object.values(childData));
    }
  });

  // Sort the uniqueScores array based on score[0] (level1 points) in descending order
  uniqueScores.sort((a, b) => {
    const totalScoreA = a[7];
    const totalScoreB = b[7];
    console.log(totalScoreB-totalScoreA);
    return totalScoreB - totalScoreA; // Sort in descending order
  });


  let number = 1;
  let tableData = "";

  uniqueScores.forEach((score) => {
    tableData += `<tr>
      <th scope="row">${number++}</th>
      <td style="font-weight: bold;">${score[2]}</td>
      <td>${score[1]}</td>
      <td>${score[0]}</td>
      <td>${score[8]*3}</td>
      <td>${score[8]}</td>
      <td>${score[4]}</td>
      <td>${score[3]} %</td>
      <td>${score[5]}</td>
      <th>${score[7]}</th>
    </tr>`;
  });

  document.getElementById("scoretable").innerHTML = tableData;
});
