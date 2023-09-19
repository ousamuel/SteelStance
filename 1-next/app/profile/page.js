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
  CircularProgress,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { Context } from "../providers";
import { useRouter } from "next/navigation";

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
    loading,
  } = useContext(Context);
  const [editing, setEditing] = useState(false);
  function handleEdit() {
    setEditing((prevstate) => !prevstate);
  }
  console.log(user);
  useEffect(() => {
    if (user) {
      setUserRecords(user.records);
      setUserPrograms(user.programs);
    }
  }, [user]);
  const formik = useFormik({
    initialValues: {
      weight_lb: 0,
      height_ft: 0,
      pfp: {
        filter: "",
      },
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      setSubmitting(false);
      resetForm();
    },
  });

  // BMI Categories:
  // Underweight = <18.5
  // Normal weight = 18.5–24.9
  // Overweight = 25–29.9
  // Obesity = BMI of 30 or greater
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
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="h-screen w-screen pt-5">
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
            <h3 style={{ paddingTop: "30px" }}>
              {user ? user.username : "User"}
            </h3>
            <Button
              className="px-unit-4 py-unit-1 min-w-unit-3xl"
              onClick={handleEdit}
            >
              {editing ? "editing" : "edit"}
            </Button>
          </div>
          <div className="right-acc">
            <div className="max-w-md">
              <div className="space-y-1">
                <h4 className="text-medium font-medium">
                  {user ? user.email : "email"}
                </h4>
                <ol className="text-small text-default-500">
                  <li>Height: {user ? user.height_ft : null}</li>
                  <li>Weight: {user ? user.weight_lb : null} lbs</li>
                </ol>
              </div>
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
          <TableHeader columns={columns}>
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
        <Button className="px-unit-4 py-unit-1 min-w-unit-3xl" onClick={logOut}>
          Log out
        </Button>
      </div>
    </form>
  );
}
