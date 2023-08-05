import axios from "axios";

const setVerificationToken = (data) => {
  let varification_token = data;
  localStorage.setItem("varificationToken", varification_token);
};

export const getVerificationToken = () => {
  let token = localStorage.getItem("varificationToken");
  return token;
};

export const register = async (data) => {
  try {
    let res = await axios.post(
      "https://thoughtful-bandanna-deer.cyclic.app/user/register",
      data
    );

    return res;
  } catch (err) {
    return err;
  }
};

export const login = async (data) => {
  try {
    let res = await axios.post(
      "https://thoughtful-bandanna-deer.cyclic.app/user/login",
      data
    );
    console.log("res::", res);
    setVerificationToken(res.data.token);
    return res;
  } catch (err) {
    return err;
  }
};
