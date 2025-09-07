import { Routes, Route } from "react-router-dom";
import { Hero } from "../pages/Hero";
import Login from "../pages/Login";
import { Profile } from "../pages/Profile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
