import {
  Box,
  Flex,
  Heading,
  Card,
  CardHeader,
  Text,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Absensi = () => {
  const { loggedIn, email, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const onButtonClick = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Box bg="#282c34" width="100%" padding={6}>
          <Card>
            <CardHeader>
              <Flex align={"center"} justify={"space-between"}>
                <Heading color="#282c34" size="lg" padding={4}>
                  MY APP
                </Heading>
                <Text color="#282c34">Selamat datang <b>{email}</b>!</Text>
                <Button colorScheme="red" onClick={onButtonClick}>
                  Sign out
                </Button>
              </Flex>
            </CardHeader>
          </Card>
        </Box>
        <Box flex="1" />
        <Box padding={6}>
          <Text>© 2022 Salwa Ahmad Zanjabila</Text>
        </Box>
      </Box>
    </>
  );
};

export default Absensi;