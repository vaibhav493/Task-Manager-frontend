import React, { useState } from "react";
import { login } from "../userAuthServices";
import { useNavigate } from "react-router-dom";
import { alertError } from "../utils/alertNotification";
import { ToastContainer } from "react-toastify";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function LoginUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const redirect = useNavigate();
  const handleInput = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value });
  };
  const handleLogin = async () => {
    setIsLoading(true);
    let check = Object.values(loginState).filter((ele) => Boolean(ele));

    if (check.length > 1) {
      let res = await login(loginState);

      setIsLoading(false);
      if (res?.data?.token) {
        redirect("/");
      }
      if (res?.response?.data?.error) {
        alertError("Invalid Credentials !");
      }
    } else {
      setIsLoading(false);

      alert("Need both input !");
    }
  };


  return (
    <>
      <Stack
        bgColor={"#1A202C"}
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        color={"gray.100"}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>
              Sign in and Manage Your Task Efficiently
            </Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                onInput={handleInput}
                type="email"
                required={true}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                onInput={handleInput}
                type="password"
                required={true}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                onClick={handleLogin}
                colorScheme={"pink"}
                isLoading={isLoading}
                variant={"solid"}
              >
                {isLoading ? "loggin in..." : "Log In"}
              </Button>
            </Stack>
            <Text>
              Dont't Have Account,
              <Text
                onClick={() => redirect("/register")}
                cursor={"pointer"}
                color={"cyan"}
                as={"span"}
              >
                {" "}
                Register here
              </Text>
            </Text>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Stack>
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
