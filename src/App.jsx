import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">HiReBOOK</h1>
      <Outlet />
    </div>
  )
}

export default App
