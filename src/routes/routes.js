import Menu from '../Pages/Menu'
import ProductsPage from '../Pages/productsPage/ProductsPage'
import EditProductPage from '../Pages/EditPage/EditProductPage'
import CustomersPage from '../Pages/CustomersPage'
import EditCustomerPage from '../Pages/EditPage/EditCustomerPage'
import PurchasesPage from '../Pages/purchasesPage/PurchasesPage'

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
