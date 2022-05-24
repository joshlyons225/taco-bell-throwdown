// import dependencies
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";

// functionality code
const Profile = (props) => {


    // pretty pretty styling
    return (

    )
}

// export this beast
export default Profile;