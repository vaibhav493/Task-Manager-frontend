import React from "react";
import { useState, useEffect } from "react";
import { Stack, Heading, Input, Button, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../Redux/TaskSlice/Task";
import { alertError } from "../utils/alertNotification";
import { ToastContainer } from "react-toastify";

export default function TaskInputForm({
  closeFunc,
  alertFunc,
  formTitle,
  editTaskValues,
  setEditTaskValues,
}) {
  const [taskState, setTaskState] = useState({
    title: "",
    description: "",
    status: false,
  });
  const dispatch = useDispatch();
  const handleInput = ({ target }) => {
    if (formTitle === "Edit") {
      setEditTaskValues({ ...editTaskValues, [target.name]: target.value });
    } else {
      setTaskState({ ...taskState, [target.name]: target.value });
    }
  };
  const handleSubmitTask = async () => {
    let check = Object.values(
      formTitle == "Edit" ? editTaskValues : taskState
    ).filter((ele) => Boolean(ele));

    if (check.length > 1) {
      if (formTitle === "Edit") {
        let payload = {
          id: editTaskValues._id,
          data: {
            title: editTaskValues.title,
            description: editTaskValues.description,
          },
        };
        dispatch(updateTask(payload));
      } else {
        dispatch(createTask(taskState));
      }
      closeFunc();
      let msg =
        formTitle === "Edit"
          ? "👍 Successfully edited task !"
          : "👍 Added new task !";
      alertFunc(msg);
    } else {
      alertError("All fields required");
    }
  };

  return (
    <>
      <Stack
        bg={"gray.50"}
        bgColor={"gray.500"}
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
            {formTitle} Your Task 📝📝
          </Heading>
        </Stack>
        <Box as={"form"} mt={10}>
          <Stack spacing={4}>
            <Input
              value={
                formTitle == "Edit" ? editTaskValues.title : taskState.title
              }
              required={true}
              name="title"
              onInput={handleInput}
              placeholder="enter task title"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <Input
              value={
                formTitle == "Edit"
                  ? editTaskValues.description
                  : taskState.description
              }
              required={true}
              placeholder="describe task"
              onInput={handleInput}
              name="description"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
          </Stack>
          <Button
            fontFamily={"heading"}
            mt={8}
            onClick={handleSubmitTask}
            w={"full"}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
          >
            {formTitle} Task
          </Button>
        </Box>
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
