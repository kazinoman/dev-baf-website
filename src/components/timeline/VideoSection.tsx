// components/VideoSection.js
import React from "react";
import { FaPlay } from "react-icons/fa6";

const TeamHistoryVideoSection = () => {

  return (
    <div className="rts-video-section my-10 md:my-16 lg:my-28">
      <div className="container">
        <div className="video-section-inner text-center">
          <div className="play-video">
            <a
              className="popup-video"
              href="https://www.youtube.com/watch?v=G4t6TqG5LM8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-play" />
              <FaPlay size={28}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHistoryVideoSection;
