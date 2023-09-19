"use client";
import "./globals.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "./header";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header/>
          <div style={{ paddingTop: "10vh" }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
