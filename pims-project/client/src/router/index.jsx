import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/CategoryPage";
import Medicines from "../pages/MedicinesPage";
import Inventory from "../pages/InventoryPage";
import Sales from "../pages/SalesPage";
import BillsPage from "../pages/BillsPage";
import ReportPage from "../pages/ReportPage.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />


        <Route path="/" element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } />

        <Route path="/medicine" element={
          <ProtectedRoute>
            <Medicines />
          </ProtectedRoute>
        } />

        <Route path="/inventory" element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        } />

        <Route path="/sales" element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        } />

        <Route path="/bills" element={
          <ProtectedRoute>
            <BillsPage />
          </ProtectedRoute>
        } />

          <Route path="/report" element={
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}
