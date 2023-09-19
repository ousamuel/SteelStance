"use client";
import React, { useContext, useEffect } from "react";
import { Context } from "./providers";
import { useFormik } from "formik";
import { Divider } from "@nextui-org/react";

export default function Home() {
  const { setIsMenuOpen, user } = useContext(Context);

  return (
    <>
      <div className="home-body" style={{ backgroundColor: "#12A150" }}>
        <div id="home-wrap">
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <div style={{ zIndex: 1 }} className="texts">
            <p>STEELSTANCE</p>
            <p>STEELSTANCE</p>
          </div>
          <img className="home-logo" src="/images/pngegg.png" />
        </div>
        <div className="max-w-1/2">
          <div className="space-y-1 text-center">
            <h4 className="text-large font-large">Programs</h4>
            <p className="text-medium text-default-400">
              Join any of our programs, led by certified instructors.
            </p>
          </div>
          <Divider className="my-4" />
          <div className="flex h-5 justify-center align-center items-center space-x-4 text-small ">
            <img
              width={30}
              alt="boxing"
              src="./images/yoga.svg"
            />
            <Divider orientation="vertical" />
            <img
              width={30}
              alt="cycling"
              src="./images/cycle.svg"
            />
            <Divider orientation="vertical" />
            <img
              width={25}
              alt="boxing"
              src="./images/boxing.svg"
            />
          </div>
        </div>
      </div>
      <div
        className="home-body"
        style={{height: "max(100vh, 100vw)",backgroundColor: "#0d4324", color: "white" }}
      >
        <div id="home-wrap">
          <div style={{ width: "50%" }}>
          </div>
          <div style={{ width: "50%" }}>
            <img
              src="/images/boxing.svg"
              style={{
                height: "60px",
                width: "60px",
                filter: "hue-rotate(95deg)",
              }}
            />
            image
          </div>
        </div>
      </div>
    </>
  );
}
