import React from 'react';
import 'login.css';
import icon from '/images/icon.ico';

function login(){
  return(   
  <div className="login">
    <img src="images/icon_transparent.png" alt="Innovation for Impact logo" />
    <h2>WELCOME BACK!</h2>
      <div className="info">
        <input type="text" name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <p class="forgot"><a href = "recover.html">Forgot Password?</a></p>
        <button> LOGIN </button>
        <p>Don't have an account? <a href="signup.html">Sign Up</a></p>
      </div>
  </div>
  );
}
