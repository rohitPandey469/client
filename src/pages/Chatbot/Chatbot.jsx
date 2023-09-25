import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import ChatbotChild from "./ChatbotChild";
import "../../App.css";

const Questions = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div style={{margin:0}} className="home-container-2">
        <ChatbotChild />
      </div>
    </div>
  );
};

export default Questions;
