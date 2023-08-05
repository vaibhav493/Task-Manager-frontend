import { Route, Routes } from "react-router-dom";
import RegisterUser from "./Pages/RegisterUser";
import Tasks from "./Pages/Tasks";
import LoginUser from "./Pages/LoginUser";
import PrivateRoute from "./Components/PrivateRoute";
export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<LoginUser />} />
    </Routes>
  );
}
