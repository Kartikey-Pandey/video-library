import React, { useState } from 'react';
import VideoList from './components/VideoList/VideoList';
import VideoPopup from './components/VideoPopup/VideoPopup';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newVideos = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      bookmarked: false
    }));
    setVideos(prevVideos => [...prevVideos, ...newVideos]);
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
  };

  const toggleBookmark = (index) => {
    setVideos(prevVideos => {
      const updatedVideos = [...prevVideos];
      updatedVideos[index].bookmarked = !updatedVideos[index].bookmarked;
      if (updatedVideos[index].bookmarked) {
        setBookmarks(prev => new Set(prev).add(index));
      } else {
        setBookmarks(prev => {
          const newBookmarks = new Set(prev);
          newBookmarks.delete(index);
          return newBookmarks;
        });
      }
      return updatedVideos;
    });
  };

  const toggleFilter = () => {
    setShowBookmarksOnly(!showBookmarksOnly);
  };

  const closePopup = () => {
    setCurrentVideo(null);
  };

  const filteredVideos = showBookmarksOnly
    ? videos.filter((_, index) => bookmarks.has(index))
    : videos;

  return (
    <div className="App">
      <h1>Video Library</h1>
      <input type="file" id="videoInput" multiple onChange={handleVideoUpload} />
      <button id="filterButton" onClick={toggleFilter}>
        {showBookmarksOnly ? 'Show All' : 'Show Bookmarked'}
      </button>
      <VideoList 
        videos={filteredVideos} 
        handleVideoClick={handleVideoClick} 
        toggleBookmark={toggleBookmark} 
      />
      {currentVideo && (
        <VideoPopup video={currentVideo} isOpen={!!currentVideo} onClose={closePopup} />
      )}
    </div>
  );
}

export default App;
