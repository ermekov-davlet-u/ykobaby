import { Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage";

import "./App.css";
import CabinetPage from "./components/CabinetPage";
import "./styles/Header.css";

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
