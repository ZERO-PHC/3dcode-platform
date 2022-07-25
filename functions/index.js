const functions = require("firebase-functions");
const { event } = require("firebase-functions/v1/analytics");
const admin = require("firebase-admin");
admin.initializeApp();

// create an scheduled function that runs every minute that updates the artworks collection

exports.updateArtworks = functions.pubsub
  .schedule("every 1 minutes")
  .onRun((context) => {
    console.log("Updating artworks collection");
    return admin
      .firestore()
      .collection("artworks")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const artwork = doc.data();
          const artworkId = doc.id;
          const artworkRef = admin
            .firestore()
            .collection("artworks")
            .doc(artworkId);
          const artworkUpdate = {
            // lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
            state: "inactive"
          };
          artworkRef.update(artworkUpdate);
        });
      });
  });

exports.stripeWebhook = functions.https.onRequest((request, response) => {
  const stripe = require("stripe")(
    "sk_test_51LORxmJ1nxfzB4nBGblvcIWdoB1xwdQLZ0yWcfDGy4o1VBcO9Qnx8pDbWvZ6MyMUnLRT6nDTGkE9nNIwnvmDSi7H00f01iM0vn"
  );
  let event;

  try {
    const whSec = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
      request.rawBody,
      request.headers["stripe-signature"],
      whSec
    );
  } catch (error) {
    console.error("webhook signature verification failed", error);
    return response.sendStatus(400);
  }

  // const dataObject = event.data.object;

  // get the email from the customer from stripe

  const customerEmail = event.data.object.customer_details.email;

  // console.log("dataObject", dataObject);

  //  userRef.update({

  // update the user´s ref coin balance
  // check if event type is checkout.session.completed
  // if (event.type === "checkout.session.completed") {
  // }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded

      admin
        .firestore()
        .collection("users")
        .doc(customerEmail)
        .update({
          coins: admin.firestore.FieldValue.increment(100),
        })
        .catch((err) => {
          console.log(err);
        });

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // var transaction = db.runTransaction(t => {
  //     return t.get(chainCounterRef).then(doc => {
  //         // Add to the chain count
  //         var newCount = doc.data().count + 1;
  //         t.update(chainCounterRef, { count: newCount });
  //     });
  // }).then(result => {
  //     console.log('Transaction success!');
  // }).catch(err => {
  //     console.log('Transaction failure:', err);
  // });

  // create a document for the event
  // console.log("dataObject", dataObject);
  admin
    .firestore()
    .collection("stripe_emails")
    .add({
      timestamp: new Date(),
      email: customerEmail,
    })
    .then(() => {
      console.log("event saved");
      response.sendStatus(200);

      // console.log("dataObject", dataObject);
      response.send("ok");
    })
    .catch((error) => {
      console.error("error saving event", error);
      response.sendStatus(500);
    });
});
// const stripeSecretKey = functions.config().stripe.key;

// const endpointSecret = "whsec_46a62c523b6af9dd99b157d99be35cea0c1e101ac890671ec61146c40d9a56ae";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.async_payment_succeeded':
//       const session = event.data.object;
//       // Then define and call a function to handle the event checkout.session.async_payment_succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
// });
