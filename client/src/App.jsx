import React, { useContext } from "react";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import AppRoutes from "./routes/AppRoute";
import { useUser } from "./context/UserContext";
import NavbarDashboard from "./components/Blog/NavbarDashboard";

export default function App() {
  const { isLogged } = useUser();
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {isLogged ? <NavbarDashboard /> : <Navbar />}
        <main className="flex-grow pt-16">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}
