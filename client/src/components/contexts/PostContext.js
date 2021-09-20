import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "./constains";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispacth] = useReducer(postReducer, {
    post: null, //WHEN USER HASN'T CLICK ON EDIT BUTTON
    posts: [],
    postLoading: true,
  });

  //HANDLE MODAL
  const [showAddPost, setShowAddPost] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
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

  //ADD POST
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}posts`, newPost);
      if (response.data.success) {
        dispacth({
          type: ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //DELETE POST
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}posts/${postId}`);
      if (response.data.success) {
        dispacth({
          type: DELETE_POST,
          payload: postId,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  // FIND POST WHEN USER CLICK EDIT
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispacth({
      type: FIND_POST,
      payload: post,
    });
  };

  //UPDATE POST
  const hdanleUpdatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispacth({
          type: UPDATE_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //POST CONTEXT DATA
  const postContextData = {
    postState,
    getPost,
    showAddPost,
    setShowAddPost,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    hdanleUpdatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
