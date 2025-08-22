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

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Wait for fonts
        if (document.fonts) {
          await document.fonts.ready;
        }

        // Wait for images
        const images = Array.from(document.images);
        await Promise.all(
          images.map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve; // resolve anyway if image fails
            });
          })
        );
      } catch (err) {
        console.error("Error loading resources", err);
      }
    };

    // Combine resource load + 2.5s fake delay
    Promise.all([loadResources(), new Promise((res) => setTimeout(res, 2500))])
      .finally(() => setLoading(false));
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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
