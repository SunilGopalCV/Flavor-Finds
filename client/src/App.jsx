import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./pages/components/Header";
import Community from "./pages/Community";
import Explore from "./pages/Explore";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}
