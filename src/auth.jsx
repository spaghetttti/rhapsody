import React, { useState, useContext } from "react";
import { auth } from "./firebase"; // Assuming you have imported auth from your Firebase configuration
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Link } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  auth.onAuthStateChanged(setCurrentUser);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AuthContext);
  console.log(email, password);
  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Logged in:", userCredential.user);
        setEmail("");
        setPassword("");
        // ...
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log("Signed up:", userCredential.user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
  };

  const handleSignout = async () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error("Signout error:", error);
      });
  };

  return (
    <div className="container mx-auto max-w-sm px-4 py-8">
      {currentUser ? (
        <>
          <h1 className="text-xl font-bold mb-4">
            Bienvenu, {currentUser.email}
          </h1>
          <Link
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700"
            to="/mental-health-form"
          >
            Accéder à la page de la santé mentale
          </Link>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 mt-4 rounded shadow hover:bg-red-700"
            onClick={handleSignout}
          >
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Rhapsody - Authentication</h1>
          <form onSubmit={handleLogin}>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              className="block text-gray-700 font-bold mb-2 mt-4"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full shadow hover:bg-blue-700 mt-4"
              type="submit"
            >
              Se connecter
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <button
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700 mt-4"
              onClick={handleSignup}
            >
              Créer un compte
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  );
}
