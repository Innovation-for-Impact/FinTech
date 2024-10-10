"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
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
  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`}>
      <header className={styles.homeHeader}>
        <div className={homeStyles.hamburger} onClick={handleIconClick}>
          {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
        </div>
        <div className={homeStyles.homeContainer}>
          <div className={homeStyles.homeSubcontainer}>
            <nav className={homeStyles.homeNavbar}>
              <ul className={`${homeStyles.nav_menu} ${isOpen ? homeStyles.open : ''}`}>
                <li>
                  <Link className={homeStyles.nav_item} href = "profile/.." onClick={handleLinkClick}>
                    <p>Home</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "profile/../goals" onClick={handleLinkClick}>
                    <p>Goals</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "profile/../calculator" onClick={handleLinkClick}>
                    <p>Calculator</p>
                  </Link>
                </li>
                <li>
                  <Link className={homeStyles.nav_item} href = "profile/../friends" onClick={handleLinkClick}>
                    <p>Friends</p>
                  </Link>
                </li>
                <li>
                  <Link className={`${homeStyles.nav_item} ${homeStyles.active}`} href = "profile" onClick={handleLinkClick}>
                    <p>Profile</p>
                  </Link>
                </li>
              </ul>
              <img className={homeStyles.img} src="/_next/static/media/icon_transparent.e1a2640c.png" alt="Innovation for Impact logo" width="4.5%" />
            </nav>
          </div>
        </div>
      </header>
      <div className={homeStyles.homePage}>
        <div className={styles.homeTitle}>
          <h1 style={{ color: '#32415E' }}>Profile</h1>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
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
      </form>
    </main>
  )
}