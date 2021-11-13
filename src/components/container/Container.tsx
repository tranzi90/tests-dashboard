import React from "react";
import './Container.css';

interface ContainerProps {
  children: JSX.Element | JSX.Element[]
}

const Container = ({children}: ContainerProps) => {
  return <div className='container'>
    <div className="container__inner">
      {children}
    </div>
  </div>
}

export default Container;
