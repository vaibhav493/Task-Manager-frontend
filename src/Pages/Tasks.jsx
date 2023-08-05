import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ConfirmationModal from "../utils/ConfirmModel";
import { useDispatch, useSelector } from "react-redux";
import PopUpModel from "../utils/PopUpModel";
import TaskInputForm from "../Components/TaskInputForm";
import { getTasks } from "../Redux/TaskSlice/Task";
import { EditIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import TaskCard from "../Components/TaskCard";
import { alertSuccess } from "../utils/alertNotification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputformTitle, setInputFormTitle] = useState(false);
  const [editTaskValues, setEditTaskValues] = useState({
    title: "",
    description: "",
    _id: "",
  });
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.tasksReducer);

  const showAlert = (msg) => {
    alertSuccess(msg);
  };
  const handleAddTask = () => {
    setInputFormTitle(false);
    onOpen();
  };

  const liftDataToUpdate = (data) => {
    setEditTaskValues(data);
  };
  //for logout model
  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    localStorage.removeItem("varificationToken");
    setShowConfirmation(false);
    redirect("/register");
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <>
      <PopUpModel isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <TaskInputForm
          formTitle={inputformTitle ? "Edit" : "Add"}
          closeFunc={onClose}
          alertFunc={showAlert}
          editTaskValues={editTaskValues}
          setEditTaskValues={setEditTaskValues}
        />
      </PopUpModel>
      <Box color="white" h="100vh" w="100%" bgColor={"#171923"}>
        <Box height={"68px"} w="100%" borderBottom={"1px solid grey"}>
          <Flex
            w="100%"
            spacing={4}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              _hover={{ bgColor: "skyblue" }}
              isLoading={store.isLoading}
              m="10px"
              boxShadow={"rgba(67, 130, 255, 0.536)  0px 3px 8px"}
              w="200px"
              leftIcon={<EditIcon />}
              colorScheme="cyan"
              variant="outline"
              onClick={handleAddTask}
            >
              Add New Task
            </Button>
            <Button
              m="10px"
              colorScheme="red"
              leftIcon={<ExternalLinkIcon />}
              variant={"outline"}
              boxShadow={"rgba(255, 0, 34, 0.574)  0px 3px 8px"}
              onClick={handleLogout}
            >
              Log out !
            </Button>
          </Flex>
        </Box>
        <Box
          h="90%"
          overflowY={"scroll"}
          // overflow={"hidden"}
          // border={"1px solid red"}
          w="100%"
        >
          <Grid
            mt="30px"
            justifyContent={"center"}
            templateColumns={"repeat(3,470px)"}
            gap="20px"
          >
            {store.taskData.map((ele, ind) => {
              return (
                <GridItem key={ind}>
                  <TaskCard
                    modelOpen={onOpen}
                    setInputFormTitle={setInputFormTitle}
                    liftDataToUpdate={liftDataToUpdate}
                    {...ele}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <ConfirmationModal
        message="Are you sure to loggin out ?"
        isOpen={showConfirmation}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </>
  );
}
