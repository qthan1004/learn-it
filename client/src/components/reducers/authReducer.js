//NƠI LƯU TRỮ STATE LIÊN QUAN ĐẾN XÁC THỰC NGƯỜI DÙNG
export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };

    default:
      return state;
  }
};
