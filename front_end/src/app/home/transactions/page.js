"use client";
import styles from "../../../app/css/page.module.css";
import Link from 'next/link';
import React, { useState } from "react";
import {Icon} from 'react-icons-kit';

export default function Home() {
  return (
    <main className={styles.main}>
      <div class={styles.title}>
        <h1 style={{color:'#FFFF'}}>
          Transactions Page
        </h1>
      </div>
    <footer>	
      <p>&copy; Innovation for Impact 2024</p>	
    </footer>	
  </main>
  );
}