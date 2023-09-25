"use client";
import React, { useState, useContext, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { Context } from "@/app/providers";
import { useRouter } from "next/navigation";

// export default function Boxing() {
//   const { programs, setPrograms, user, setUser, handleSave } =
//     useContext(Context);
//   // console.log(user.programs)
//   const boxing = programs.filter((program) => program.type == "Boxing");
//   const boxingBlock = boxing.map((program) => {
//     const [toggle, setToggle] = useState(false);
//     let isProgramInUserPrograms = []
//     {user? isProgramInUserPrograms = user.programs.some(p => p.id === program.id):null}

//     return(
//     <Card
//       key={program.id + "b"}
//       className={`py-4 m-7 shadow-2xl bg-inherit `}
//       style={{borderColor: program.color, boxShadow: `0px 0px 10px ${program.color}`}}
//     >
//       <CardHeader className={`pb-0 pt-2 px-4 flex-col items-start `}>
//         <div className="text-small mb-1 uppercase font-bold w-full text-white">
//           Instructor:{" "}
//           <span className="text-green-500">
//             {program.instructor.first_name}
//           {/* {program.id in user.programs ?  "true": "false"} */}
//           </span>
//           {user?<Checkbox
//             className="float-right"

//             isSelected={toggle}
//             onChange={(event) => handleSave(program, event)}
//             color="success"
//           />: null }

//         </div>
//         <small className="text-default-500 text-gray-300 max-w-[270px]" >{program.instructor.bio}</small>
//         <h4 className="font-bold text-large" style={{color: program.color}}>{program.level}</h4>
//         <small className="text-default-500 text-gray-300">Days: {program.days} </small>
//         <small className="text-default-500 text-gray-300">Time: {program.time} </small>
//       </CardHeader>
//       <CardBody className="overflow-visible py-2 justify-center align-center">
//         <Image
//           alt="Card background"
//           className="object-cover rounded-xl"
//           src={program.src}
//           width={270}
//         />
//       </CardBody>
//     </Card>
//     )
//   }

//   );
//   return (
//     <div
//       className="program-div"
//       style={{ backgroundImage: "url(/images/background2.jpg)" }}
//     >
//       {boxingBlock}
//     </div>
//   );
// }

function BoxingCard({ program, handleSave, user }) {
  //   // console.log(user.programs)
  // const boxing = programs.filter((program) => program.type == "Boxing");
  // const boxingBlock = boxing.map((program) => {
  //   const [toggle, setToggle] = useState(false);
  let isProgramInUserPrograms;
  {
    user
      ? (isProgramInUserPrograms = user.programs.some(
          (p) => p.id === program.id
        ))
      : null;
  }
  const [toggle, setToggle] = useState(isProgramInUserPrograms);

  return (
    <Card
      key={program.id + "b"}
      className={`py-4 m-7 shadow-2xl bg-inherit `}
      style={{
        borderColor: program.color,
        boxShadow: `0px 0px 10px ${program.color}`,
      }}
    >
      <CardHeader className={`pb-0 pt-2 px-4 flex-col items-start `}>
        <div className="text-small mb-1 uppercase font-bold w-full text-white">
          Instructor:{" "}
          <span className="text-green-500">
            {program.instructor.first_name}
            {/* {program.id in user.programs ?  "true": "false"} */}
          </span>
          {user ? (
            <Checkbox
              className="float-right"
              isSelected={toggle}
              // isDisabled={toggle}
              onClick={() => setToggle((prevstate) => !prevstate)}
              onChange={(event) => handleSave(program, event)}
              color="success"
            />
          ) : null}
        </div>
        <small className="text-default-500 text-gray-300 max-w-[270px]">
          {program.instructor.bio}
        </small>
        <h4 className="font-bold text-large" style={{ color: program.color }}>
          {program.level}
        </h4>
        <small className="text-default-500 text-gray-300">
          Days: {program.days}{" "}
        </small>
        <small className="text-default-500 text-gray-300">
          Time: {program.time}{" "}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 justify-center align-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={program.src}
          width={270}
        />
      </CardBody>
    </Card>
  );
}

export default function Boxing() {
  const { programs, user, handleSave } = useContext(Context);
  const router = useRouter();

  const boxing = programs.filter((program) => program.type == "Boxing");

  return (
    <div
      className="program-div"
      style={{ backgroundImage: "url(/images/background2.jpg)" }}
    >
      {boxing.map((program) => (
        <BoxingCard
          key={program.id}
          program={program}
          handleSave={handleSave}
          user={user}
        />
      ))}
      {user ? <div></div> : (
        <div>
          <Button
            className=" justify-center items-center m-auto my-[15px]"
            onClick={() => router.push("/sign-up")}
          >
            {" "}
            Sign up/Log In To Save
          </Button>
        </div>
      )}
    </div>
  );
}
