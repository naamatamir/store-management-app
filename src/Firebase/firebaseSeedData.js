//firebase-seed-data.json
{
    "products": [
      {
        "name": "Product A",
        "price": 10.99,
        "quantity": 100
      },
      {
        "name": "Product B",
        "price": 20.99,
        "quantity": 50
      },
      {
        "name": "Product C",
        "price": 5.99,
        "quantity": 200
      }
    ],
    "customers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "city": "New York"
      },
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "city": "Los Angeles"
      },
      {
        "firstName": "Bob",
        "lastName": "Johnson",
        "city": "Chicago"
      }
    ],
    "purchases": [
      {
        "customerId": "",
        "productId": "",
        "date": "2023-03-01"
      },
      {
        "customerId": "",
        "productId": "",
        "date": "2023-02-28"
      },
      {
        "customerId": "",
        "productId": "",
        "date": "2023-02-27"
      }
    ]
  }
  

//   To generate unique IDs for each object, you can use Firebase's push method when adding the objects to your database. Here's an example implementation using the Firebase Admin SDK for Node.js:

  const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project.firebaseio.com'
});

const db = admin.database();

// Read the seed data from the JSON file
const seedData = require('./seedData.json');

// Add each product to the database with a unique ID
seedData.products.forEach(product => {
  db.ref('products').push(product, error => {
    if (error) {
      console.error(error);
    }
  });
});

// Add each customer to the database with a unique ID
seedData.customers.forEach(customer => {
  db.ref('customers').push(customer, error => {
    if (error) {
      console.error(error);
    }
  });
});

// Add each purchase to the database with a unique ID
seedData.purchases.forEach(purchase => {
  const newPurchaseRef = db.ref('purchases').push();
  purchase.id = newPurchaseRef.key; // Assign the new ID to the purchase object
  newPurchaseRef.set(purchase, error => {
    if (error) {
      console.error(error);
    }
  });
});


//**another option:  */
// Next, you can use the set method to add the seed data to the database. Here's an example implementation that assumes you have the seed data in a separate JavaScript file named seedData.js:


import seedData from './seedData';

// Add each product to the database with a unique ID
seedData.products.forEach(product => {
  const newProductRef = database.ref('products').push();
  newProductRef.set(product, error => {
    if (error) {
      console.error(error);
    }
  });
});

// Add each customer to the database with a unique ID
seedData.customers.forEach(customer => {
  const newCustomerRef = database.ref('customers').push();
  newCustomerRef.set(customer, error => {
    if (error) {
      console.error(error);
    }
  });
});

// Add each purchase to the database with a unique ID
seedData.purchases.forEach(purchase => {
  const newPurchaseRef = database.ref('purchases').push();
  purchase.id = newPurchaseRef.key; // Assign the new ID to the purchase object
  newPurchaseRef.set(purchase, error => {
    if (error) {
      console.error(error);
    }
  });
});
// In this example, we use the push method to create a new reference for each product and customer, which automatically generates a unique ID for each object. For purchases, we again use the push method to create a new reference, and then assign the new ID to the purchase object before setting it in the database.


//**render in app.js */
import { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import seedData from './seedData';

const config = {
  // your Firebase config here
};

firebase.initializeApp(config);
const database = firebase.database();

function App() {
  useEffect(() => {
    // Add seed data to the Firebase database
    seedData.products.forEach(product => {
      const newProductRef = database.ref('products').push();
      newProductRef.set(product, error => {
        if (error) {
          console.error(error);
        }
      });
    });

    seedData.customers.forEach(customer => {
      const newCustomerRef = database.ref('customers').push();
      newCustomerRef.set(customer, error => {
        if (error) {
          console.error(error);
        }
      });
    });

    seedData.purchases.forEach(purchase => {
      const newPurchaseRef = database.ref('purchases').push();
      purchase.id = newPurchaseRef.key; // Assign the new ID to the purchase object
      newPurchaseRef.set(purchase, error => {
        if (error) {
          console.error(error);
        }
      });
    });
  }, []);

  return (
    // Your app JSX here
  );
}

export default App;
// In this example, we use the useEffect hook to run the seed data code when the component mounts. The empty dependency array [] as the second argument to useEffect ensures that the code is only run once when the component mounts, and not every time the component re-renders.

// Note that in this example, we import the seedData module at the top of the file, assuming that the seedData.js file is in the same directory as the App.js file. You can adjust the path as necessary to match the actual location of the seedData.js file.



