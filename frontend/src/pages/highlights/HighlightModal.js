import React from 'react';
import VideoModal from './VideoModal';

const HighlightModal = ({ highlights, onClose }) => {
  const [currentVideo, setCurrentVideo] = React.useState(null);

  // const handleVideoClick = (videoLink) => {
  //   setCurrentVideo(videoLink);
  // };
  const handleVideoClick = (embedCode) => {
    setCurrentVideo(embedCode);
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
  };

  // Function to get the container class based on the number of highlights
  const getContainerClass = (index) => {
    if (highlights.length === 1) {
      // Center the single highlight
      return "col-md-6 mx-auto";
    } else if (highlights.length === 2) {
      // Position two highlights at start and end
      return index === 0 ? "col-md-6 start" : "col-md-6 end";
    } else {
      // Default case for three or more highlights
      return "col-md-4";
    }
  };

  console.log(highlights);
  return (
    <div className="card highlight-component mb-3">
      <div className="row g-0">
        <div className="col-md-12">
          <div className="card-body position-relative">
            <button className="btn btn-light position-absolute top-0 end-0 componentButton" onClick={onClose}>X</button>
            <h5 className="statsTitle text-center athleticFont">-HIGHLIGHTS-</h5>
            <div className="row historyScroll" style={{ overflowY: 'auto', maxHeight: '500px' }}>
              {highlights.map((highlight, index) => (
                <div className={`${getContainerClass()} highlight-item mb-3`} key={index} onClick={() => handleVideoClick(highlight.videoLink)}>
                  <div className="d-flex justify-content-center align-items-center my-2">
                    <div className="col">
                      <div className="row">
                        <video className='img-fluid video-thumb' src={highlight.videoLink} alt="video" />
                      </div>
                      <div className="row">
                        <p className="highlight-title text-capitalize">{highlight.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {currentVideo && <VideoModal videoLink={currentVideo} onClose={handleCloseVideo} />} */}
      {currentVideo && <VideoModal embedCode={currentVideo} onClose={handleCloseVideo} />}
    </div>
  );
};

export default HighlightModal;