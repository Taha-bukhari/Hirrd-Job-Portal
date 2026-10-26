import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./App.css";
import Applayout from "./layouts/Applayout";
import LandingPages from "./pages/LandingPages";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/JobListing";
import JobPages from "./pages/JobPages";
import PostJob from "./pages/PostJob";
import SaveJob from "./pages/SaveJob";
import MyJobs from "./pages/MyJobs";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <LandingPages />,
      },
      {
        path: "/Onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Job/:id",
        element: (
          <ProtectedRoute>
            <JobPages />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postjob",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/savejob",
        element: (
          <ProtectedRoute>
            <SaveJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
