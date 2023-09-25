import React, { useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faPen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UserProfile.css";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const users = useSelector((state) => state.usersReducer);
  const { id } = useParams();
  let currentProfile = users?.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);

  // console.log("CurrentProfile", currentProfile);
  // console.log("CurrentUser", currentUser);

  const [Switch, setSwitch] = useState(false);

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px "
                px="40px"
                py="30px"
              >
                {currentProfile?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>
                  {currentProfile?.name}{" "}
                  <span
                    title="badge/rank"
                    style={{ fontSize: "30px", color: "gray" }}
                  >
                    <i> - {currentProfile?.badge}</i>
                  </span>
                </h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
                <h2>
                  <FontAwesomeIcon icon={faStar} />{" "}
                  <i title="score">{currentProfile?.score}</i>
                </h2>
              </div>
            </div>
            {currentUser?.result?._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
        </section>
        {Switch ? (
          <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
        ) : (
          <ProfileBio currentProfile={currentProfile} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
