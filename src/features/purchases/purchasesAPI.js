import { db } from '../../Firebase/firebaseConfig'
import { collection, getDocs, query, where, addDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { getProductByIdAPI } from '../products/productsAPI'
import { getCustomerByIdAPI } from '../customers/customersAPI'
import { getPurchasesByProductIdAPI, getPurchasesByCustomerIdAPI } from './purchasesHelperAPI'

//get all purchases
export const getPurchasesAPI = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'purchases'))
    const purchases = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      const date = data.date ? data.date.toDate().toISOString() : null
      return { id: doc.id, ...data, date }
    })
    return purchases
  } catch (error) {
    console.error('Error getting purchases:', error)
    throw error
  }
}

//get the customers names that bought the product & purchase date
export const getPurchasesOfProductAPI = async (productId) => {
  try {
    const purchases = await getPurchasesByProductIdAPI(productId)
    const customersIds = purchases.map((purchase) => purchase.customerId)
    const customerPromises = customersIds.map(getCustomerByIdAPI)
    const customers = await Promise.all(customerPromises)
    const purchasesWithDate = purchases.map((purchase) => {
      const customer = customers.find((c) => c.id === purchase.customerId)
      return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.city,
        date: purchase.date.toDate().toISOString(),
      }
    })
    return purchasesWithDate
  } catch (err) {
    console.error(`Error getting purchases of product ${productId}:`, err)
    return []
  }
}

//get the products bought by the customer & purchase date
export const getPurchasesOfCustomerAPI = async (customerId) => {
  try {
    const purchases = await getPurchasesByCustomerIdAPI(customerId)
    const productstIds = purchases.map((purchase) => purchase.productId)
    const productPromises = productstIds.map(getProductByIdAPI)
    const products = await Promise.all(productPromises)
    const purchasesWithDate = purchases.map((purchase) => {
      const product = products.find((p) => p.id === purchase.productId)
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        date: purchase.date.toDate().toISOString(),
      }
    })
    return purchasesWithDate
  } catch (err) {
    console.error(`Error getting purchases of customer ${customerId}:`, err)
    return []
  }
}

//add product to customer
export const addPurchaseToCustomerAPI = async (productId, customerId) => {
  try {
    await addDoc(collection(db, 'purchases'), {
      customerId,
      productId,
      date: serverTimestamp(),
    })
  } catch (err) {
    console.error(
      `Error adding product ${productId} to customer ${customerId}`,
      err
    )
    throw err
  }
}

//delete all purchases of product
export const deletePurchasesOfProductAPI = async (productId) => {
  try {
    const colRef = collection(db, 'purchases')
    const q = query(colRef, where('productId', '==', productId))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      console.log(`No purchases found for product ID: ${productId}`)
      return
    }
    const batch = writeBatch(db)
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })
    await batch.commit()
    console.log(
      `deleted purchases of product ${productId}. Deleted purchase IDs: ${querySnapshot.docs
        .map((doc) => doc.id)
        .join(', ')}`
    )
  } catch (error) {
    console.error(`Error deleting purchases of product ${productId}:`, error)
    throw error
  }
}

//delete all purchases of customer
export const deletePurchasesOfCustomerAPI = async (customerId) => {
  try {
    const colRef = collection(db, 'purchases')
    const q = query(colRef, where('customerId', '==', customerId))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      console.log(`No purchases found for customer ID: ${customerId}`)
      return
    }
    const batch = writeBatch(db)
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })
    await batch.commit()
    console.log(
      `Deleted purchases of customer ${customerId}. Deleted purchase IDs: ${querySnapshot.docs
        .map((doc) => doc.id)
        .join(', ')}`
    )
  } catch (error) {
    console.error(`Error deleting purchases of customer ${customerId}:`, error)
    throw error
  }
}
