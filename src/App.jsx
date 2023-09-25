import React, { useEffect,useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestion } from "./actions/question";
import { getAllUsers } from "./actions/users";
//////////////////////Style///////////////////
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();

  // whenever dispatch get called this useEffect will run
  useEffect(() => {
    dispatch(fetchAllQuestion());
    dispatch(getAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  });

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
};

export default App;
