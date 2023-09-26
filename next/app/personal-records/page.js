"use client";
import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context } from "../providers";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import * as Yup from "yup";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Select,
  SelectItem,
  Input,
  Link,
  Button,
} from "@nextui-org/react";

export default function Records() {
  const router = useRouter();
  const {
    BACKEND_URL,
    setRefresh,
    records,
    setRecords,
    user,
    categoryArr,
    setCategoryArr,
  } = useContext(Context);
  const [category, setCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  function handleCategory(e) {
    let results = records;
    setCategory(e.target.value);
    if (e.target.value != "All") {
      results = records.filter((record) => record.type == e.target.value);
    }
    setCategoryArr(results);
  }
  const sortedRecords = React.useMemo(() => {
    let sortableItems = [...categoryArr];
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
  }, [categoryArr, sortConfig]);
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
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
  let columns = [];
  {
    category == "All"
      ? (columns = [
          {
            key: "type",
            label: "TYPE",
          },
          {
            key: "weight_lb",
            label: "WEIGHT",
          },
          {
            key: "body_weight",
            label: "BW (lbs)",
          },
          {
            key: "gender",
            label: "GENDER",
          },
          {
            key: "date",
            label: "DATE",
          },
          // {
          //   key: "height_ft",
          //   label: "self height",
          // },
        ])
      : (columns = [
          {
            key: "weight_lb",
            label: "WEIGHT",
          },
          {
            key: "body_weight",
            label: "BW (lbs)",
          },
          {
            key: "date",
            label: "DATE",
          },
          {
            key: "gender",
            label: "GENDER",
          },
        ]);
  }
  const schema = Yup.object().shape({
    type: Yup.string().required("Type is a required field"),
    gender: Yup.string().required("Gender is a required field"),
    date: Yup.date().required("Date is a required field"),
    body_weight: Yup.number()
      .required("Body weight is a required field")
      .positive("Weight must be positive"),
    weight_lb: Yup.number()
      .required("Weight is a required field")
      .positive("Weight must be positive")
      .max(4, "Weight must be at most four digits"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentType = formik.values.type;
    const currentGender = formik.values.gender;
    if (
      formik.values.type &&
      formik.values.gender &&
      formik.values.body_weight &&
      formik.values.weight_lb &&
      formik.values.date
    ) {
      fetch(`${BACKEND_URL}/records`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          type: formik.values.type,
          gender: formik.values.gender,
          body_weight: formik.values.body_weight,
          weight_lb: formik.values.weight_lb,
          date: formik.values.date,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            if (response.status === 403) {
              // alert("User not found");
              throw new Error("403: Username is taken");
            } else if (response.status === 401) {
              // alert("Incorrect password");
              throw new Error("401: Email already in use");
            }
          }
        })
        .then((data) => {
          // console.log(data);
          setRefresh((prevstate) => !prevstate);
          document.getElementById("submit-form").reset();
          formik.resetForm();
          formik.setFieldValue("type", currentType);
          formik.setFieldValue("gender", currentGender);
          // router.push("/profile");
        })
        .catch((error) => {
          console.error("Error posting:", error);
        });
    } else {
      alert("Please fill out required fields to submit");
    }
  };

  const formik = useFormik({
    initialValues: {
      type: "",
      gender: "",
      weight_lb: "",
      body_weight: "",
      date: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <div className="sub-header" style={{ color: "black" }}>
        <Select
          items={lifts}
          label="TYPE OF LIFT"
          defaultSelectedKeys={["All"]}
          placeholder="Select a powerlift"
          className="max-w-xs"
          onChange={handleCategory}
        >
          {(lift) => <SelectItem key={lift.value}>{lift.label}</SelectItem>}
        </Select>
      </div>
      <div className="p-5">
        <Table
          isHeaderSticky
          aria-label="dynamic content"
          classNames={{
            base: "max-h-[520px] overflow-scroll",
            table: "min-h-[420px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                onClick={() => requestSort(column.key)}
                className="columns"
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
        {user ? (
          <form id="submit-form">
            <div className=" flex flex-col justify-center items-center m-auto gap-6 mt-5">
              {/* <div className="flex w-1/2 mb-6 md:mb-0 gap-4"> */}
              <Select
                isRequired
                label="Type of Lift"
                placeholder="Select a powerlift"
                className="max-w-xs"
                name="type"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.type}
                // onSubmit={(e) => console.log(e.target.value)}
              >
                <SelectItem key="Squat">SQUAT</SelectItem>
                <SelectItem key="Bench">BENCH</SelectItem>
                <SelectItem key="Deadlift">DEADLIFT</SelectItem>
              </Select>
              <Select
                isRequired
                name="gender"
                label="Gender"
                placeholder="Select gender"
                className="max-w-xs"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <SelectItem key="Male">MALE</SelectItem>
                <SelectItem key="Female">FEMALE</SelectItem>
              </Select>

              <Input
                isRequired
                type="number"
                variant={"underlined"}
                name="body_weight"
                label="Body Weight"
                placeholder="Body Weight (lbs)"
                className="max-w-xs"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Input
                isRequired
                type="number"
                variant={"underlined"}
                name="weight_lb"
                label="Weight"
                placeholder="Lift Weight (lbs)"
                className="max-w-xs"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Input
                isRequired
                type="date"
                variant={"underlined"}
                name="date"
                label="Date"
                placeholder="e.g. 2022-01-30"
                className="max-w-xs"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Button
                radius="sm"
                color="success"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              {/* </div> */}
            </div>
          </form>
        ) : (
          // </form>
          <Button
            className="flex flex-wrap justify-center items-center m-auto my-[15px]"
            onClick={() => router.push("/sign-up")}
          >
            {" "}
            Sign up/Log in to add your own PR
          </Button>
        )}
      </div>
    </div>
  );
}
