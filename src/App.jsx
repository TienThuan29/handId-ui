import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DEFAULT_PAGE, HOME_PAGE, LOGIN_PAGE } from "./config/Constant"
import LoginPage from "./page/LoginPage"
import HomePage from "./page/HomePage"

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
      
        <Routes>

          <Route path={DEFAULT_PAGE} element={ <LoginPage/> }></Route>

          <Route path={LOGIN_PAGE} element={ <LoginPage/> }></Route>

          <Route path={HOME_PAGE} element={ <HomePage/> }></Route>

        </Routes>
      
      </BrowserRouter>
     
    </div>
  )
}

export default App
