"use client";
import styles from "../../../app/css/page.module.css";
import homeStyles from "../../../app/css/home.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_search } from 'react-icons-kit/md/ic_search';

export default function Friends() {
  const [isOpen, setIsOpen] = useState(false);

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
      action: "just joined FinTech!"
    }
  ];

  return (
    <main className={`${styles.homeMain} ${homeStyles.body}`}>
      {/* Keep existing header code */}
      
      <div className={styles.friendsContainer}>
        <h2 className={styles.friendsTitle}>Your Friends</h2>
        
        <div className={styles.activitySlider}>
          {activityData.map((activity, index) => (
            <div key={index} className={styles.activityCard}>
              <img 
                className={styles.userAvatar}
                src="/default-avatar.png" 
                alt={`${activity.user}'s avatar`}
              />
              <div className={styles.activityContent}>
                {activity.action ? (
                  <p>
                    <strong>{activity.user}</strong> {activity.action} 
                    {activity.amount && ` ${activity.amount} towards `}
                    {activity.target}
                    {activity.trend === 'up' && ' ↑'}
                  </p>
                ) : (
                  <p>{activity.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actionBar}>
          <button className={styles.payRequestButton}>
            Pay or Request
          </button>
          <div className={styles.searchWrapper}>
            <input 
              type="search" 
              placeholder="Search" 
              className={styles.searchInput}
            />
            <Icon icon={ic_search} size={20} className={styles.searchIcon} />
          </div>
        </div>

        <div className={styles.friendsGrid}>
          {[...Array(12)].map((_, index) => (
            <div 
              key={index} 
              className={`${styles.friendCard} ${styles[`colorVariant${index % 3 + 1}`]}`}
            >
              <div className={styles.friendInfo}>
                <div className={styles.avatarCircle}>
                  <Icon icon={ic_person} size={24} />
                </div>
                <div className={styles.nameInfo}>
                  <h3>Name</h3>
                  <p>Username</p>
                </div>
              </div>
              <button className={styles.friendAction}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Keep existing footer code */}
    </main>
  );
}