import React from "react";

const Chatbox = (data) => {
  return (
    <React.Fragment>
      <div className="chat chat-start">
        <div className="chat-header">{data.username}</div>
        <div className="chat-bubble">{data.commentBody}</div>
      </div>
    </React.Fragment>
  );
};

export default Chatbox;
