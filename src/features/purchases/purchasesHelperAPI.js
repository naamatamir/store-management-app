import { db } from '../../Firebase/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

//get purchases by product ID
export const getPurchasesByProductIdAPI = async (productId = '') => {
  try {
    const colRef = collection(db, 'purchases')
    const q = query(colRef, where('productId', '==', productId))
    const querySnapshot = await getDocs(q)
    const purchases = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return purchases
  } catch (err) {
    console.error('Error getting purchases by product ID:', err)
    return []
  }
}

//get the purchases by customerID
export const getPurchasesByCustomerIdAPI = async (customerId = '') => {
  try {
    const colRef = collection(db, 'purchases')
    const q = query(colRef, where('customerId', '==', customerId))
    const querySnapshot = await getDocs(q)
    const purchases = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return purchases
  } catch (error) {
    console.error('Error fetching purchases by customer ID:', error)
    return []
  }
}
