console.log("hello");

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

function calculateEarnings(orderId) {
    db.collection("orders")

    .get()
        .then(function(querySnapshot) {
            querySnapshot.docs.forEach(function(doc) {
                if (orderId == doc.id) {
                    proffit(
                        doc.data()["itemId"],
                        doc.data()["shopId"],
                        doc.data()["orderdTime"]
                    );
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

//calculateEarnings("19zy1CkKPZXD3CI4VHo2");

function proffit(itemId, shopId, orderTime) {
    var date = new Date(orderTime.toDate());
    var earningsDocId = date.getMonth() + 1 + "," + date.getFullYear();
    db.collection("shops")
        .doc(shopId)
        .collection("Listed Items")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //console.log(itemId + shopId);
                if (doc.id == itemId) {
                    var listedPrice = parseFloat(doc.data()["itemPrice"]);
                    var realPrice = parseFloat(doc.data()["realPrice"]);
                    var proffit = listedPrice - realPrice;

                    console.log(proffit + " " + earningsDocId);
                    getShopEarningsDetails(earningsDocId, proffit);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getShopEarningsDetails(docId, proffit) {
    db.collection("shop_earnings")

    .get()
        .then(function(querySnapshot) {
            querySnapshot.docs.forEach((value) => {
                if (value.id == docId) {
                    var previus_proffit = parseFloat(value.data()["monthly_proffit"]);
                    var newProffit = previus_proffit + proffit;
                    addEarninbgs(docId, newProffit);
                } else {
                    addEarninbgs(docId, proffit);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

function addEarninbgs(docId, proffit) {
    db.collection("shop_earnings")
        .doc(docId)
        .set({
            monthly_proffit: proffit,
        })
        .then(function(response) {
            console.log("added succusfully");
        })
        .catch(function(error) {
            console.log(error);
        });
}