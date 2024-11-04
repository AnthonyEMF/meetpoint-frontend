import { Route, Routes } from "react-router-dom"
import { ClientRouter } from "../features/client/routes"
import { SecurityRouter } from "../features/security/routes/SecurityRouter"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/security/*" element={<SecurityRouter />} />
        <Route path="*" element={ <ClientRouter /> }/>
    </Routes>
  )
}
