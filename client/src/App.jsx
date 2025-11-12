import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import useThemeStore from "./store/themeStore";
import { Toaster } from 'react-hot-toast'
import Protectedroute from "./components/Protectedroute";
import Adminroutes from "./components/Adminroutes";
import Createpost from "./components/Createpost";

const App = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <BrowserRouter>
    <Toaster />
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<Protectedroute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<Adminroutes />}>
              <Route path="/create-post" element={<Createpost />} />
            </Route>
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App
