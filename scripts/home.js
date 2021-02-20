// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCvKqU6SuQleKe5MTqCr1mOGW0Mk34mDWA",
    authDomain: "delivoblackgenpvtltd.firebaseapp.com",
    projectId: "delivoblackgenpvtltd",
    storageBucket: "delivoblackgenpvtltd.appspot.com",
    messagingSenderId: "776352742517",
    appId: "1:776352742517:web:7449fa906ef9d7a3d18c3c",
    measurementId: "G-TVL0RQGXEZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});
console.log("initialed firebase");


async function getstatics(){
    var shops,riders,users;
    await db.collection("Customer").onSnapshot(snapshot=>{
        users=snapshot.docs.length;
    });

    await db.collection("Riders").get().then((snapshot)=>{
        riders=snapshot.docs.length;
    });

    await db.collection("shops").get().then((snapshot)=>{
        shops=snapshot.docs.length;
    });

    var shopnum=document.getElementById("shops");
    var usernum=document.getElementById("users");
    var ridernum=document.getElementById("riders");

    shopnum.textContent=shops;
    usernum.textContent=users;
    ridernum.textContent=riders;
}

getstatics();

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}