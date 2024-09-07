import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

// Authentication Pages
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/SignUp/SignUp";

// Dashboard Pages
import DashboardPage from "./pages/Dashboard/DashboardPage";

// Brand Management Pages
import BrandInfoPage from "./pages/Brand/BrandInfoPage"; // Import Brand List Page

// Event Management Pages
import EventListPage from "./pages/Event/EventListPage"; // Import Event List Page
import CreateEventPage from "./pages/Event/CreateEventPage"; // Import Create Event Page
import EventDetailPage from "./pages/Event/EventDetailPage"; // Import Event Detail Page
import EventUpdatePage from "./pages/Event/EventUpdatePage";
// Voucher Management Pages
import VoucherListPage from "./pages/Voucher/VoucherListPage"; // Import Voucher List Page
import VoucherDetailPage from "./pages/Voucher/VoucherDetailPage"; // Import Voucher Detail Page
// Statistics Page
import StatisticsPage from "./pages/Statistics/StatisticsPage"; // Import the StatisticsPage component
import SearchEventPage from "./pages/Event/SearcheventPage";
import VerificationSuccess from "./pages/VerificationSuccess";

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/verification-success", // Add the route for verification success page
    element: <VerificationSuccess />,
  },
  {
    path: "/",
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "brands",
        element: <BrandInfoPage />, // List of brands
      },

      {
        path: "events",
        element: <EventListPage />, // List of events
      },
      {
        path: "events/create",
        element: <CreateEventPage />, // Create new event
      },
      {
        path: "events/:eventId",
        element: <EventDetailPage />, // Event detail view
      },
      {
        path: "events/update/:eventId",
        element: <EventUpdatePage />,
      },
      {
        path: "vouchers",
        element: <VoucherListPage />, // List of vouchers
      },
      {
        path: "vouchers/:voucherId",
        element: <VoucherDetailPage />, // Voucher detail view
      },
      {
        path: "statistics",
        element: <StatisticsPage />, // Add the StatisticsPage route
      },
      {
        path: "events/search",
        element: <SearchEventPage />, // Add the StatisticsPage route
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
