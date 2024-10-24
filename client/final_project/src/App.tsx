import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './features/Header/Header'
import IntroPage from './features/Welcome/IntroPage'
import SearchAttendee from './features/Search/SearchAttendee'
import Admin from './features/Admin/Admin'

function App() {
  const location = useLocation()
  

  return (
    <>
    {location.pathname !=='/' && <Header/>}
    <Routes>
     <Route path="/" element={<IntroPage/>}/>
      <Route path="/user" element={<SearchAttendee/>}/>
      <Route path="/admin" element={<Admin/>}/>
     </Routes>
    </>
  )
}

export default App
