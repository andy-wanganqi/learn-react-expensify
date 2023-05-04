import React from 'react'
import { NavLink } from 'react-router-dom'

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

export default Header