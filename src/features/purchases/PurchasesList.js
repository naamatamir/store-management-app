import { useSelector } from 'react-redux'
import { selectPurchases } from './purchasesSlice'
import { PurchaseCard } from '../../components/PurchaseCard'
import { useParams } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'

export const PurchasesList = () => {
  const purchases = useSelector(selectPurchases)
  // console.log("🚀 ~ file: PurchasesList.js:9 ~ PurchasesList ~ purchases", purchases)

  const { id } = useParams();

if (!purchases) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <LoadingSpinner />
    </div>
  )
}

  return (
    <>
      <h2 style={{textAlign:'center'}}>Purchases List</h2>{' '}
      <div className='purchases-list-container'>
        {purchases.map((purchase) => {
          return <PurchaseCard key={purchase.id} purchase={purchase} id={id}/>
        })}
      </div>
    </>
  )
}

