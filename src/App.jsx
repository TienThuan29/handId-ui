import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ADMIN_PAGE, DEFAULT_PAGE, HOME_PAGE, LOGIN_PAGE, RECORD_PAGE, ROLE_HANDLING_PAGE } from "./config/Constant"
import LoginPage from "./page/LoginPage"
import HomePage from "./page/HomePage"
import AdminPage from "./page/AdminPage"
import RecordPage from "./page/RecordPage"
import { AuthProvider } from "./context/AuthContext"
import RoleHandlingPage from "./page/RoleHandlingPage"

function App() {
  return (
    <div>
      <BrowserRouter>

        <AuthProvider>

          <Routes>

            <Route path={DEFAULT_PAGE} element={<LoginPage />}></Route>

            <Route path={LOGIN_PAGE} element={<LoginPage />}></Route>

            <Route path={HOME_PAGE} element={<HomePage />}></Route>

            <Route path={ADMIN_PAGE} element={<AdminPage />}></Route>

            <Route path={RECORD_PAGE} element={<RecordPage />}></Route>

            <Route path={ROLE_HANDLING_PAGE} element={ <RoleHandlingPage/> } ></Route>

          </Routes>

        </AuthProvider>

      </BrowserRouter>

    </div>
  )
}

export default App
