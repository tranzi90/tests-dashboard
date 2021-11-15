import React from "react";
import './Button.css';

export enum ButtonColors {
  GREEN = 'button_green',
  GRAY = 'button_gray'
}

interface ButtonProps {
  color: ButtonColors,
  text: string,
  callback: () => void
}

const Button = ({color, text, callback}: ButtonProps) => {

  return <button onClick={callback} className={`button ${color}`}>
    {text}
  </button>
}

export default Button;
