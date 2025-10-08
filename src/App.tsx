import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import GlobalErrorHandler from "./components/error/global-error-handler";
import { ROUTES } from "./consts/routes.const";
import "./index.css";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalErrorHandler onRetry={() => window.location.reload()} />
    </>
  );
}

export default App;
