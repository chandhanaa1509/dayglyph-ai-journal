import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import JournalDetailsPage from "../pages/journal/JournalDetailsPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRouter() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journal/:id"
          element={
            <ProtectedRoute>
              <JournalDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/" replace />
              : <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/" replace />
              : <RegisterPage />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;