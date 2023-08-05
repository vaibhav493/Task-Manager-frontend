import React from "react";
import { Flex, Button, Box, Heading, Center } from "@chakra-ui/react";
import { updateTask, deleteTask } from "../Redux/TaskSlice/Task";
import { useDispatch } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";

export default function TaskCard({
  title,
  description,
  status,
  _id,
  modelOpen,
  setInputFormTitle,
  liftDataToUpdate,
}) {
  const shadow = "rgba(221, 84, 255, 0.24) 0px 3px 8px";
  const trueShadow =
    "rgba(32, 173, 255, 0.3) 0px 19px 38px, rgba(0, 65, 185, 0.477) 0px 15px 12px";
  const dispatch = useDispatch();

  const handleUpdtStatus = () => {
    let payload = {
      data: { title, description, status: !status },
      id: _id,
    };
    dispatch(updateTask(payload));
  };

  const handleUpdate = () => {
    setInputFormTitle(true);
    liftDataToUpdate({ title, description, _id });
    modelOpen();
  };
  return (
    <Box
      padding={"20px"}
      boxShadow={status ? trueShadow : shadow}
      bgColor={status ? "rgb(9, 146, 57)" : "#283144"}
      h="200px"
      borderRadius={"5px"}
      border={"1px solid gray"}
    >
      <Center>
        <Heading color={"pink.200"} size={"md"}>
          {title}
        </Heading>
      </Center>
      <Center color={"gray.300"}>{description}</Center>
      <Center position={"relative"} bottom={"-60px"}>
        <Flex gap={"10px"}>
          <Button
            fontSize={"13px"}
            name="delete"
            colorScheme="red"
            variant={"outline"}
            onClick={() => dispatch(deleteTask(_id))}
          >
            <DeleteIcon />
          </Button>
          <Button
            fontSize={"13px"}
            w="80px"
            name="edit"
            colorScheme="cyan"
            variant={"outline"}
            onClick={handleUpdate}
          >
            Edit
          </Button>
          <Button
            onClick={handleUpdtStatus}
            fontSize={"13px"}
            name="status"
            w="150px"
            colorScheme="messenger "
            variant={"outline"}
          >
            Mark as {status ? "Incomplete" : "Complete"}
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
