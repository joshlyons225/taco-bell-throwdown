// import dependencies
import React from "react";
import { Link } from "react-router-dom";

const CommentWall = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <p>Your wall is empty, just like your social life.</p>;
  }

  // pretty pretty styling
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{" "}
              really gives a crap about {thought.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Hot Takes: {thought.replyCount} || Click to{" "}
                  {thought.replyCount ? "see" : "start"} Throwdown!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

// export this beast
export default CommentWall;
