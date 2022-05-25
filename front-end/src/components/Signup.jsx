// import files & dependencies
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Logo1 from '../assets/images/campeon.png';

const Signup = () => {
  // create functionality
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // add user-generated info on form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // render pretties
  return (
    <section className='h-full gradient-form bg-gray-200 md:h-screen signup mx-auto my-auto'>
      <div className='bg-grey-lighter min-h-screen flex flex-col'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <img className='mx-auto' src={Logo1} alt='logo' />
            <h1 className='mb-8 text-3xl text-center text-rose-500'>SIGN UP</h1>
            <form id='signup-form' onSubmit={handleFormSubmit}>
              <input
                type='text'
                className='block border border-grey-light w-full p-3 rounded mb-4'
                name='email'
                id='email-signup'
                placeholder='Email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                type='text'
                className='block border border-grey-light w-full p-3 rounded mb-4'
                name='username'
                id='username-signup'
                placeholder='Username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                type='password'
                className='block border border-grey-light w-full p-3 rounded mb-4'
                name='password'
                id='password-signup'
                placeholder='Password'
                value={formState.password}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='w-full text-center py-3 border-rose-500 text-rose-500 font-medium text-xs leading-tight uppercase rounded hover:bg-rose-500  hover:text-white focus:outline-none my-1'
              >
                Create Account
              </button>
            </form>
            {/* set error popup for incorrect credentials */}
            {error && (
              <div py-2 px-3>
                Login failed, Bot. Try username and/or password again. Beep,
                boop.
              </div>
            )}
          </div>

          <div className='text-grey-dark mt-6'>
            <a href='/login' className='signup'>
              Already Have An Account? Log In.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
