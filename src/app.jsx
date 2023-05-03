import React from 'react'
import ReactDOM from 'react-dom'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/index.scss'

const DashboardPage = () => (
  <div>
    Dashboard Page
  </div>
)

const AddExpensePage = () => (
  <div>
    Add Expense Page
  </div>
)

const EditExpensePage = () => (
  <div>
    Edit Expense Page
  </div>
)

const HelpPage = () => (
  <div>
    Help Page
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage></DashboardPage>,
  },
  {
    path: '/create',
    element: <AddExpensePage></AddExpensePage>
  },
  {
    path: '/edit',
    element: <EditExpensePage></EditExpensePage>
  },
  {
    path: '/help',
    element: <HelpPage></HelpPage>
  }
])

const routes = (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
ReactDOM.render(routes, document.getElementById('app'))
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
