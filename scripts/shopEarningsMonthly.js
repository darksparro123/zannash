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

const table = document.querySelector("#monthly-shop-earnings");
var list = [];
var shopData = {};

db.collection("order_status")
    .where("recieved_order", "==", true)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            /* var date = doc.data()["ordertime"].toDate();
                                                                                                    var d = new Date(date);
                                                                                                    shopData["date"] = d.getMonth() + 1 + "/" + d.getFullYear();
                                                                                                    shopData["shop_id"] = doc.data()["shop_id"];
                                                                                                    list.push(shopData);*/
            //console.log("shop_id is " + doc.data()["shop_id"]);
            getPrices(doc.data()["shop_id"], doc.data()["item_id"]);
        });
    })
    .catch(function (error) {
        console.log(error);
    });

function getPrices(shopId, itemId) {
    // console.log(shopId);
    db.collection("shops")
        .doc(shopId)
        .collection("Listed Items")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.docs.forEach(function (doc) {
                // console.log("doc id is " + doc.id + "\n" + "ite id is " + itemId);
                if (doc.id == itemId) {
                    console.log("Matched");
                } else {
                    console.log("not mayched");
                }
                /*  var proffit =
                                                                                                                                                                                                            parseFloat(doc.data()["realPrice"]) -
                                                                                                                                                                                                            parseFloat(doc.data()["itemPrice"]);*/

                //  console.log(proffit);
            });
        })
        .catch(function (error) {
            return error;
        });
}