// import dependencies
import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

const CommentWall = ({ thoughts, title }) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  // set user
  const user = data?.me || data?.user || {};

  if (!thoughts.length) {
    return <p>Your wall is empty, just like your social life.</p>;
  }
  // give a cool original Xbox loading message...
  if (loading) {
    return <div>Loading... like it's 2001</div>;
  }

  // pretty pretty styling
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3 ">
            <p className="card-header pl-3">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>
              {`${user.username}`} really gives a crap on {thought.createdAt}{" "}
              about:
            </p>

            {/* thought display */}

            <div className='card-body px-3 py-2 text-l w-10/12 outline font-light bg-white dome'>

              <p>{thought.thoughtText}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

// export this beast
export default CommentWall;
