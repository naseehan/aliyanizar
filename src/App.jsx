import React, { useEffect, useState } from "react";
import {  Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Work from "./pages/Work";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import ProjectDetails from "./pages/ProjectDetails";
import ArtWorkDetails from "./pages/ArtWorkDetails";
const App = () => {

const [loading, setLoading] = useState(false)

useEffect(() => {
    // Fake loading for 2s, replace with your real data-loading logic
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


if(loading){
  return(
    <Loader />
  )
}

  return (
    <>
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
    </Routes>
<Footer />
    </>
  );
};

export default App;
