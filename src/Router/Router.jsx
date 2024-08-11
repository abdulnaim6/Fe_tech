import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import Signup from "../page/Signup";
import Data from "../page/Data";
import Detail from "../page/Detail";
import ProtectedRoute from "../components/ProtectRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/data" element={<Data />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
