import { db } from '../../Firebase/firebase'
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'

export const getCustomersAPI = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'customers'))
    const customers = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
      }
    })
    return customers
  } catch (error) {
    console.error('Error getting customers:', error)
    throw error
    //**option instead of throw error: */
    // return []
  }
}

export const getCustomerByIdAPI = async (id) => {
  try {
    let customers = await getCustomersAPI()
    const customer = customers.find((customer) => customer.id === id)
    return customer
  } catch (error) {
    console.error(error)
  }
}

export const updateCustomerAPI = async (id, customerData) => {
  try {
    const docRef = doc(db, 'customers', id)
    await setDoc(docRef, customerData, { merge: true })
    const customers = await getCustomersAPI()
    return customers
  } catch (error) {
    console.error(error)
  }
}

export const deleteCustomerAPI = async ({ id }) => {
  try {
    const docRef = doc(db, 'customers', id)
    await deleteDoc(docRef)
    const customers = await getCustomersAPI()
    return customers
  } catch (error) {
    console.error(error)
  }
}
