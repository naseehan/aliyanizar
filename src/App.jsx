import React from "react";
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
const App = () => {
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
