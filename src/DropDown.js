import React, { useEffect, useRef, useState } from "react";
import "./dropDown.scss";

const DropDown = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);
  const languages = ["Русский", "Английский", "Китайский", "Испанский"];
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const close = (e) => {
    setOpen(e && e.target === ref.current);
  };
  return (
    <label>
      Язык
      <div className="dropdown">
        <div  onClick={() => setOpen(!open)}>
          <div className="selected-value" ref={ref}>
            {value}
          </div>
          <div className={`arrow ${open ? "open" : null}`} />
        </div>
        <div className={`options ${open ? "open" : null}`}>
          {languages.map((language, idx) => (
            <div
              key={`${language}__${idx}`}
              className={`option ${value === language ? "selected" : null}`}
              onClick={() => {
                onChange(language);
                setOpen(false);
              }}
            >
              {language}
            </div>
          ))}
        </div>
      </div>
    </label>
  );
};

export default DropDown;
