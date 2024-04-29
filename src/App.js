import "./App.css";
import MentalHealthForm from "./form";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase"; // Assuming you have Firebase authentication configured
import AuthPage from "./auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>chargement...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/mental-health-form"
            element={user ? <MentalHealthForm currentUser={user} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
