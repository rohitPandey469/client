// modify the data
import * as api from "../api";
import { setCurrentUser } from "./currentUser";

// register
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    // after signup this function getting the current user which can be
    // accessed through the useSelectorHook anywhere throughout the whole app
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

// sending the email here
export const sentOtp = (emailData, navigate) => async (dispatch) => {
  try {
    // console.log("Email DATA", emailData);
    const response = await api.sentOtp(emailData);
    if (response.status === 200) {
      // setSpinner(false);
      // toast("OTP sent successfully!");
      navigate("/user/otp", { state: emailData.email });
    }
  } catch (error) {
    // setSpinner(false);
    // toast.error("Email not registered!");
    setTimeout(() => {
      return navigate("/Auth");
    }, 5000);
    console.log(error);
  }
};

// sending the email and otp both
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    // getting the data from localStorage and passing
    // it to reducer to store in redux toolkit
    // and then accessing through useSelector hooks
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
