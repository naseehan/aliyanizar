import React, { useEffect, lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Work = lazy(() => import("./pages/Work"))
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
const ArtWorkDetails = lazy(() => import("./pages/ArtWorkDetails")) ;
import CustomCursor from "./components/customCursor";
const Shop = lazy(() => import("./pages/Shop"));
const ArtWorks = lazy(() => import("./components/embla/ArtWorks"))
const DesignWork = lazy(() => import("./pages/DesignWork"))
const DesignWorkDetails = lazy(() =>import("./pages/DesignWorkDetails"));
const NotFound = lazy(() => import("./pages/NotFound")) ;
const Murals = lazy(() => import("./pages/Murals")) ;
const Interiors = lazy(() => import("./pages/Interiors")) ;
import { Analytics } from "@vercel/analytics/react";
// react toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import ProductSlider from "./components/ProductSlider";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="fade-in">
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      {/* <ProductSlider /> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Work />} />
          <Route path="/works/artWorks" element={<ArtWorks />} />
          <Route path="/works/artWorks/:slug" element={<ArtWorkDetails />} />
          <Route path="/works/designWorks" element={<DesignWork />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/murals" element={<Murals />} />
          <Route path="/works/designWorks/:title" element={<Interiors />} />
          <Route
            path="/works/designWorks/:title/:slug"
            element={<DesignWorkDetails />}
          />
        </Routes>
      </Suspense>
      <Footer />
      <Analytics />

      <ToastContainer
        position="top-right"
        autoClose={3000} // time in ms before auto-dismiss
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // options: "light", "dark", "colored"
      />
    </div>
  );
};

export default App;
