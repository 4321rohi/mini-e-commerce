import Card from "./components/Card"
import Form from "./components/Form"
import Navbar from "./components/Navbar"
import Sort from "./components/Sort"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sort />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  )
}

export default App
