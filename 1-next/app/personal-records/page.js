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

export default function Squat() {
  const router = useRouter();
  const { records, setRecords, user, categoryArr, setCategoryArr } =
    useContext(Context);
  const [category, setCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  console.log(records);

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
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    weight_lb: Yup.number()
      .required("Weight is a required field")
      .min(2, "Weight must be at least two digits")
      .max(4, "Weight must be at most four digits"),
    confirm: Yup.string()
      .required("Password must match")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("submit-form").reset();
    console.log(formik.values);
    console.log(formik.errors);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      type: "",
      gender: "-",
      weight_lb: "",
      date: "-",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  return (
    <div >
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
      <div className='p-5'>
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
          <div className="w-3/5 flex flex-wrap justify-center items-center m-auto gap-6 mt-5">
            {/* <div className="flex w-1/2 mb-6 md:mb-0 gap-4"> */}
            <Select
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
              type="text"
              variant={"underlined"}
              name="weight_lb"
              label="Weight"
              placeholder="Current Weight (lbs)"
              className="max-w-sm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Input
              type="text"
              variant={"underlined"}
              name="date"
              label="Date"
              placeholder="e.g. 2022-01-30"
              className="max-w-sm"
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
