import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes/routes'
import { getProducts } from './features/products/productsThunks'
import { getCustomers } from './features/customers/customersThunks'
import { getPurchases } from './features/purchases/purchasesThunks'
import {
  listenForProductsChanges,
  listenForCustomersChanges,
  listenForPurchasesChanges,
} from './Firebase/firebaseListeners'
import WithSpinnerOnLoad from './hoc/WithSpinnerOnLoad'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'
import theme from './styles/theme'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('here we go again')
    Promise.all([
      dispatch(getProducts()),
      dispatch(getPurchases()),
      dispatch(getCustomers()),
    ]).then(() => {
      const productsUnsubscribe = listenForProductsChanges((products) => {
        dispatch(getProducts())
      })

      const customersUnsubscribe = listenForCustomersChanges((customers) => {
        dispatch(getCustomers())
      })

      const purchasesUnsubscribe = listenForPurchasesChanges((purchases) => {
        dispatch(getPurchases())
      })

      return () => {
        productsUnsubscribe()
        customersUnsubscribe()
        purchasesUnsubscribe()
      }
    })
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <CssBaseline />
        <Router>
          <Routes>
            {routes.map((route) => {
              const WrappedComponent = WithSpinnerOnLoad(route.component)

              return (
                <Route
                  key={route.path}
                  // path={route.path}
                  {...route}
                  element={<WrappedComponent />}
                  // exact={route.exact}
                />
              )
            })}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
