import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// with each req from the frontend we are intercepting it
// modifying the headers
// here I can go ahead and attach headers
// sending token with each req to database
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData); // similar to postman
export const signUp = (authData) => API.post("/user/signup", authData); // sending request here

export const postQuestion = (questionData) =>
  API.post("/questions/ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answers/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  }); // patch request to the backend to update the question data
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answers/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
