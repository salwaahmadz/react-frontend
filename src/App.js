import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Absensi from "./Absensi";
import { Text } from "@chakra-ui/react";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/absensi" element={<Absensi />} />
        <Route
          path="*"
          element={
            <Text fontSize="5xl" textAlign="center">
              404 Page not found!
            </Text>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;