import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Header from "./pages/components/Header";
import Community from "./pages/Community";
import Explore from "./pages/Explore";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}
