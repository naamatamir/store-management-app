import { db } from '../../Firebase/firebaseConfig'
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'

export const getProductsAPI = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
      }
    })
    return products
  } catch (error) {
    console.error('Error getting products:', error)
    throw error
    //**option instead of throw error: */
    // return []
  }
}

export const getProductByIdAPI = async (id) => {
  try {
    let products = await getProductsAPI()
    const product = products.find((product) => product.id === id)
    return product
  } catch (error) {
    console.error(error)
  }
}

export const updateProductAPI = async (id, productData) => {
  try {
    const docRef = doc(db, 'products', id)
    await setDoc(docRef, productData, { merge: true })
    const products = await getProductsAPI()
    return products
  } catch (error) {
    console.error(error)
  }
}

export const deleteProductAPI = async ({ id }) => {
  try {
    // console.log("Before deleteDoc:", id);
    const docRef = doc(db, 'products', id)
    await deleteDoc(docRef)
    // console.log("After deleteDoc");
    const products = await getProductsAPI()
    return products
  } catch (error) {
    console.error(error)
  }
}
