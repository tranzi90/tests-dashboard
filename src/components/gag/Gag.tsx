import React from "react";
import {Link, useHistory} from "react-router-dom";
import './Gag.css';

interface GagProps {
  text: string
}

const Gag = ({text}: GagProps) => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  }

  return <main className='gag'>
    <h2 className='gag__text'>
      {text}
    </h2>
    <button className='gag__back' onClick={handleClick}>
      <img
        className='back__arrow'
        src={process.env.PUBLIC_URL + '/back.svg'}
        alt="<"
      />
      <p className='back__text'>
        Back
      </p>
    </button>
  </main>
}

export default Gag;
