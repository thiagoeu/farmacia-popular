import { Routes, Route } from 'react-router-dom';
import { Hero } from '../pages/Hero';
import { Login } from '../pages/Login';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/produtos" element={<Login />} />
    </Routes>
  );
};
