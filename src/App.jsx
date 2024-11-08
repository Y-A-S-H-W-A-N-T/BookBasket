import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/home"
import Book from "./Pages/book"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/book/works/:bookID" Component={Book}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
