import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../userAuthServices";
import {
  alertSuccess,
  alertError,
  alertInfo,
} from "../utils/alertNotification";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  Box,
  SimpleGrid,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      {/* <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" /> */}
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function RegisterUser() {
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const redirect = useNavigate();
  const handleInput = ({ target }) => {
    setRegisterState({ ...registerState, [target.name]: target.value });
  };
  const handleRegister = async () => {
    let check = Object.values(registerState).filter((ele) => !Boolean(ele));
    if (check.length == 0) {
      let res = await register(registerState);
      if (res?.status == "201") {
        alertSuccess("Succesfully registered, now Login to enter !");
        setTimeout(() => {
          redirect("/login");
        }, 2000);
      }
      if (res?.response?.data?.error) {
        alertError("This email allready exists, you should login");
      }
    } else {
      alertInfo("All fields required !");
    }
  };

  return (
    <>
      <Box position={"relative"} bgColor={"#1A202C"} h="100vh">
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              color={"#ED64A6"}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              JOIN THE BEST TASK MANAGER <br />
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
                fontSize={"22px"}
              >
                made with ❤️ by vaibhav waghmare
              </Text>{" "}
            </Heading>
          </Stack>
          <Stack
            border={"2px solid pink"}
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Register Now
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  {" "}
                  !!
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                only for youhhhhh.....
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  onInput={handleInput}
                  required="true"
                  placeholder="enter your name"
                  bg={"gray.100"}
                  name="name"
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onInput={handleInput}
                  required="true"
                  name="email"
                  placeholder="youremail@gmail.com"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  onInput={handleInput}
                  required="true"
                  name="password"
                  placeholder="enter password"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </Stack>
              <Button
                onClick={handleRegister}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Register !
              </Button>
            </Box>
            <p>
              Allready A user
              <Text
                onClick={() => {
                  redirect("/login");
                }}
                cursor={"pointer"}
                textDecoration={"underline"}
                as={"span"}
                fontWeight={"bold"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                {"  "}Login Here !
              </Text>
            </p>
          </Stack>
        </Container>
        <Blur
          position={"absolute"}
          top={-10}
          left={-10}
          style={{ filter: "blur(70px)" }}
        />
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
