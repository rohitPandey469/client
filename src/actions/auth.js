// modify the data
import * as api from "../api";
import { setCurrentUser } from "./currentUser";

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
