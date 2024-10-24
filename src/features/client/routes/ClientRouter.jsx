import { Footer, Nav, NavLogin } from '../components';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage, MainPage, UserPage, EventPage, CreateEventPage, EditEventPage, LoginPage, RegisterPage } from '../pages/';

export const ClientRouter = () => {
  const location = useLocation();

  return (
    <div className='overflow-x-hidden bg-gray-800 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover'>
      {/* Mostrar Login y Register en HomePage */}
      {['/home', '/login', '/register'].includes(location.pathname) ? <NavLogin /> : <Nav />}
      <div className="px-10">
        <div className="min-h-screen flex flex-col ">
          <Routes>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route path='/home' element={<HomePage/>}/>
              <Route path='/main' element={<MainPage/>}/>
              <Route path='/user' element={<UserPage/>}/>
              <Route path='/main/event/:id' element={<EventPage/>}/>
              <Route path='/main/event/create' element={<CreateEventPage/>}/>
              <Route path='/main/event/edit/:id' element={<EditEventPage/>}/>
              <Route path='/*' element={<Navigate to={"/home"}/>}/>
          </Routes>
        </div>
        </div>
      <Footer/>
    </div>
  )
}
