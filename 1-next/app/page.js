"use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "./providers";
import { useFormik } from "formik";
import { Divider, Input, Button, Tooltip } from "@nextui-org/react";

export default function Home() {
  const { setIsMenuOpen, user } = useContext(Context);
  const [weight, setWeight] = useState(0);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [bmi, setBMI] = useState(0);
  const [color, setColor] = useState("");

  function calculate() {
    const calcBMI =
      Math.round(((weight * 703) / (feet * 12 + parseInt(inches)) ** 2) * 10) /
      10;
    if (calcBMI < 18.5) {
      setColor("yellow");
    } else if (calcBMI >= 18.5 && calcBMI < 24.9) {
      setColor("green");
    } else if (calcBMI >= 25 && calcBMI <= 29.9) {
      setColor("orange");
    } else if (calcBMI > 30) {
      setColor("red");
    }
    setBMI(calcBMI);
  }
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
        className="home-body flex flex-col text-center items-center align-center justify-center"
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
        <div className="text-black flex flex-wrap align-center items-center justify-center">
          <div className="p-4 bg-gray-200 rounded-lg">
            <Tooltip
              content="Note: BMI doesn't directly measure body fat and it's not a diagnostic tool. For example, a very muscular person might be classified as overweight or obese when they are actually in good health."
              variant="flat"
              closeDelay={0}
              className="max-w-[300px]"
            >
              <h2 className="mx-5">BMI Calculator</h2>
            </Tooltip>
            <p className="max-w-[300px] text-sm">
              {" "}
              Body Mass Index provides a rough estimate of whether a person's
              weight falls within a healthy range.
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span>Underweight: BMI is less than 18.5</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span>Healthy weight: BMI is 18.5 to 24.9</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span>Overweight: BMI is 25 to 29.9</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Obesity: BMI is 30 or more</span>
              </div>
            </div>
          </div>
          {/* weight (lb) / [height (in)]2 x 703 */}
          <div className="flex flex-col">
            <Input
              isRequired
              name="feet"
              type="number"
              endContent="ft"
              onChange={(e) => {
                setFeet(e.target.value);
              }}
              placeholder="Feet"
              className="max-w-[90px]"
            />
            <Input
              isRequired
              endContent="in"
              name="inches"
              type="number"
              onChange={(e) => {
                setInches(e.target.value);
              }}
              placeholder="Inches"
              className="max-w-[90px]"
            />
            <Input
              isRequired
              endContent="lbs"
              name="weight"
              type="number"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              placeholder="Wt"
              className="max-w-[90px]"
            />
            <Button onClick={calculate} fullWidth color="primary">
              Calculate
            </Button>{" "}
          </div>
          {bmi ? (
            <div className={`p-2 bg-${color}-500 rounded mr-2`}>
              My BMI is: {bmi}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
