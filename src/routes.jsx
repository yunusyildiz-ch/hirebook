import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Candidates from "./pages/Candidates";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Notes /> },
      { path: "/candidates", element: <Candidates /> },
      { path: "/tasks", element: <Tasks /> },
    ],
  },
]);

export default router;