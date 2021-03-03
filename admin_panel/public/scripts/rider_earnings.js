const table = document.querySelector("#last-month-earnings");
const yearTable = document.querySelector("#year-earnings");
var firebaseConfig = {
    apiKey: "AIzaSyCypuPyiyWM3q2SXBuZnA0UixRkxz54z-Q",
    authDomain: "delivoblackgenpvtltd.firebaseapp.com",
    databaseURL: "https://delivoblackgenpvtltd-default-rtdb.firebaseio.com",
    projectId: "delivoblackgenpvtltd",
    storageBucket: "delivoblackgenpvtltd.appspot.com",
    messagingSenderId: "776352742517",
    appId: "1:776352742517:web:d089b32ad13f6e6ad18c3c",
    measurementId: "G-QER3M9EHP7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true,
});

db.collection("Riders")

.get()
    .then(function(querySnapshot) {
        querySnapshot.docs.forEach(function(doc) {
            getRiderEarnings(doc.id, doc);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

function getRiderEarnings(riderId, doc) {
    db.collection("rider_earnings")
        .doc(riderId)
        .collection("earnings")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(snap) {
                if (snap.id == "last_month") {
                    renderMonthlyEarnings(snap, doc);
                }
                if (snap.id == "all_time") {
                    renderYearlyEarnings(snap, doc);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

function renderMonthlyEarnings(snap, doc) {
    let tr = document.createElement("tr");
    let riderName = document.createElement("td");
    let riderMobileNumber = document.createElement("td");
    let riderProffit = document.createElement("td");
    let blackgnProffit = document.createElement("td");
    let delvers = document.createElement("td");
    let totalEarnin = document.createElement("td");

    var name =
        doc.data()["Rider's first's Name"] +
        " " +
        doc.data()["Rider's last's Name"];

    // console.log(name);
    var blackGenProffit = snap.data()["revenue"] - snap.data()["profit"];
    console.log(
        "black gen proffit is    " + blackGenProffit.toString().split(".")[0]
    );
    riderName.textContent = name;
    riderMobileNumber.textContent = doc.data()["Riders's Mobile Number"];
    riderProffit.textContent = snap.data()["profit"];
    delvers.textContent = snap.data()["delivers"];

    totalEarnin.textContent = snap.data()["revenue"];

    blackgnProffit.textContent = blackGenProffit.toString().split(".")[0];

    tr.appendChild(riderName);
    tr.appendChild(riderMobileNumber);
    tr.appendChild(delvers);
    tr.appendChild(riderProffit);
    tr.appendChild(blackgnProffit);
    tr.appendChild(totalEarnin);
    tr.setAttribute("class", "indigo-text");
    tr.setAttribute("style", "font-weight:bold");

    table.appendChild(tr);
}

function renderYearlyEarnings(snap, doc) {
    let tr = document.createElement("tr");
    let riderName = document.createElement("td");
    let riderMobileNumber = document.createElement("td");
    let riderProffit = document.createElement("td");
    let blackgnProffit = document.createElement("td");
    let delvers = document.createElement("td");
    let totalEarnin = document.createElement("td");

    var name =
        doc.data()["Rider's first's Name"] +
        " " +
        doc.data()["Rider's last's Name"];

    // console.log(name);
    var blackGenProffit = snap.data()["revenue"] - snap.data()["profit"];
    console.log(
        "black gen proffit is    " + blackGenProffit.toString().split(".")[0]
    );
    riderName.textContent = name;
    riderMobileNumber.textContent = doc.data()["Riders's Mobile Number"];
    riderProffit.textContent = snap.data()["profit"];
    delvers.textContent = snap.data()["delivers"];

    totalEarnin.textContent = snap.data()["revenue"];

    blackgnProffit.textContent = blackGenProffit.toString().split(".")[0];

    tr.appendChild(riderName);
    tr.appendChild(riderMobileNumber);
    tr.appendChild(delvers);
    tr.appendChild(riderProffit);
    tr.appendChild(blackgnProffit);
    tr.appendChild(totalEarnin);
    tr.setAttribute("class", "indigo-text");
    tr.setAttribute("style", "font-weight:bold");

    yearTable.appendChild(tr);
}