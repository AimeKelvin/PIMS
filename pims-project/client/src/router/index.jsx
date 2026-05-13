import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/page1" element={
          <ProtectedRoute>
            <Page1 />
          </ProtectedRoute>
        } />

        <Route path="/page2" element={
          <ProtectedRoute>
            <Page2 />
          </ProtectedRoute>
        } />

        <Route path="/page3" element={
          <ProtectedRoute>
            <Page3 />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
