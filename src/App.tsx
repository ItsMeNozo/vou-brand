import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";

import "./App.css";
import TestPage from "./pages/TestPage/TestPage";

const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <Navbar /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TestPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
