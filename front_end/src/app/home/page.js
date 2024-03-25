"use client";
import styles from "../../app/css/page.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';

export default function Home() {
  return (
    <main className={styles.main}>
      <img
        src="/_next/static/media/icon_transparent.e1a2640c.png"
        alt="Innovation for Impact Logos" 
        width="30%"
      />
      <div class={styles.title}>
        <h1 style={{color:'#FFFF'}}>
          HOME PAGE!
        </h1>
      </div>
    <footer>	
      <p>&copy; Innovation for Impact 2024</p>	
    </footer>	
  </main>
  );
}