import React from "react";
import './../../styles/components/MainScreen.scss';

export const MainScreen: React.FC = () => {
  return (
    <div className="MainScreen">
      <div className="Screen">
        <h1 className="Screen__title">
          Test assignment for front-end developer
        </h1>


        <p className="Screen__text">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>


        <a 
          href="#Forms"
          className="button"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};