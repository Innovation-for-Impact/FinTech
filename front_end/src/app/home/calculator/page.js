"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import calcStyles from "../../../app/css/calculator.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import Image from 'next/image';
import logo from '../../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');

  // MENU functions
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  const handleIconClick = (e) => {
    e.stopPropagation(); 
    toggleMenu();
  };
  // end MENU functions

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleSubmit = (e) => {
  }

  const handleLogout = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:8000/api/v1/auth/logout/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.detail === 'Successfully logged out.') {
        // successfully logged out
        localStorage.removeItem('access'); 
        window.location.href = '/'; 
      } else {
        // error messages
        setErrorMessage("Failed to log out");
      }
    })
    .catch(error => {
      console.error("Logout error:", error);
    });
  };

  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`} >
        
        {/* display menu (hamburger menu for mobile/tablet) */}
        <header className={styles.homeHeader}>
          {/* <a href = "#main"  className={homeStyles.skip}>Skip to Main Content</a> */}
          <div className={homeStyles.hamburger} onClick={handleIconClick}>
            {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
          </div>

          {/* display navigation links */}
          <div className={homeStyles.homeContainer}>
            <div className={homeStyles.homeSubcontainer}>
              <Navbar className={homeStyles.homeNavbar}>
                <Navbar.Brand>
                  {/* display logo */}
                  <Image 
                    className={homeStyles.img}
                    src={logo}
                    alt="Innofunds Logo"
                    layout="intrinsic"
                  />
                </Navbar.Brand>
                <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/..">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/../goals">Goals</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="calculator">Calculator</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/../friends">Friends</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="calculator/../profile">Profile</Nav.Link>
                  </li>
                  <li>
                    {/* LOG OUT */}
                    <Button className={`${homeStyles.button_style} ${homeStyles.link_background}`} variant="primary" type="submit" onClick={handleLogout}> 
                      Log Out 
                    </Button>
                  </li>
                </ul>
              </Navbar>
          </div>
        </div>
        </header>
      
        {/* header for current page */}
        <div className={homeStyles.content}>
        <FaPlus className={calcStyles.card_plus_icon} onClick={handleShowForm}/>

        {/* Form */}
        {showForm && (
            <Form className= {`${calcStyles.form_container}`} onSubmit={handleSubmit}>
                {/* accept NAME */}
                <Form.Group>
                  <Form.Control
                    className= {`${calcStyles.input}`}
                    placeholder="Name" // placeholder word (ie. shows up in gray-ed out font)
                    name="name"  // allow auto-fill
                    aria-label="name"
                    value={name} // save input to variable
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                {/* accept PURPOSE */}
                <Form.Group>
                  <Form.Control
                    className= {`${calcStyles.input}`}
                    placeholder="Purpose" // placeholder word (ie. shows up in gray-ed out font)
                    name="purpose"  // allow auto-fill
                    aria-label="purpose"
                    value={purpose} // save input to variable
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </Form.Group>

                {/* accept AMOUNT */}
                <Form.Group>
                  <Form.Control
                    className= {`${calcStyles.input}`}
                    placeholder="Amount" // placeholder word (ie. shows up in gray-ed out font)
                    name="amount"  // allow auto-fill
                    aria-label="amount"
                    value={amount} // save input to variable
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" className= {`${calcStyles.save_button}`} type="submit" onClick={handleCloseForm}>
                  Save
                </Button>
            </Form>
        )}
            
        </div>

      {/* TODO Chiho: add form here
          
          advice from Julia
          - create a form like line 88 (<form onSubmit...) of the login page

          - pay careful attention to how varaibles are declared (use ctrl + f to explore this)
          
          - pay attention to how things are 'sandwiched' in the html (ie. the <form> tag will be like the bun, each individual input will be like a hamburger topping) 

          - if you have HTML quesitons in general, check out w3schools.com (look up "w3schools input" or "w3schools form" and it will take you to a great page)

          - don't worry about how the styling looks (ie. colors, cute boxes, etc.) - just get the boxes to show up

          - send me a screenshot of your code with literally (and I really mean that) ANY question

          - when you want to make a comment, do "command + /" on Mac or "ctrl + /" on Windows
      
      */}

    <ModalFooter className={homeStyles.footer}>
      <h1 className={homeStyles.footer_text} >InnoFunds</h1>
    </ModalFooter>
  </main>
  );
}