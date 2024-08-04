import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";

import "./App.css";
import TestPage from "./pages/TestPage/TestPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/SignUp/SignUp";

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
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
