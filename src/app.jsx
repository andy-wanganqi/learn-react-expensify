import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  BrowserRouter,
  Routes, 
  Route,
  NavLink,
} from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/index.scss'

const Header = () => (
  <header>
    <p>
      <h1>Expensify</h1>
    </p>
    <div>
        <NavLink to="/" className="">Go home</NavLink>
        <NavLink to="/create" className="">Add Expense</NavLink>
        <NavLink to="/edit" className="">Edit Expense</NavLink>
        <NavLink to="/help" className="">Help</NavLink>
      </div>
  </header>
)

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
    404
  </div>
)

const ErrorPage = () => (
  <div>
    Error
  </div>
)

const routes = (
  <BrowserRouter>
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="/create" element={<AddExpensePage />}></Route>
        <Route path="/edit" element={<EditExpensePage />}></Route>
        <Route path="/help" element={<HelpPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  </BrowserRouter>
)

ReactDOM.createRoot(document.getElementById('root'))
  .render(routes);
