import React from 'react';
import './VideoPopup.css';

const VideoPopup = ({ video, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="popup">
      <span className="closePopup" onClick={onClose}>&times;</span>
      <video controls src={video.url}></video>
    </div>
  );
};

export default VideoPopup;
