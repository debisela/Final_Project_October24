import './App.css'
import { Route, Routes } from 'react-router-dom'
import IntroPage from './features/Welcome/IntroPage'
import SearchAttendee from './features/Search/SearchAttendee'
import Admin from './features/Admin/Admin'

function App() {
  

  return (
    <>
    <IntroPage/>
    <Routes>
      <Route path="/user" element={<SearchAttendee/>}/>
      <Route path="/admin" element={<Admin/>}/>
     </Routes>
    </>
  )
}

export default App
