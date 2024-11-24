import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Nav } from "../../client/components"
import { DashboardPage } from "../pages/DashboardPage"

export const AdministrationRouter = () => {
  return (
    <div className='overflow-x-hidden bg-gray-800 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover'>
      <Nav />
      <div className="px-10">
        <div className="min-h-screen flex flex-col ">
          <Routes>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/*' element={<Navigate to={"/dashboard"} />} />
          </Routes>
        </div>
        </div>
      <Footer/>
    </div>
  )
}
