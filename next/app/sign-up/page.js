"use client";
import React, { useContext, useEffect } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../providers";

export default function Signup() {
  const { user, setUser, BACKEND_URL } = useContext(Context);
  const [formikErr, setFormikErr] = React.useState("");
  const [selected, setSelected] = React.useState("login");
  const [wrongEmail, setWrongEmail] = React.useState(false);
  const [wrongPass, setWrongPass] = React.useState(false);

  const router = useRouter();

  function handleUser(x) {
    setUser(x);
    router.push("/profile");
  }
  const onLoginSubmit = () => {
    fetch(`${BACKEND_URL}/login`, {
      method: "POST",
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
  };

  const onSignSubmit = () => {
    {
      formikErr.confirm
        ? null
        : fetch(`${BACKEND_URL}/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: formik.values.username,
              email: formik.values.email,
              password: formik.values.password,
              height_ft: formik.values.height_ft,
              weight_lb: formik.values.weight_lb,
              gender: formik.values.gender,
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else if (response.status === 403) {
                alert("username exists");
                // console.log(formik.values);
                throw new Error("User already exists with that username");
              } else if (response.status === 401) {
                alert("email exists");
                throw new Error("User already exists with that email");
              }
            })
            .then((data) => {
              handleUser(data);
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
    }
  };
  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field")
      .min(5, "Username must be at least 5 characters"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
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
      confirm: "",
    },
    validationSchema: schema,
  });
  // console.log(formik.errors);

  return (
    <div
      className="home-body"
      style={{
        backgroundColor: "#0a5329",
        maxHeight:"90vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <div className="flex flex-col">
        <Card className="max-w-full max-h-full w-[340px] min-h-[400px]">
          <CardBody className="min-h-[400px]">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={(e) => {
                setSelected(e);
                formik.resetForm();
              }}
            >
              <Tab key="login" title="Login">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onLoginSubmit(e);
                  }}
                  className="flex flex-col gap-4"
                >
                  <Input
                    isRequired
                    name="email"
                    label={wrongEmail ? "Email (incorrect)" : "Email"}
                    placeholder="Enter your email"
                    type="email"
                    onChange={formik.handleChange}
                    // style={wrongEmail ? { color: "red" } : null}
                    className={
                      wrongEmail ? "rounded-xl border-2 border-rose-600" : null
                    }
                  />
                  <Input
                    isRequired
                    name="password"
                    label={wrongPass ? "Password (incorrect)" : "Password"}
                    placeholder="Enter your password"
                    type="password"
                    onChange={formik.handleChange}
                    className={
                      wrongPass ? "rounded-xl border-2 border-rose-600" : null
                    }
                  />

                  <p className="text-center text-small">
                    Need to create an account?{" "}
                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                      Sign Up
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button type="submit" fullWidth color="primary">
                      Log In
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="Sign Up">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSignSubmit(e);
                  }}
                  className="flex flex-col gap-5 h-[400px]"
                >
                  <Input
                    isRequired
                    name="username"
                    label={
                      formik.touched.username && formik.errors.username
                        ? "Username (must be 5 letters)"
                        : "Username"
                    }
                    placeholder="Enter your username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className={
                      formik.touched.username && formik.errors.username
                        ? "rounded-xl border-2 border-rose-600"
                        : null
                    }
                  />
                  <Input
                    isRequired
                    name="email"
                    label={
                      formik.touched.email && formik.errors.email
                        ? "Email (johndoe@domain.xyz)"
                        : "Email"
                    }
                    placeholder="Enter your email"
                    type="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "rounded-xl border-2 border-rose-600"
                        : null
                    }
                  />
                  <Input
                    isRequired
                    name="password"
                    label={
                      formik.touched.password && formik.errors.password
                        ? "Password (at least 6 characters)"
                        : "Password"
                    }
                    placeholder="Enter your password"
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "rounded-xl border-2 border-rose-600"
                        : null
                    }
                  />
                  <Input
                    isRequired
                    name="confirm"
                    label={
                      formik.touched.confirm && formik.errors.confirm
                        ? "Passwords must match"
                        : "Confirm password"
                    }
                    placeholder="Confirm your password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm}
                    className={
                      formik.touched.confirm && formik.errors.confirm
                        ? "rounded-xl border-2 border-rose-600"
                        : null
                    }
                  />
                  <p className="text-center text-small">
                    Already have an account?{" "}
                    <Link size="sm" onPress={() => setSelected("login")}>
                      Log In
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button
                      type="submit"
                      onClick={() => {
                        setFormikErr(formik.errors);
                        console.log(formik.errors);
                      }}
                      fullWidth
                      color="primary"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
