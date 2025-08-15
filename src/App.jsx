import React, { useState } from "react";
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
const App = () => {

const [loading, setLoading] = useState(true)

useState(() => {
  const handleState = () => setLoading(false)
  window.addEventListener("load",handleState)
  return () => window.removeEventListener("load", handleState)
})

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
    </Routes>
<Footer />
    </>
  );
};

export default App;
