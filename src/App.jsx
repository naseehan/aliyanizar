import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Work from "./pages/Work";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import ProjectDetails from "./pages/ProjectDetails";
import ArtWorkDetails from "./pages/ArtWorkDetails";
import CustomCursor from "./components/customCursor";
import Shop from "./pages/Shop";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {


   const timer =  setTimeout(() => {
      setLoading(false)
    },2500)

    return () => clearTimeout(timer)
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fade-in">
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/works" element={<Work />} />
        <Route path="/projectsDetails/:slug" element={<ProjectDetails />} />
        <Route path="/artworkdetails/:slug" element={<ArtWorkDetails />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
