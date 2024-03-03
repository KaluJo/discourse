import logo from "./logo.svg";
import "./App.css";
import Theme from "./Theme";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { ChakraProvider } from "@chakra-ui/react";
import Main from "./pages/Main";
import Video from "./pages/Video";

function App() {
  return (
    // <ChakraProvider theme={Theme}>
    //   <Main />
    // </ChakraProvider>
    <ChakraProvider theme={Theme}>
      <Router>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/video" element={<Video />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ChakraProvider>
  );
}

export default App;
