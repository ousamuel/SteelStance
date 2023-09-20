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
  Progress,
  getKeyValue,
  Card,
  Input,
  CardBody,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { Context } from "../providers";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function Profile() {
  const router = useRouter();
  const {
    user,
    setUser,
    records,
    userRecords,
    setUserRecords,
    // userPrograms,
    // setUserPrograms,
    loading,
  } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (user) {
      setUserRecords(user.records);
      // setUserPrograms(user.programs);
    } else {
      router.push("/sign-up");
    }
  }, [user]);
  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field")
      .min(5, "Username must be at least 5 characters"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    height_ft: Yup.number()
      .positive("Height must be positive")
      .required("Email is a required field"),
    weight_lb: Yup.number()
      .positive("Weight must be positive")
      .required("Email is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(6, "Password must be at least 6 characters"),
    confirm: Yup.string()
      .required("Password must match")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      height_ft: "",
      weight_lb: "",
    },
    validationSchema: schema,
    // onSubmit: handleSubmit,
  });
  console.log("formik errors" + formik.errors);
  console.log("formik values " + formik.values);
  function handleSubmit() {
    fetch("http://127.0.0.1:5555/currentUser", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: formik.values.email,
        password: formik.values.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 404) {
            // alert("User not found");
            setWrongEmail(true);
            throw new Error("404: User Not Found");
          } else if (response.status === 401) {
            setWrongPass(true);
            setWrongEmail(false);
            // alert("Incorrect password");
            throw new Error("401: Incorrect Password");
          }
        }
      })
      .then((data) => {
        handleUser(data);
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
      label: "WEIGHT",
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
      key: "weight_lb",
      label: "WEIGHT",
    },
    {
      key: "date",
      label: "DATE",
    },
  ];
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
              <h3 style={{ paddingTop: "30px" }}>username</h3>
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
                onClick={handleEdit}
                color="success"
                variant="bordered"
              >
                Save changes
              </Button>
            ) : null}
          </div>
          <div className="right-acc">
            <div className="max-w-md">
              {/* <Input
                    isRequired
                    name="email"
                    label={"Current Email: " + user.email}
                    placeholder="Enter your new email"
                    type="email"
                    variant="underlined"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  /> */}
              {/* "Current Height" */}
              {editing ? (
                <div id='edit-profile' className="space-y-1">
                  {user ? user.email : "email"}
                  <ol className="text-small text-default-500 flex">
                    <li>
                      Current Height:
                      {user ? user.height_ft : null} ft.
                      {user ? user.height_in : null} in.
                    </li>
                  </ol>

                  <ol className="text-small text-default-500 flex">
                    editing
                    <li>
                      Weight
                      {user ? user.weight_lb : null} lbs
                    </li>
                  </ol>
                </div>
              ) : (
                <div id='normal-profile' className="space-y-1">
                  {user ? user.email : "email"}
                  <ol className="text-small text-default-500 flex">
                    <li>
                      Height:{" "} 
                      {user ? user.height_ft : null} ft.
                      {user ? user.height_in : null} in.
                    </li>
                  </ol>

                  <ol className="text-small text-default-500 flex">
                    <li>
                      Weight:{" "} 
                      {user ? user.weight_lb : null} lbs
                    </li>
                  </ol>
                </div>
              )}

              <Divider className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-small">
                <div>Blog</div>
                <Divider orientation="vertical" />
                <div>Docs</div>
                <Divider orientation="vertical" />
                <div>Source</div>
              </div>
            </div>
            <div className="container"></div>
          </div>
        </div>
        <Table aria-label="dynamic content" className="mt-5 ">
          <TableHeader columns={liftcolumns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className="text-base"
                // onClick={() => requestSort(column.key)}
                // className="columns"
              >
                {column.label}
                {/* <span className="dropdown-icon" /> */}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={userRecords}>
            {(record) => (
              <TableRow key={record.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(record, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Table aria-label="dynamic content" className="mt-5 ">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} className="text-base">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={userRecords}>
            {(record) => (
              <TableRow key={record.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(record, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
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
