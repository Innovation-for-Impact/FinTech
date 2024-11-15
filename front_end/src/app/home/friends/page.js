"use client";
import styles from "../../../app/css/page.module.css";
import friendStyles from "../../../app/css/friends.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import Icon from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_search } from 'react-icons-kit/md/ic_search';
import { ic_person } from 'react-icons-kit/md/ic_person';
import Image from 'next/image';

export default function Friends() {
  const [isOpen, setIsOpen] = useState(false);

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

  const activityData = [
    {
      user: "Regan",
      action: "saved",
      amount: "$25",
      target: "Julia's Trip to Cabo",
      trend: "up"
    },
    {
      user: "Julia",
      message: "did not meet monthly savings goal for June. Send a message of support!"
    },
    {
      user: "Regan",
      action: "saved",
      amount: "$25",
      target: "Julia's Trip to Cabo",
      trend: "up"
    },
    {
      user: "Prabhleen",
      message: "just joined FinTech!"
    }
  ];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.hamburger} onClick={handleIconClick}>
          {isOpen ? <Icon icon={ic_close} size={55} /> : <Icon icon={ic_menu} size={55} />}
        </div>

        <nav className={styles.navbar}>
          <ul className={`${styles.nav_menu} ${isOpen ? styles.open : ''}`}>
            <li>
              <Link className={styles.nav_item} href="/" onClick={handleLinkClick}>
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link className={styles.nav_item} href="/goals" onClick={handleLinkClick}>
                <p>Goals</p>
              </Link>
            </li>
            <li>
              <Link className={styles.nav_item} href="/calculator" onClick={handleLinkClick}>
                <p>Calculator</p>
              </Link>
            </li>
            <li>
              <Link className={`${styles.nav_item} ${styles.active}`} href="/friends" onClick={handleLinkClick}>
                <p>Friends</p>
              </Link>
            </li>
            <li>
              <Link className={styles.nav_item} href="/profile" onClick={handleLinkClick}>
                <p>Profile</p>
              </Link>
            </li>
          </ul>

          <Image
            className={styles.img}
            src="/icon_transparent.png"
            alt="Innovation for Impact logo"
            width={45}
            height={45}
            priority
          />
        </nav>
      </header>

      <div className={friendStyles.pageContainer}>
        <div className={friendStyles.activitySection}>
          <div className={friendStyles["dot-top-left"]}></div>
          <div className={friendStyles["dot-top-right"]}></div>
          <div className={friendStyles["dot-bottom-left"]}></div>
          <div className={friendStyles["dot-bottom-right"]}></div>
          
          <h2 className={friendStyles.sectionTitle}>Your Friends</h2>
          
          {activityData.map((activity, index) => (
            <div key={index} className={friendStyles.activityCard}>
              <div className={friendStyles.avatarWrapper}>
                <Image 
                  src="/default-avatar.png"
                  alt={`${activity.user}'s avatar`}
                  width={40}
                  height={40}
                  className={friendStyles.userAvatar}
                />
              </div>
              <div className={friendStyles.activityContent}>
                {activity.action ? (
                  <p>
                    <strong>{activity.user}</strong> {activity.action} {activity.amount} towards {activity.target} 
                    {activity.trend === 'up' && ' ↑'}
                  </p>
                ) : (
                  <p><strong>{activity.user}</strong> {activity.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>

        <div className={friendStyles.actionBar}>
          <button className={friendStyles.payRequestButton}>
            Pay or Request
          </button>
          <div className={friendStyles.searchWrapper}>
            <input 
              type="search" 
              placeholder="Search" 
              className={friendStyles.searchInput}
            />
            <Icon icon={ic_search} size={20} className={friendStyles.searchIcon} />
          </div>
        </div>

        <div className={friendStyles.friendsGrid}>
          {[...Array(12)].map((_, index) => (
            <div 
              key={index} 
              className={`${friendStyles.friendCard} ${
                index % 3 === 0 ? friendStyles.colorVariant1 : 
                index % 3 === 1 ? friendStyles.colorVariant2 : 
                friendStyles.colorVariant3
              }`}
            >
              <div className={friendStyles.friendInfo}>
                <div className={friendStyles.avatarCircle}>
                  <Icon icon={ic_person} size={24} className={friendStyles.personIcon} />
                </div>
                <div className={friendStyles.nameInfo}>
                  <h3>Name</h3>
                  <p>Username</p>
                </div>
              </div>
              <button className={friendStyles.viewButton}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      <footer className={friendStyles.footer}>
        <div className={friendStyles.footerLogo}>
          <Link href="/">
            <Image src="/logo.png" alt="FinTech Logo" width={30} height={30} />
          </Link>
        </div>
        <div className={friendStyles.footerLinks}>
          <Link href="/faq">FAQ</Link>
          <Link href="/support">Support</Link>
        </div>
      </footer>
    </main>
  );
}