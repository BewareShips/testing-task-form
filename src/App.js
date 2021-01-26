import React, { useEffect, useState } from "react";
import "./App.scss";
import DropDown from "./DropDown";

const useValidation = (value, validations) => {
  const [reqNameError, setReqNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [reqPhoneError, setReqPhoneError] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isName":
          const nameRegular = /[-a-zA-Z ]+/;
          nameRegular.test(value.trim())
            ? setReqNameError(false)
            : setReqNameError(true);
          break;
        case "isEmail":
          const emailRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          emailRegular.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isPhone":
          const phoneRegular = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
          phoneRegular.test(value)
            ? setReqPhoneError(false)
            : setReqPhoneError(true);
          break;
      }
    }
  }, [value]);

  return {
    reqNameError,
    emailError,
    reqPhoneError,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

export default function App() {
  const name = useInput("", { isName: true });
  const email = useInput("", { isEmail: true });
  const phone = useInput("", { isPhone: true });

  const [dropDownValue, setDropDownValue] = useState("Язык");
  const [mainCheck, setMainCheck] = useState(false);
  const [inputValid, setInputValid] = useState(true);

  const nameMsgErr = name.isDirty && name.reqNameError;
  const emailMsgErr = email.isDirty && email.emailError;
  const phoneMsgErr = phone.isDirty && phone.reqPhoneError;

  useEffect(() => {
    if (
      name.reqNameError ||
      email.emailError  ||
      phone.reqPhoneError  ||
      !mainCheck ||
      dropDownValue === "Язык"
    ) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [name.reqNameError, email.emailError, phone.reqPhoneError, mainCheck, dropDownValue]);

  return (
    <div className="form">
      <h1>Регистрация</h1>
      <p>
        У вас есть аккунт? <a href="#">Войти</a>
      </p>
      <form>
        <div className="single-input">
          <label>
            Имя
            {nameMsgErr && (
              <div className="error-msg">
                Имя не должно содержать цифры и разрешены из символов только - и
                пробел
              </div>
            )}
            <input
              onChange={(e) => name.onChange(e)}
              value={name.value}
              onBlur={(e) => name.onBlur(e)}
              name="name"
              placeholder="Введите ваше имя"
              type="text"
              className="contact-form"
            />
          </label>
        </div>
        <br />
        <div className="single-input">
          <label>
            Email
            {emailMsgErr && (
              <div className="error-msg">Введите корректный email</div>
            )}
            <input
              onChange={(e) => email.onChange(e)}
              value={email.value}
              onBlur={(e) => email.onBlur(e)}
              name="email"
              placeholder="Введите ваше email"
              className="entry-field"
              type="email"
              className="contact-form"
            />
          </label>
        </div>
        <br />
        <div className="single-input">
          <label>
            Номер телефона
            {phoneMsgErr && (
              <div className="error-msg">Введите корректный телефон</div>
            )}
            <input
              onChange={(e) => phone.onChange(e)}
              value={phone.value}
              onBlur={(e) => phone.onBlur(e)}
              name="phone"
              placeholder="Введите номер телефона"
              type="tel"
              className="contact-form"
            />
          </label>
        </div>
        <br />
        <DropDown
          value={dropDownValue}
          onChange={(val) => setDropDownValue(val)}
        />
        <div className="control-group">
          <label className="control control-checkbox">
            Принимаю <a href="#">условия</a> пользования
            <input
              type="checkbox"
              name="accept-checkbox"
              checked={mainCheck}
              onChange={() => setMainCheck(!mainCheck)}
            />
            <div className="control_indicator"></div>
          </label>
        </div>
        <button disabled={inputValid} className="submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
