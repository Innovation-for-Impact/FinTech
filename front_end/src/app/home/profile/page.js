"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import profileStyles from "../../../app/css/profile.module.css";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import Image_logo from 'next/image';
import logo from '../../../../public/innofunds-logo-transparent.png';
import { Navbar, Nav, Button, ModalFooter, CardImg } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'; 
import { FaCircleUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus } from "react-icons/fa6";
import Table from 'react-bootstrap/Table';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [legal_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address_city, setCity] = useState('');
  const [address_country, setCountry] = useState('');
  const [address_postal, setPostal] = useState('');
  const [address_region, setRegion] = useState('');
  const [address_street, setStreet] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      legal_name: legal_name,
      email: email,
      address_city: address_city,
      address_country: address_country,
      address_postal: address_postal,
      address_region: address_region,
      address_street: address_street,
    };
    try {
      const response = await fetch(localhost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setSubmitted(true);
        // Clear form inputs
        setName('');
        setEmail('');
        setCity('');
        setCountry('');
        setPostal('');
        setRegion('');
        setStreet('');
      } else {
        // Handle error
        console.error('Failed to submit form');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

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

  const [cards, setCards] = useState([
    { id: 1, balance: 100.0, name: "Card 1" },
    { id: 2, balance: 200.0, name: "Card 2" },
  ]);
  const [newCardName, setNewCardName] = useState("");
  const [newCardBalance, setNewCardBalance] = useState("");

  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        balance: parseFloat(newCardBalance) || 0,
        name: newCardName || `Card ${cards.length + 1}`,
      },
    ]);
    setShowModal(false);
    setNewCardName("");
    setNewCardBalance("");
  };

  const handleTransfer = (fromCardId, amount) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === fromCardId) {
          return { ...card, balance: card.balance - amount };
        }
        return card;
      })
    );
  };

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // sets the card_container height for the cards 
  useEffect(() => {
    const cardHeight = 155;
    const offset = 15;
    const totalHeight = cardHeight + (cards.length - 1) * offset;
    setTotalHeight(totalHeight);
  }, [cards.length]);

  // API for transaction history
  useEffect(() => {
      
      fetch('http://localhost:8000/api/v1/transactions/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setTransactions(data);
          } else {
            setTransactions([
              { id: 1, date: '11/21/2024', fromTo: 'Name', description: 'Groceries', amount: '-120.00' },
              { id: 2, date: '11/09/2024', fromTo: 'Name', description: 'Birthday Gift', amount: '+50.00' },
              { id: 3, date: '10/31/2024', fromTo: 'Name', description: 'Coffee', amount: '-5.00' },
            ]);
          }
        })
        .catch((error) => {
          console.error("transactions error:", error);
          setTransactions([
            { id: 1, date: '11/21/2024', fromTo: 'Name', description: 'Groceries', amount: '-120.00' },
            { id: 2, date: '11/09/2024', fromTo: 'Name', description: 'Birthday Gift', amount: '+50.00' },
            { id: 3, date: '10/31/2024', fromTo: 'Name', description: 'Coffee', amount: '-5.00' },
          ]);
        });
  },[]);

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
                  <Image_logo 
                    className={homeStyles.img}
                    src={logo}
                    alt="Innofunds Logo"
                    layout="intrinsic"
                  />
                </Navbar.Brand>
                <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/..">Home</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/../goals">Goals</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/../calculator">Calculator</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background}`} href="profile/../friends">Friends</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link className={`${homeStyles.nav_item} ${homeStyles.link_background} ${homeStyles.active}`} href="profile">Profile</Nav.Link>
                  </li>
                  <li>
                    {/* LOG OUT */}
                    <Button className={`${homeStyles.button_style} ${homeStyles.link_background}`} variant="primary" type="submit"> 
                      Log Out 
                    </Button>
                  </li>
                </ul>
              </Navbar>
          </div>
        </div>
        </header>

        {/* contents of profile page */}
        <div className={homeStyles.content}>
          <Container className={profileStyles.container}>
            <Container>
              {/* profile icon */}
              <FaCircleUser className={profileStyles.profile_icon} color="#BDCFCC"/>
              {/* <Image src="" rounded /> */}

              <p className={profileStyles.name}>Name</p>
              <p className={profileStyles.pronouns}>Pronouns</p>


              <Button className={`${profileStyles.groups_button}`} variant="primary" type="submit" onClick={() => { window.location.href = 'profile/../calculator'; }}>
                Groups 
              </Button> 
              <Button className={`${profileStyles.friends_button}`} variant="primary" type="submit" onClick={() => { window.location.href = 'profile/../friends'; }}>
                Friends
              </Button>

              <Row>
                  {/* notifications icon */}
                  <IoNotifications  className={profileStyles.notifications_icon}/>

                  {/* settings icon */}
                  <IoMdSettings className={profileStyles.settings_icon}/>
              </Row>
            </Container>
            
            {/* My Cards */}
            <Container className={profileStyles.card_container}>
              <Row className={profileStyles.row}>
                <p  className={profileStyles.card_title_container}> 
                  My Cards
                </p>

                <FaPlus className={profileStyles.card_plus_icon} onClick={() => setCards([...cards, { id: cards.length + 1, balance: 100, name: `Card ${cards.length + 1}` }])}/>
              </Row>

              <ListGroup className={profileStyles.card_stack} style={{ height: `${totalHeight}px` }}>
                  {cards.map((card, index) => (
                    <Card
                      key={card.id}
                      className={profileStyles.card}
                      style={{
                        transform: index === currentIndex
                        ? `translateY(0px) scale(1)` // current card
                        : index < currentIndex
                        ? `translateY(-${(currentIndex - index) * 20}px) scale(${1 - (currentIndex - index) * 0.1})` // cards behind
                        : `translateY(${(index - currentIndex) * 20}px) scale(${1 - (index - currentIndex) * 0.1})`, // cards ahead
                      opacity: index === currentIndex ? 1 : 0.7,
                      zIndex: cards.length - Math.abs(index - currentIndex),
                      }}
                    >
                      <Card.Body className={profileStyles.card_body}>
                        <Row className={profileStyles.row}>
                          <Card.Title className={profileStyles.card_title}>{card.name}</Card.Title>
                          <Card.Img className={profileStyles.card_img} src="holder.js/100px160"></Card.Img>
                        </Row>
                        <Card.Text className={profileStyles.card_text}>${card.balance.toFixed(2)}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
            </ListGroup>
            
            {/* previous / next buttons to switch card view */}
            <div className={profileStyles.card_navigation}>
              <Button className={profileStyles.previous_button} onClick={handlePreviousCard} disabled={currentIndex === 0}>
                Previous 
              </Button>
              <Button className={profileStyles.next_button} onClick={handleNextCard} disabled={currentIndex === cards.length - 1}>
                Next
              </Button>
            </div>
              
              {/* transfer money button */}
              <Button className={`${profileStyles.transfer_button}`} variant="primary" type="submit">
                Transfer
              </Button>
            </Container>
          </Container>

          {/* Transaction History */}
          <Container className={profileStyles.transaction_container}>
            <p className={profileStyles.transaction_title_container}>
              Transactions
            </p>

            <Table className={profileStyles.table}>

              <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className={profileStyles.transaction_fromTo}>{transaction.fromTo}</td> 
                      <td className={profileStyles.transaction_desc}>{transaction.description}</td>
                      <td className={profileStyles.transaction_date}>{transaction.date}</td>
                      <td className={profileStyles.transaction_amt}>
                        {/* add $ after +/- */}
                        {transaction.amount.startsWith('-') || transaction.amount.startsWith('+')
                          ? `${transaction.amount[0]}$${transaction.amount.slice(1)}`
                          : `$${transaction.amount}`} 
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>

          </Container>
        </div>

        {/* TODO: add page content here */}
        {/* <form onSubmit={handleFormSubmit}>
          <div className={styles.info}>
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Legal Name"
              name="name"
              value={legal_name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="City"
              name="city"
              value={address_city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Country"
              name="country"
              value={address_country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Postal Code"
              name="zip"
              value={address_postal}
              onChange={(e) => setPostal(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="State or Region"
              name="state"
              value={address_region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <input
              className={`${styles.input} ${submitted && styles.error}`}
              placeholder="Street Address"
              name="street"
              value={address_street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <button>CONFIRM</button>
          </div>
        </form> */}
        
        <ModalFooter className={homeStyles.footer}>
          <h1 className={homeStyles.footer_text} >InnoFunds</h1>
        </ModalFooter>
  </main>
  );
}




