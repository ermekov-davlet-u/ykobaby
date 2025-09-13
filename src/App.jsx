import { Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage";

import "./App.css";
import CabinetPage from "./components/CabinetPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <PrivateRoute isAuthenticated={isAuthenticated}>
          <MainPage />
          // </PrivateRoute>
        }
      />
      <Route
        path="/cabinet"
        element={
          // <PrivateRoute isAuthenticated={isAuthenticated}>
          <CabinetPage />
          // </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
