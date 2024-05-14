import {
  SimpleGrid,
  Box,
  Flex,
  Heading,
  Card,
  CardHeader,
  Text,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const Home = () => {
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
          <Card marginTop={6}>
            <CardBody>
              <SimpleGrid minChildWidth="120px" spacing="40px" padding={6}>
                <Link to="/absensi">
                  <Box
                    bg="blue.500"
                    boxShadow={"lg"}
                    height="80px"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Heading size="md" color="white">
                      Absensi
                    </Heading>
                  </Box>
                </Link>
                <Box
                  bg="blue.500"
                  boxShadow={"lg"}
                  height="80px"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="md" color="white">
                    Finance
                  </Heading>
                </Box>
                <Box
                  bg="blue.500"
                  boxShadow={"lg"}
                  height="80px"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="md" color="white">
                    Report
                  </Heading>
                </Box>
                <Box
                  bg="blue.500"
                  boxShadow={"lg"}
                  height="80px"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="md" color="white">
                    Marketing
                  </Heading>
                </Box>
                <Box
                  bg="blue.500"
                  boxShadow={"lg"}
                  height="80px"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="md" color="white">
                    Performance
                  </Heading>
                </Box>
                <Box
                  bg="blue.500"
                  boxShadow={"lg"}
                  height="80px"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="md" color="white">
                    Feedback
                  </Heading>
                </Box>
              </SimpleGrid>
            </CardBody>
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

export default Home;