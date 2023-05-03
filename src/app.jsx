import React from 'react'
import ReactDOM from 'react-dom/client'
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

const NotFoundPage = () => (
  <div>
    404 Page
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
  },
  {
    path: '/*',
    element: <NotFoundPage></NotFoundPage>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
