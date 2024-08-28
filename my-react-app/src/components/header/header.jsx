import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.scss";
import { SearchBar } from '../searchbar/searchbar'; // Импортируем компонент строки поиска

export const Header = ({ onSearch }) => {
  const header = useRef(null); // не null, а {current: null};
  const isBlackTheme = useSelector((state) => state.isBlackTheme);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value); // обновляем локальное состояние
    if (onSearch) {
      onSearch(value); // вызываем переданный коллбэк
    }
  };
  return (
    <header className={`header`} ref={header}>
      <div className="search-container">
        {/* Заменяем input на SearchBar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      </div>
      <nav className="navbar">
        <div className="menu" ref={menuRef}>
          <button onClick={toggleDropdown} className="menu-button">
            Меню
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              <li className="dropdown-menu__item">
                <Link to="/" className="header__link">
                  Home "должен быть профиль"
                </Link>
              </li>
              <li className="dropdown-menu__item">
                <Link to="profile" className="header__link">
                  Профиль
                </Link>
              </li>
              <li className="dropdown-menu__item">
                <Link to="todos" className="header__link">
                  ToDos "должен быть выход"
                </Link>
              </li>
              <li className="dropdown-menu__item">
                <Link to="game" className="header__link">
                  Новости WorkInProgress
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};