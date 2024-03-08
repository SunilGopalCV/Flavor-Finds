import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Header from "./pages/components/Header";
import Community from "./pages/Community";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./pages/components/PrivateRoute";
import Recipe from "./pages/Recipe";
import CreateRecipe from "./pages/CreateRecipe";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header classname={`sticky`} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
