import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Navigate to="/login" />} />
      <Route path="/dashboard" exact element={<Home />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/signup" exact element={<SignUp />}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
