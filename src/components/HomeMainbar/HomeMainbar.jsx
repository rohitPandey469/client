import React, { useEffect } from "react";
import "./HomeMainbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";

const HomeMainbar = () => {
  // questionsList.data is having the value sent from backend
  const questionsList = useSelector((state) => state.questionsReducer);

  // var questionsList = [
  //   {
  //     _id: 1,
  //     upVotes: 3,
  //     downVotes: 1,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js"],
  //     userPosted: "mano",
  //     askedOn: "Jan 1",
  //     tags: ["java", "python", "c"],
  //     userId: 1,
  //     answer: [
  //       {
  //         answerBody: "Answering",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];
  var User = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    if (User === null) {
      navigate("/Auth");
    }
  }, [User]);

  const navigate = useNavigate();

  const checkAuth = () => {
    if (User === null) {
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  const location = useLocation();
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={() => checkAuth()} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{questionsList?.data?.length} questions</p>
            <QuestionList questionsList={questionsList?.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
