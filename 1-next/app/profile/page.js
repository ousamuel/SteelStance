"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  AvatarIcon,
  Button,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Progress,
  Card,
  Input,
  Image,
  CardBody,
  CardHeader,
  Checkbox,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { Context } from "../providers";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { DeleteIcon } from "../DeleteIcon";

function ProgramCard({ program, handleSave, user }) {
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
      className={`py-4 m-4 shadow-2xl min-w-[250px] bg-inherit `}
      style={{
        borderColor: program.color,
        boxShadow: `0px 0px 10px ${program.color}`,
        backgroundColor: "#a1a1a1"
      }}
    >
      <CardHeader className={`pb-0 pt-2 px-4 flex-col items-start `}>
        <div className="text-small mb-1 uppercase font-bold w-full text-black">
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
              icon={<DeleteIcon/>}
              onClick={() => setToggle((prevstate) => !prevstate)}
              onChange={(event) => handleSave(program, event)}
              color="danger"
            />
          ) : null}
        </div>
        <small className="text-default-500 text-gray-300 max-w-[270px]">
          {program.instructor.bio}
        </small>
        <h4 className="font-bold text-2xl text-white" >
          {program.type}
        </h4>
        <h4 className="font-bold text-medium" style={{ color: program.color }}>
          {program.level}
        </h4>
        <small className="text-default-500 text-gray-300">
          Days: {program.days}{" "}
        </small>
        <small className="text-default-500 text-gray-300">
          Time: {program.time}{" "}
        </small>
      </CardHeader>
      {/* <CardBody className="overflow-visible py-2 justify-center align-center"> */}
        {/* <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={program.src}
          width={270}
        /> */}
      {/* </CardBody> */}
    </Card>
  );
}
export default function Profile() {
  const router = useRouter();
  const {
    user,
    setUser,
    records,
    userRecords,
    setUserRecords,
    userPrograms,
    setUserPrograms,
    programs,
    handleSave,
    loading,
  } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badUsername, setBadUsername] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  useEffect(() => {
    if (!user) {
      // setUserPrograms(user.programs);
      router.push("/sign-up");
    } else {
      setUserRecords(user.records);
      setUserPrograms(user.programs);
    }
  }, [user]);
  const schema = Yup.object().shape({
    username: Yup.string().min(5, "Username must be at least 5 characters"),
    email: Yup.string().email("Invalid email format"),
    height_ft: Yup.number().positive("Height must be positive"),
    weight_lb: Yup.number().positive("Weight must be positive"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    confirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    // confirm: Yup.string()
    //   .required("Password must match")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
      height_ft: user ? user.height_ft : "",
      height_in: user ? user.height_in : "",
      weight_lb: user ? user.weight_lb : "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  // console.log(user);
  // console.log(formik.errors);
  // console.log(formik.values);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedRecords = React.useMemo(() => {
    let sortableItems = [...userRecords];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [userRecords, sortConfig]);

  function handleSubmit() {
    fetch("http://127.0.0.1:5555/currentUser", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...(formik.values.username && { username: formik.values.username }),
        ...(formik.values.email && { email: formik.values.email }),
        height_ft: formik.values.height_ft,
        height_in: formik.values.height_in,
        weight_lb: formik.values.weight_lb,
        password: formik.values.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 403) {
            // alert("User not found");
            setBadUsername(true);
            throw new Error("403: Username is taken");
          } else if (response.status === 401) {
            // alert("Incorrect password");
            setBadEmail(true);
            throw new Error("401: Email already in use");
          }
        }
      })
      .then((data) => {
        handleEdit();
        setUser(data);
        setBadEmail(false);
        setBadUsername(false);
      })
      .catch((error) => {
        console.error("Error ", error.message);
      });
  }
  function handleEdit() {
    setEditing((prevstate) => !prevstate);
    formik.resetForm();
  }
  function toggleDelete() {
    setIsActive((prevstate) => !prevstate);
  }
  // function getKeyValue(object, key) {
  //   return key.split(".").reduce((o, k) => (o || {})[k], object);
  // }
  let choice = {
    filter:
      "sepia(74%) saturate(1100%) hue-rotate(104deg) brightness(95%) contrast(86%)",
  };

  const lifts = [
    {
      key: "All",
      label: "ALL",
    },
    {
      key: "Squat",
      label: "SQUAT",
    },
    {
      key: "Bench",
      label: "BENCH",
    },
    {
      key: "Deadlift",
      label: "DEADLIFT",
    },
  ];
  const liftcolumns = [
    {
      key: "type",
      label: "TYPE",
    },
    {
      key: "weight_lb",
      label: "WEIGHT (lbs)",
    },
    {
      key: "body_weight",
      label: "BW (lbs)",
    },
    {
      key: "date",
      label: "DATE",
    },
  ];
  const columns = [
    {
      key: "type",
      label: "TYPE",
    },
    {
      key: "time",
      label: "Time",
    },
    {
      key: "days",
      label: "Days",
    },
    {
      key: "level",
      label: "Level",
    },
    {
      key: "instructor.first_name",
      label: "name",
    },
  ];
  console.log(userPrograms);
  function logOut() {
    fetch("http://127.0.0.1:5555/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Successfully logged out");
        } else {
          console.log("Failed to log out. Status:", response.status);
        }
      })
      .then(() => {
        setUser(null);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }
  function handleDelete() {
    fetch(`http://127.0.0.1:5555/currentUser`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Successfully deleted ");
        } else {
          console.log("Failed to delete. Status:", response.status);
        }
      })
      .then(() => {
        setUser(null);
        // setRefresh(prevstate=>!prevstate)
        router.push("/");
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  }
  if (!user) {
    return (
      // <div className="w-full text-center">
      //   You do not have permission to view this.
      // </div>
      <div className="h-screen w-screen flex justify-center align-center items-center">
        <Progress
          size="md"
          isIndeterminate
          aria-label="Loading..."
          className="w-3/4 "
          color="success"
        />
      </div>
    );
  }
  // console.log(programs[0]);
  // const programblock = user.programs.map((program) => (
  //   // ${program.color}
  //   // <Card
  //   //   key={program.id + "b"}
  //   //   className={`py-4 w-[250px] m-3 shadow-xl ${program.color}`}
  //   // >
  //   //   <CardHeader className={`pb-0 pt-2 px-4 flex-col items-start `}>
  //   //     <div className="text-tiny uppercase font-bold w-full">
  //   //       Instructor: {program.instructor.first_name}
  //   //       <Checkbox
  //   //         defaultSelected
  //   //         className="float-right"
  //   //         icon={<DeleteIcon/>}
  //   //         // isSelected={user ? program in user.programs : false}
  //   //         onChange={() => handleSave(program)}
  //   //         color="danger"
  //   //       />
  //   //     </div>
  //   //     {/* <small className="text-default-500">{program.instructor.bio}</small> */}
  //   //     <h4 className="font-bold text-large">{program.type}</h4>
  //   //     <h4 className="font-bold text-medium">{program.level}</h4>
  //   //     <small className="text-default-500">Days: {program.days} </small>
  //   //     <small className="text-default-500">Time: {program.time} </small>
  //   //   </CardHeader>
  //   //   <CardBody className="overflow-visible py-2 justify-center align-center">
  //   //     {/* <Image
  //   //       alt="Card background"
  //   //       className="object-cover rounded-xl"
  //   //       // src={program.src}
  //   //       width={270}
  //   //     /> */}
  //   //   </CardBody>
  //   // </Card>
  //   <Card
  //     key={program.id + "b"}
  //     className={`py-4 m-7 shadow-2xl bg-inherit `}
  //     style={{
  //       borderColor: program.color,
  //       boxShadow: `0px 0px 10px ${program.color}`,
  //     }}
  //   >
  //     <CardHeader className={`pb-0 pt-2 px-4 flex-col items-start `}>
  //       <div className="text-small mb-1 uppercase font-bold w-full text-white">
  //         Instructor:{" "}
  //         <span className="text-green-500">
  //           {program.instructor.first_name}
  //           {/* {program.id in user.programs ?  "true": "false"} */}
  //         </span>
  //         {user ? (
  //           <Checkbox
  //             className="float-right"
  //             isSelected={toggle}
  //             // isDisabled={toggle}
  //             onClick={()=>setToggle(prevstate=>!prevstate)}
  //             onChange={(event) => handleSave(program, event)}
  //             color="success"
  //           />
  //         ) : null}
  //       </div>
  //       <small className="text-default-500 text-gray-300 max-w-[270px]">
  //         {program.instructor.bio}
  //       </small>
  //       <h4 className="font-bold text-large" style={{ color: program.color }}>
  //         {program.level}
  //       </h4>
  //       <small className="text-default-500 text-gray-300">
  //         Days: {program.days}{" "}
  //       </small>
  //       <small className="text-default-500 text-gray-300">
  //         Time: {program.time}{" "}
  //       </small>
  //     </CardHeader>
  //     <CardBody className="overflow-visible py-2 justify-center align-center">
  //       <Image
  //         alt="Card background"
  //         className="object-cover rounded-xl"
  //         src={program.src}
  //         width={270}
  //       />
  //     </CardBody>
  //   </Card>
  // ));

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* modals substitute for popover delete */}

      {isActive ? (
        <div className="delete-pop max-w-screen text-center transition-blur">
          <Card>
            <CardBody>
              <p>
                Are you sure you want to delete your account? <br /> (This
                action is undoable.)
              </p>
              <Button
                className="px-unit-4 py-unit-1 min-w-unit-3xl my-2"
                color="danger"
                onClick={handleDelete}
              >
                Delete Account
              </Button>
              <Button
                className="px-unit-4 py-unit-1 min-w-unit-3xl "
                color="danger"
                variant="bordered"
                onClick={toggleDelete}
              >
                Cancel
              </Button>
            </CardBody>
          </Card>
        </div>
      ) : null}
      <div
        className="p-4 transition-blur"
        style={isActive ? { filter: "blur(15px)" } : null}
      >
        <h1 className="text-center">MY PROFILE</h1>
        <div className="flex gap-100">
          <div className="left-acc">
            <Avatar
              showFallback
              name="name"
              className="avatar"
              src="/images/prof.svg"
              style={choice}
            />
            {editing ? (
              <h3 style={{ paddingTop: "30px" }}>
                Current Username: {user.username}
                <Input
                  // isRequired
                  name="username"
                  label={
                    user.username == formik.values.username || badUsername
                      ? "New Username (Username is taken)"
                      : "New Username"
                  }
                  placeholder="Min. 5 characters"
                  type="text"
                  variant="underlined"
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className=""
                  style={
                    user.username == formik.values.username || badUsername
                      ? { color: "red" }
                      : null
                  }
                />
              </h3>
            ) : (
              <h3 style={{ paddingTop: "30px" }}>
                {user ? user.username : "User"}
              </h3>
            )}
            <Button
              className="px-unit-4 py-unit-1 min-w-unit-3xl m-2"
              onClick={handleEdit}
            >
              {editing ? "Cancel" : "Edit"}
            </Button>
            {editing ? (
              <Button
                className="px-unit-4 py-unit-1 min-w-unit-3xl"
                onClick={handleSubmit}
                color="success"
                variant="bordered"
              >
                Save changes
              </Button>
            ) : null}
          </div>

          <div className="right-acc">
            <div className="max-w-md">
              {editing ? (
                <div id="edit-profile" className="space-y-1">
                  <ol className="text-inherit text-small text-default-500 ">
                    <li>Current Email: {user.email}</li>
                  </ol>
                  <Input
                    name="email"
                    label={
                      user.email == formik.values.email || badEmail
                        ? "New Email (Email is taken)"
                        : "New Email"
                    }
                    placeholder="Enter your new email"
                    type="email"
                    variant="underlined"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={
                      user.email == formik.values.email || badEmail
                        ? { color: "red" }
                        : null
                    }
                  />
                  <Divider className="my-4" />
                  <ol className="text-inherit text-small text-default-500 ">
                    <li>
                      Current Height: {user ? user.height_ft : null} ft.
                      {user ? user.height_in : null} in.
                    </li>
                    <li className="flex">
                      <Input
                        // isRequired
                        name="height_ft"
                        label={"New Height (ft) "}
                        placeholder="e.g. 5"
                        type="number"
                        variant="underlined"
                        value={formik.values.height_ft}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="w-1/2"
                      />
                      <Input
                        // isRequired
                        name="height_in"
                        label={"New Height (in) "}
                        placeholder="e.g. 5"
                        type="number"
                        variant="underlined"
                        value={formik.values.height_in}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="w-1/2"
                      />
                    </li>
                  </ol>
                  <Divider className="my-4" />
                  <ol className="text-inherit text-small text-default-500 ">
                    <li>Current Weight: {user ? user.weight_lb : null} lbs</li>
                    <li className="">
                      <Input
                        // isRequired
                        name="weight_lb"
                        label={"Weight (lbs) "}
                        placeholder="e.g. 5"
                        type="number"
                        variant="underlined"
                        value={formik.values.weight_lb}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className=""
                      />
                    </li>
                  </ol>
                </div>
              ) : (
                <div id="normal-profile" className="space-y-1">
                  {user ? user.email : "email"}
                  <ol className="text-small text-default-500 flex">
                    <li>
                      Height: {user ? user.height_ft : null} ft.
                      {user ? user.height_in : null} in.
                    </li>
                  </ol>

                  <ol className="text-small text-default-500 flex">
                    <li>Weight: {user ? user.weight_lb : null} lbs</li>
                  </ol>
                </div>
              )}

              <Divider className="my-4" />
              <div className="flex h-5 items-center space-x-4 justify-center align-center">
                <Tooltip content="Home" variant="flat" closeDelay={0}>
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                      borderRadius:"0px"

                    }}
                    width={30}
                    height={30}
                    alt="home icon"
                    onClick={() => router.push("/")}
                    src="/images/home.svg"
                    className="link"
                  />
                </Tooltip>
                <Divider orientation="vertical" />
                <Tooltip
                  content="Records"
                  variant="flat"
                  closeDelay={0}
                >
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                      borderRadius:"0px"
                    }}
                    width={25}
                    height={25}
                    alt="record icon"
                    onClick={() => router.push("/personal-records")}
                    src="/images/strong.svg"
                    className="link"
                  />
                </Tooltip>
                {/* <Divider orientation="vertical" />
                <Tooltip content="Settings" variant="flat" closeDelay={0}>
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={25}
                    height={25}
                    alt="settings icon"
                    src="/images/cog.svg"
                    onClick={() => router.push("/settings")}
                    className="link"
                  />
                </Tooltip> */}
              </div>
            </div>
            <div className="container"></div>
          </div>
        </div>
        <Divider className="my-4" />
        <h2 className="text-center">MY PERSONAL RECORDS</h2>
        <Table aria-label="dynamic content" className="mt-1 ">
          <TableHeader columns={liftcolumns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className="columns text-base"
                onClick={() => requestSort(column.key)}
              >
                {column.label}
                <span className="dropdown-icon" />
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedRecords}>
            {(record) => (
              <TableRow key={record.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(record, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider className="my-4" />
        <h2 className="text-center">SAVED PROGRAMS</h2>
        <div className="self-program-div">
          {/* {programblock} */}
          {user.programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              handleSave={handleSave}
              user={user}
            />
          ))}
        </div>
        <div className="flex flex-col items-center align-center">
          <Button
            className="px-unit-4 py-unit-1 min-w-unit-3xl my-2"
            color="success"
            variant="bordered"
            onClick={logOut}
          >
            Log out
          </Button>
          <Button
            className="px-unit-4 py-unit-1 min-w-unit-3xl"
            color="danger"
            onClick={toggleDelete}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </form>
  );
}
