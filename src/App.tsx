import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import { ROUTES } from "./consts/routes.const";
import "./index.css";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
