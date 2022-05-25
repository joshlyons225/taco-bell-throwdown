// import graphQL dependency
import { gql } from "@apollo/client";

// mutation controllers
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      replyCount
      replies {
        _id
      }
    }
  }
`;

export const DELETE_THOUGHT = gql`
  mutation deleteThought($thoughtText: String!) {
    deleteThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      replyCount
      replies {
        _id
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation addReply($thoughtId: ID!, $replyBody: String!) {
    addReply(thoughtId: $thoughtId, replyBody: $replyBody) {
      _id
      replyCount
      replies {
        _id
        replyBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const UPVOTE_FOOD = gql`
  mutation upvote($food: String!) {
    upvote(food: $food) {
      _id
      username
      upvote
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;
