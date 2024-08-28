import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../header/header";
import { MainPage } from "../main-page";
import { Modal } from "../modal";
import { NotFound } from "../not-found";
import { MyContext } from "../hooks/context.hook";
import { MovieDetail } from '../moviedetails';
import "./styles.scss";

export const App = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const isBlackTheme = useSelector((state) => state.isBlackTheme);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  

return (
    <BrowserRouter>
      <MyContext.Provider value={{ isBlackTheme }}>
        <Header onSearch={handleSearch}/>
        <main className={isBlackTheme ? "black-theme" : ""}>
          <Routes>
            <Route
              path="/"
              element={<MainPage setIsShowModal={setIsShowModal} searchTerm={searchTerm} />}
            />
            {/* <Route path="/blog/:category" element={<BlogPage />} />
            <Route path="/blog/:category/:postId" element={<PostDetaild />} /> */}
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/" element={<MovieCatalog />} /> */}
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
        {isShowModal && <Modal setIsShowModal={setIsShowModal} />}
      </MyContext.Provider>
    </BrowserRouter>
  );
};




