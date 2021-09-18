//CHECK FILE ENV XEM ĐANG Ở MÔI TRƯỜNG LOCAL HAY ĐÃ DEPLOY
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api/"
    : "somedeployUrl";
export const LOCAL_STORAGE_TOKEN_NAME = "learnit";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
