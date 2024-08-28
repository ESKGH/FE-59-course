// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducer";

// const store = createStore(reducer); // рабочий но утсаревшийметод
const store = configureStore({ reducer });

export default store;
