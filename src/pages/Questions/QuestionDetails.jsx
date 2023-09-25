import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import "./Questions.css";
import { useDispatch, useSelector } from "react-redux";
import { postAnswer } from "../../actions/question";
import moment from "moment";

import copy from "copy-to-clipboard";
import { deleteQuestion, voteQuestion } from "../../actions/question";

const QuestionDetails = () => {
  const { id } = useParams(); // id type - string

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
  useEffect(()=>{
    if(User===null){
      navigate("/Auth")
    }
  },[User])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      navigate("/Auth");
    } else {
      if (answer == "") {
        alert("Enter an answer before submitting");
      } else {
        // trigger the action - postAnswer
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: User?.result.name,
            userId: User?.result._id,
          })
        );
        setAnswer("");
      }
    }
  };

  const location = useLocation();
  const url = "https://stack-over-api.onrender.com";
  const handleShare = (e) => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", User?.result?._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", User?.result?._id));
  };

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id == id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt="upvote"
                        width="18"
                        onClick={()=>handleUpVote()}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt="downvote"
                        width="18"
                        onClick={()=>handleDownVote()}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question?.questionTags?.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button onClick={()=>handleShare()}>Share</button>
                          {User?.result?._id === question?.userId && (
                            <button onClick={()=>handleDelete()}>Delete</button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers </h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => handlePostAns(e, question.answer.length)}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>Browse other Question tagged</p>
                  {question.questionTags?.map((tag) => (
                    <Link to="/Tags" key={tag} className="ans-tags">
                      {tag}
                    </Link>
                  ))}{" "}
                  or{" "}
                  <Link
                    to="/AskQuestion"
                    style={{ textDecoration: "none", color: "#009dff" }}
                  >
                    ask your own question
                  </Link>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
