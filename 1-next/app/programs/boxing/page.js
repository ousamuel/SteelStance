"use client";
import React, { useState, useContext, useEffect } from "react";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Context } from "@/app/providers";

export default function Boxing() {
  const { programs, setPrograms } = useContext(Context);
  const boxing = programs.filter((program) => program.type == "Boxing");
  const boxingBlock = boxing.map((program) => (
    <Card key={program.id+"b"} className="py-4 max-w-[300px] m-7 shadow-inner-2xl">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Instructor: {program.instructor.first_name}</p>
        <small className="text-default-500">{program.instructor.bio}</small>
        <h4 className="font-bold text-large">{program.level}</h4>
        <small className="text-default-500">Days: {program.days} </small>
        <small className="text-default-500">Time: {program.time} </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 justify-center align-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/images/boxing.jpg"
          width={270}
        />
      </CardBody>
    </Card>
  ));
  console.log(boxing);
  // style={{backgroundImage: "url(/images/boxing.jpg)"}}
  return <div className="program-div" >{boxingBlock}</div>;
}
