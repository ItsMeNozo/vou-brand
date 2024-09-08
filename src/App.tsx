import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";

// Authentication Pages
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/SignUp/SignUp";

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
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./layouts/AuthLayout";

// Combine both auth and dashboard routes in a single router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/events" />, // Redirect root to /dashboard
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verification-success",
    element: <VerificationSuccess />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "brand",
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
        element: <SearchEventPage />, // Add the SearchEventPage route
      },
    ],
  },
  {
    path: "*",
    element: <div>Page not found</div>, // Handle 404s
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
