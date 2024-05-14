import "./App.css";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setLoggedIn, setEmail: setContextEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (email === "") {
      setEmailError("Please enter your email");
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      isValid = false;
      return isValid;
    }

    checkAccountExists((accountExists) => {
      // If yes, log in
      if (accountExists) logIn();
      // Else, ask user if they want to create a new account and if yes, then log in
      else if (
        window.confirm(
          "An account does not exist with this email address: " +
            email +
            ". Do you want to create a new account?"
        )
      ) {
        if (email === "" || password === "") {
          setEmailError("Please set your email and password");
          setPasswordError("Please set your email and password");
        } else {
          logIn();
        }
      }
    });
  };

  // Call the server API to check if the given email ID already exists
  const checkAccountExists = (callback) => {
    fetch("http://localhost:3080/check-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.userExists);
      });
  };

  // Log in a user using email and password
  const logIn = () => {
    fetch("http://localhost:3080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("success" === r.message) {
          localStorage.setItem(
            "user",
            JSON.stringify({ email, token: r.token })
          );
          setLoggedIn(true);
          setContextEmail(email);
          navigate("/home");
        } else {
          window.alert("Wrong email or password");
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box bg="white" width="80%" padding={4} borderRadius={"lg"}>
          <Heading color="#282c34" size="md" padding={4}>
            WELCOME TO MY APP
          </Heading>
          <FormControl
            color="#282c34"
            padding={4}
            isInvalid={emailError !== "" || passwordError !== ""}
          >
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}

            <FormLabel marginTop={4}>Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {passwordError && (
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            )}
          </FormControl>
          <Button size="md" colorScheme="green" mt="24px" onClick={handleLogin}>
            Sign in
          </Button>
        </Box>
      </header>
    </div>
  );
};

export default Login;
