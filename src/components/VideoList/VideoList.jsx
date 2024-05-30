import React from 'react';

const VideoList = ({ videos, handleVideoClick, toggleBookmark }) => {
  return (
    <ul>
      {videos.map((video, index) => (
        <li key={index}>
          <span onClick={() => handleVideoClick(video)}>{video.file.name}</span>
          <button onClick={() => toggleBookmark(index)}>
            {video.bookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
