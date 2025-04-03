import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Notes from './pages/Notes'
import Candidates from './pages/Candidates'
import Tasks from './pages/Tasks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'notes', element: <Notes /> },
      { path: 'candidates', element: <Candidates /> },
      { path: 'tasks', element: <Tasks /> },
    ],
  },
])

export default router