import { onSnapshot, collection } from 'firebase/firestore'
import { db } from './firebase'

export const listenForProductsChanges = (callback) => {
  const productsRef = collection(db, 'products')
  const unsubscribe = onSnapshot(productsRef, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(products)
  })
  return unsubscribe
}

export const listenForCustomersChanges = (callback) => {
  const customersRef = collection(db, 'customers')
  const unsubscribe = onSnapshot(customersRef, (snapshot) => {
    const customers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(customers)
  })
  return unsubscribe
}

export const listenForPurchasesChanges = (callback) => {
  const purchasesRef = collection(db, 'purchases')
  const unsubscribe = onSnapshot(purchasesRef, (snapshot) => {
    const purchases = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(purchases)
  })
  return unsubscribe
}
