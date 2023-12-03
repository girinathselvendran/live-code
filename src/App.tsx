import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "./pages/authentication";
import { EditorPage } from "./pages/editor";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "./context/context";
import { Auth } from "./components/auth/auth";
import { PrivateRoute } from "./utilitiy/common/protectedRoute";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <GlobalContext.Provider value={{ name, setName }}>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              duration: 3000,
            },
          }}
        />

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute component="auth" children={<Auth />} />}
            />
            <Route path="/" element={<Auth />}></Route>
            <Route path="/room-auth" element={<Authentication />}></Route>
            <Route path="/editor/:id" element={<EditorPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
