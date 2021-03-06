// import dependencies
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT, DELETE_THOUGHT } from "../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../utils/queries";

// functionality
const CommentForm = () => {
  const [thoughtText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn("Congrats on having something to say!");
      }

      // update thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    },
  });

  const [deleteThought, { error1 }] = useMutation(DELETE_THOUGHT, {
    update(cache, { data: { deleteThought } }) {
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, deleteThought] } },
        });
      } catch (e) {
        console.warn("Congrats on having something to say!");
      }

      // update thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    },
  });

  // adapt based on user-generated info in form
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // form submit function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addThought({
        variables: { thoughtText },
      });

      // delete form inputs
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // delete button function
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await deleteThought({
        variables: { thoughtText },
      });

      // delete form inputs
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // pretty pretty styling
  return (
    <div>
      <p
        className={`p-3 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch pl-3"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder=" Here's a new thought..."
          value={thoughtText}
          className="form-input col-12 col-md-9 dome"
          onChange={handleChange}
        ></textarea>

        <button
          className="btn col-12 col-md-4 px-3 py-2 align-middle dome"
          type="submit"
        >
          Submit
        </button>

        <button
          className="btn col-12 col-md-4 px-3 py-2 align-middle dome"
          type="submit"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

// export this beast
export default CommentForm;
