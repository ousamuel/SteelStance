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

        <div className="max-w-1/2 text-center">
          <h1 className="text-5xl mb-2 text-white">WELCOME</h1>
          <Divider className="my-2" />

          <div className="space-y-1 text-center max-w-1/2 px-5">
            <h4 className="text-large font-large">Personal Records</h4>

            <p className="text-medium text-default-400 text-gray-300 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex my-4 h-5 justify-center align-center items-center space-x-4 text-small ">
            <img width={25} alt="boxing" src="./images/squat.svg" />
            <Divider orientation="vertical" />
            <img width={30} alt="cycling" src="./images/bench.svg" />
            <Divider orientation="vertical" />
            <img width={25} alt="boxing" src="./images/dl.svg" />
          </div>
          <Divider className="my-2" />
          <div className="space-y-1 text-center mt-2">
            <h4 className="text-large font-large">Programs</h4>

            <p className="text-medium text-default-400 text-gray-300">
              Join any of our programs, led by certified instructors.
            </p>
          </div>
          <div className="flex my-3 h-5 justify-center align-center items-center space-x-4 text-small ">
            <img width={30} alt="boxing" src="./images/yoga.svg" />
            <Divider orientation="vertical" />
            <img width={30} alt="cycling" src="./images/cycle.svg" />
            <Divider orientation="vertical" />
            <img width={25} alt="boxing" src="./images/boxing.svg" />
          </div>
        </div>
      </div>
      <div
        className="home-body flex text-center items-center align-center justify-center"
        style={{
          height: "100vh",
          backgroundImage: "url(/images/ai1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="welcome-page mb-3  mx-2 italic uppercase px-4 text-black">
          where fitness meets transformation
        </h1>
      </div>
    </>
  );
}
