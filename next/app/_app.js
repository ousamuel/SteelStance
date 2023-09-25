import React, { useState, createContext, useContext , useEffect } from "react";
import { NextUIProvider, CircularProgress} from "@nextui-org/react";
import {Providers, Context} from "./providers"
import "./globals.css";


function MyApp({ Component, pageProps }) {
  
  

  console.log(records);
  return (
    <Providers>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Providers>
  );
}

export default MyApp;
