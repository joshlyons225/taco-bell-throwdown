// import files & dependencies
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Logo1 from "../assets/images/campeon.png";
import Logo from "../assets/images/tall-head.png";

const Login = (props) => {
  // create functionality
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // adapt to user inputs on form
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
      const { data } = await login({
        variables: { ...formState },
      });

      // login token auth and error logging
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form inputs
    setFormState({
      email: "",
      password: "",
    });
  };

  // render pretties
  return (
    <section
      className="h-full gradient-form bg-gray-200 md:h-screen login"
      id="login"
    >
      <div className="container py-12 px-6 h-full mx-auto">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={Logo1} alt="logo" />
                      <h4 className="text-5xl font-semibold mt-1 mb-12 pb-1 text-rose-400">
                        Team Taco Bell
                      </h4>
                    </div>
                    <form id="login-form" onSubmit={handleFormSubmit}>
                      <p className="mb-4 text-center">
                        Log In To Get This Party Started.
                      </p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          name="email"
                          id="email-login"
                          placeholder="Email"
                          value={formState.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          name="password"
                          id="password-login"
                          placeholder="Password"
                          value={formState.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          id="login-button"
                          className="form-control block px-6 border-rose-500 text-rose-500 font-normal text-xs leading-tight uppercase rounded shadow-md hover:bg-rose-500 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 py-2"
                          type="login-button"
                        >
                          LOG IN
                        </button>
                        <audio
                          id="audio"
                          src="../assets/sounds/taco-bell-bong.mp3"
                        ></audio>
                        <a
                          className="text-gray-500 hover:no-underline hover:text-rose-500"
                          href="#!"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      {/* set error popup for incorrect credentials */}
                      {error && (
                        <div py-2 px-3>
                          Login failed, Bot. Try email and/or password again.
                          Beep, boop.
                        </div>
                      )}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2 text-gray-500">
                          Need An Account?
                        </p>
                        <a
                          href="/signup"
                          className="inline-block px-6 py-2 border-2 border-rose-500 text-rose-500 font-medium text-xs leading-tight uppercase rounded hover:bg-rose-500  hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        >
                          SIGN UP
                        </a>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                  <img src={Logo} alt="tb background"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
