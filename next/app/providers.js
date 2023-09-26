"use client";
import React, { useState, useEffect, createContext } from "react";
import { Progress } from "@nextui-org/react";
export const Context = createContext([]);

export function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [routeText, setRouteText] = useState("Home");
  const [records, setRecords] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [userPrograms, setUserPrograms] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = "http://ouusam.pythonanywhere.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/currentUser`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setLoading(false);
      });
    fetch(`${BACKEND_URL}/records`, {
      credentials: "include",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        setRecords(data);
        setCategoryArr(data);
      })
      .catch((error) => console.error("Error fetching record data:", error));

    fetch(`${BACKEND_URL}/programs`, {
      credentials: "include",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        setPrograms(data);
      })
      .catch((error) => console.error("Error fetching program data:", error));
  }, [refresh]);
  if (loading) {
    return (
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

  function handleSave(program, event) {
    console.log("handleSave");
    event.preventDefault();
    event.stopPropagation();
    if (user.programs.includes(program)) {
      const updatedPrograms = user.programs.filter((prog) => prog !== program);

      setUser({ ...user, programs: updatedPrograms });
    } else {
      setUser({ ...user, programs: [...user.programs, program] });
      fetch("http://ouusam.pythonanywhere.com/userProgram", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({ program_id: program.id }),
      })
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          console.log(data);
        });
    }
  }
  return (
    <Context.Provider
      value={{
        handleSave,
        refresh,
        setRefresh,
        programs,
        setPrograms,
        loading,
        setLoading,
        userRecords,
        setUserRecords,
        userPrograms,
        setUserPrograms,
        routeText,
        setRouteText,
        isMenuOpen,
        setIsMenuOpen,
        records,
        setRecords,
        user,
        setUser,
        categoryArr,
        setCategoryArr,
      }}
    >
      {children}
    </Context.Provider>
  );
}
