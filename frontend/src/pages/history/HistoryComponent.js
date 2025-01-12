import React from 'react';
import ReactMarkdown from 'react-markdown';

const HistoryComponent = ({ award, onClose }) => {
  console.log(award.data.attributes);

  return (
    <>
    <div className="card mb-3 historyComponent" style={{ maxHeight: '800px' }}>
      <div className="row">
        <div className="col-md-3">
          <img src={award.data.attributes.historyImageLink} alt="History" className="img-fluid historyImage" />
        </div>
        <div className="col-md-9">
          <div className="card-body position-relative">
            <button className="btn btn-light position-absolute top-0 end-0 componentButton" onClick={onClose}>X</button>

            <h5 className="card-title text-center historyComponentTitle athleticFont">-HISTORY-</h5>
            <div className="historyScroll" style={{ overflowY: 'auto', maxHeight: '500px' }}>
            <ReactMarkdown className="card-text awardHistoryText text-lowercase" style={{ textTransform: 'none', fontFamily: 'sans-serif' }}>
  {award.data.attributes.history}
</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


export default HistoryComponent;
