const stripe = require("stripe")(
  "sk_test_51LORxmJ1nxfzB4nBGblvcIWdoB1xwdQLZ0yWcfDGy4o1VBcO9Qnx8pDbWvZ6MyMUnLRT6nDTGkE9nNIwnvmDSi7H00f01iM0vn"
);

// require the firebase-admin SDK
const firebase = require("firebase-admin");


// initialize the SDK with your Firebase project credentials
const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'flowty-14109.firebaseapp.com'
});


const serverItems = [
  {
    id: 1,
    name: "T-Shirt",
    price: 25,
    imageUrl: "/tshirt.jpg",
    priceId: "price_1MLcaFJ1nxfzB4nBGV0ciQDf",
  },{
    id: 2,
    name: "T-Shirt",
    price: 25,
    imageUrl: "/tshirt.jpg",
    priceId: "price_1MLdMGJ1nxfzB4nB4GKR2RgT",
  },
];

export default async function handler(req, res) {
  const db = firebase.firestore();

  // {
  //   // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //   price: '{{PRICE_ID}}',
  //   quantity: 1,
  // },

  if (req.method === "POST") {
    // log the ids of the query params
    console.log("server ids", req.query.id);

    // const productIds = req.query.id;
    const productIds = [req.query.id];
    

    const resolveItems = () => {
      return productIds.map((id) => {
        const item = serverItems.find((item) => item.id == id);
        return {
          price: item.priceId,
          quantity: 1,
        };
      });
    };

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: resolveItems(),
        mode: "payment",
        success_url: `${req.headers.origin}/profile`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      // if the session is successful, add the items to the user's purchasedProducts
      if (session) {
        const userRef = db.collection('users').doc("oILmkH5guOUp9jHwCX4rpazUHhi2");
        const doc = await userRef.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          const purchasedProducts = doc.data().purchasedProducts;
          const newPurchasedProducts = [...purchasedProducts, ...productIds];
          userRef.update({ purchasedProducts: newPurchasedProducts }).then(() => {
            console.log('Document successfully updated!');
          });
        }
      }


      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
