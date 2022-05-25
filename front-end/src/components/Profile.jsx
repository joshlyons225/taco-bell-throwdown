// import dependencies
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import CommentWall from './CommentWall';
import CommentForm from './CommentForm';

// functionality code
const Profile = (props) => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // set user
  const user = data?.me || data?.user || {};

  // roll to profile if logged in approved/authenticated
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  // give a cool original Xbox loading message...
  if (loading) {
    return <div>Loading... like it's 2001</div>;
  }

  // kickback message if not logged in
  if (!user?.username) {
    return (
      <p>Sign in, or no happy fun joy time for you. This app is for winners.</p>
    );
  }

  // handle click function
  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  console.log(user.username);

  // pretty pretty styling
  return (
    <div>
      <div className='flex-row mb-3'>
        <h2 className='bg-dark text-secondary p-3 display-inline-block text-6xl'>
          Welcome to {userParam ? `${user.username}'s` : 'your'} Thunderdome.
        </h2>

        {userParam && (
          <button className='btn ml-auto' onClick={handleClick}>
            Playdate!
          </button>
        )}
      </div>

      <div className='flex-row justify-space-between mb-3'>
        <div className='col-12 mb-3 pl-3 col-lg-8'>
          <CommentWall
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>
      </div>
      <div className='mb-3'>{!userParam && <CommentForm />}</div>
    </div>
  );
};

// export this beast
export default Profile;
