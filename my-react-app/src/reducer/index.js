import {
    INCREMENT,
    DECREMENT,
    CHANGE_THEME,
    ADD_POST,
    REMOVE_POST,
    ADD_POSTS,
    CHANGE_LIKE,
    CHANGE_DISLIKE,
    CHANGE_TAB,
  } from "../actions";
  
  const initialState = {
    count: 0,
    isBlackTheme: false,
    post: null,
    posts: null,
    tab: "all",
  };
  
  // const action = {
  //   type: "INCREMENT",
  // };
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT:
        return {
          ...state,
          count: state.count + 1,
        };
      case DECREMENT:
        return {
          ...state,
          count: state.count - 1,
        };
      case CHANGE_THEME:
        return {
          ...state,
          isBlackTheme: !state.isBlackTheme,
        };
      case ADD_POST:
        return {
          ...state,
          post: action.payload,
        };
      case REMOVE_POST:
        return {
          ...state,
          post: null,
        };
      case ADD_POSTS:
        return {
          ...state,
          posts: action.payload,
        };
      case CHANGE_LIKE:
        return {
          ...state,
          posts: state.posts.map((post) => {
            return post.id === action.id
              ? { ...post, like: !post.like, dislike: false }
              : post;
          }),
        };
      case CHANGE_DISLIKE:
        return {
          ...state,
          posts: state.posts.map((post) => {
            return post.id === action.id
              ? { ...post, dislike: !post.dislike, like: false }
              : post;
          }),
        };
      case CHANGE_TAB:
        return {
          ...state,
          tab: action.tab,
        };
      default:
        return state;
    }
  };
  