export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const CHANGE_THEME = "CHANGE_THEME";
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_POSTS = "ADD_POSTS";
export const CHANGE_LIKE = "CHANGE_LIKE";
export const CHANGE_DISLIKE = "CHANGE_DISLIKE";
export const CHANGE_TAB = "CHANGE_TAB";

export const INCREMENT_ACTION = { type: INCREMENT };
export const DECREMENT_ACTION = { type: DECREMENT };
export const CHANGE_THEME_ACTION = { type: CHANGE_THEME };
export const REMOVE_POST_ACTION = { type: REMOVE_POST };

export const addPostAction = (post) => ({ type: ADD_POST, payload: post });
export const addPostsAction = (posts) => ({
  type: ADD_POSTS,
  payload: posts,
});
export const changeLikeAction = (id) => ({ type: CHANGE_LIKE, id });
export const changeDislikeAction = (id) => ({ type: CHANGE_DISLIKE, id });
export const changeTabAction = (tab) => ({ type: CHANGE_TAB, tab });
