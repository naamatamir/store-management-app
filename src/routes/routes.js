import Menu from '../components/pages/Menu'
import ProductsPage from '../components/pages/productsPage/ProductsPage'
import EditProductPage from '../components/pages/EditProductPage/EditProductPage'
import CustomersPage from '../components/pages/CustomersPage'
import EditCustomerPage from '../components/pages/EditCustomerPage/EditCustomerPage'
import PurchasesPage from '../components/pages/purchasesPage/PurchasesPage'
// import WithSpinnerOnLoad from '../hoc/WithSpinnerOnLoad'

// wrap the components with the HOC
// const WrappedMenu = WithSpinnerOnLoad(Menu)
// const WrappedProductsPage = WithSpinnerOnLoad(ProductsPage)

const routes = [
  {
    path: '/',
    component: Menu,
    exact: true,
  },
  {
    path: '/products',
    component: ProductsPage,
    exact: true,
  },
  {
    path: '/products/:id/edit',
    component: EditProductPage,
    exact: true,
  },
  {
    path: '/customers',
    component: CustomersPage,
    exact: true,
  },
  {
    path: '/customers/:id/edit',
    component: EditCustomerPage,
    exact: true,
  },
  {
    path: '/purchases',
    component: PurchasesPage,
    exact: true,
  },
]

export default routes
