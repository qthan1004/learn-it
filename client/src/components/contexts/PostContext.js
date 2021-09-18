import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "./constains";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispacth] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });
  //GET ALL POSTS
  const getPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}posts`);

      if (response.data.success) {
        dispacth({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispacth({
        type: POSTS_LOADED_FAIL,
      });
    }
  };

  //POST CONTEXT DATA
  const postContextData = { postState, getPost };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
