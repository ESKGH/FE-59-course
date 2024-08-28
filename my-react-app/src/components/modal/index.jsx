import { useEffect, useRef, useState } from "react";
 import { countryList } from "./country-list.js";
import "./styles.scss";

export const Modal = ({ setIsShowModal }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const inputNameRef = useRef(null); // {current: null}
  const inputConfirmPassRef = useRef(null); // {current: null}
  // console.log(values, errors, inputNameRef);

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const handleChangeText = (event, field) => {
    setValues((prevState) => ({ ...prevState, [field]: event.target.value }));
  };

  // более сложное но произвоительное решение
  // const handleChangeText = (field) => (event) =>
  //   setValues((prevState) => ({ ...prevState, [field]: event.target.value }));

  const handleSave = () => {
    if (values.pass === values.confirmPass) {
      // все хорошо, парорли совпали
      if (errors.confirmPass) {
        setErrors({});
      }

      console.log("Отправляем все данные в values на сервер: ", values);
    } else {
      setErrors({ confirmPass: "Пароли не совпадают!" });
      inputConfirmPassRef.current.focus();
    }
  };

  const handleClick = () => {
    setIsShowModal(false);
  };

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <h4 className="modal__title">Sing up now</h4>
        <label htmlFor="modalName">Name</label>
        <input
          type="text"
          className="modal__input"
          id="modalName"
          // onInput={handleChangeName}
          onInput={(event) => handleChangeText(event, "name")}
          ref={inputNameRef}
          // onInput={handleChangeText("name")}
        />
        <label htmlFor="modalEmail">Email</label>
        <input
          type="text"
          className="modal__input"
          id="modalEmail"
          // onInput={handleChangeEmail}
          onInput={(event) => handleChangeText(event, "email")}
          // onInput={handleChangeText("email")}
        />
        <label htmlFor="modalPass">Password</label>
        <input
          type="password"
          className="modal__input"
          id="modalPass"
          // onInput={handleChangePass}
          onInput={(event) => handleChangeText(event, "pass")}
          // onInput={handleChangeText("pass")}
        />
        <label htmlFor="modalConfirmPass">Confirm Password</label>
        <input
          type="password"
          className="modal__input"
          id="modalConfirmPass"
          // onInput={handleChangeConfPass}
          onInput={(event) => handleChangeText(event, "confirmPass")}
          // onInput={handleChangeText("confirmPass")}
          ref={inputConfirmPassRef}
        />
        {errors.confirmPass && (
          <p className="modal__error">{errors.confirmPass}</p>
        )}
        <label htmlFor="modalCountry">Choose your country:</label>
        <select
          className="modal__input"
          id="modalCountry"
          // onChange={handleChangeCountry}
          onChange={(event) => handleChangeText(event, "country")}
          // onChange={handleChangeText("country")}
        >
          {countryList.map((item, index) => {
            return (
              <option value={item} key={`${item}_${index}}`}>
                {item}
              </option>
            );
          })}
          {/* <option value="Беларусь">Беларусь</option>
          <option value="Россия">Россия</option>
          <option value="Украина">Украина</option>
          <option value="Казахстан">Казахстан</option>
          <option value="США">США</option>
          <option value="Канада">Канада</option>
          <option value="Польша">Польша</option> */}
        </select>
        <div className="modal__actions">
          <button className="modal__cancel" onClick={handleClick}>
            Cancel
          </button>
          <button className="modal__save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
