const table = document.querySelector("#shop-data");
const searchtable=document.querySelector("#shop-data-search");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

async function getShopsFromFirestore() {
    // data storing variables
    loadspinner();
    await db.collection("shops")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                //sconsole.log(doc.data());
                var status="normal";
                getShopDetails(doc.id,status);
                //getShopOwnersDetails(doc.id);
                // getShopBankDetails(doc.id);
            });
        });
        stopspinner();     
}
getShopsFromFirestore();

function getShopDetails(shopId,status) {
    db.collection("shops")
        .doc(shopId)
        .collection("Shop Details")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                renderShops(doc,status);
            });
        });
}

function renderShops(doc,status) {
    let tr = document.createElement("tr");
    let shopName = document.createElement("td");
    let shopAddress = document.createElement("td");
    let catogary = document.createElement("td");
    let buttontd = document.createElement("td");
    let btn = document.createElement("button");

    shopName.textContent = doc.data()["Shop Name"];
    shopAddress.textContent = doc.data()["Address"];
    catogary.textContent = doc.data()["Shop Catogary"];
    btn.textContent = "View Earnings";

    btn.setAttribute("class", "btn");
    btn.onclick = function () {
        url = "shopEarnings.html?name=" + encodeURIComponent(doc.data()["Email"]);
        document.location.href = url;
    };
    tr.setAttribute("id", doc.id);
    buttontd.appendChild(btn);
    tr.append(shopName);
    tr.append(shopAddress);
    tr.append(catogary);
    tr.appendChild(buttontd);
    tr.className = "txt";
    // table.appendChild(tr);

    if (status == "normal") {
        table.appendChild(tr);

    } else {
        searchtable.appendChild(tr);
    }
}

async function searchShop() {
    loadspinner();
    let searchval = document.getElementById("search-name").value;
    console.log(searchval);
    document.getElementById("shop-data").style.display = "none";
    document.getElementById("shop-data-search").style.visibility = "visible";

    await db.collection("shops").where("Shop Name", "==", searchval).get().then((snapshot) => {
        // console.log(snapshot.docs);
        snapshot.docs.forEach((data) => {
            if (data.data()["Shop Name"] == searchval) {
                console.log(data.id);
                var status = "search";
                getShopDetails(data.id,status);
                
                console.log(data.data());
            }
        })
    }).catch((error) => {
        console.log(error);
    });
    stopspinner();

}

//searchShop("Senarath Pharmacy");








function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}