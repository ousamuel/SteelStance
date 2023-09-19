"use client";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import "./globals.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { Context } from "./providers";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { routeText, setRouteText, user, setUser, isMenuOpen, setIsMenuOpen } =
    useContext(Context);
  const workouts = [
    {
      name: "YOGA",
      route: "/workouts/yoga",
      src: "/images/yoga.svg",
    },
    {
      name: "CYCLING",
      route: "/workouts/cycling",
      src: "/images/cycle.svg",
    },
    {
      name: "BOXING",
      route: "/workouts/boxing",
      src: "/images/boxing.svg",
    },
  ];
  const workoutblock = workouts.map((workout) => {
    return (
      <DropdownItem
        key={workout.name}
        textValue={workout.name}
        style={{ textAlign: "center" }}
        onPress={() => {
          handleSelection(workout.route);
        }}
      >
        {workout.name}
        <Image
          style={{
            display: "inline",
            paddingBottom: "3px",
            marginLeft: "3px",
          }}
          width={15}
          height={15}
          alt={workout.src}
          src={workout.src}
        />
      </DropdownItem>
    );
  });
  const workoutblockPhone = workouts.map((workout) => {
    return (
      <DropdownItem
        key={workout.name}
        textValue={workout.name}
        style={{ textAlign: "center" }}
        onPress={() => {
          handleMenu();
          handleSelection(workout.route);
        }}
      >
        {workout.name}
        <Image
          style={{
            display: "inline",
            paddingBottom: "3px",
            marginLeft: "3px",
          }}
          width={15}
          height={15}
          alt={workout.src}
          src={workout.src}
        />
      </DropdownItem>
    );
  });
  function handleSelection(route) {
    router.push(route);
  }
  useEffect(() => {
    switch (pathname) {
      case "/":
        setRouteText("HOME");
        break;
      case "/personal-records":
        setRouteText("PERSONAL RECORDS");
        break;
      case "/sign-up":
        setRouteText("REGISTER");
        break;
      default:
        setRouteText("Menu");
        break;
    }
  }, [pathname, setRouteText]);
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
  function handleMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  return (
    <Navbar
      className="header"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenu}
      shouldHideOnScroll
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        {!isMenuOpen ? (
          <NavbarBrand>
            <p className="text-lg font-bold">STEELSTANCE</p>
          </NavbarBrand>
        ) : (
          <NavbarBrand className="justify-center align-center text-center">
            <div>
              <p className="block font-bold text-center text-inherit">
                STEELSTANCE
              </p>
              <p className="block text-center">{routeText}</p>
            </div>
          </NavbarBrand>
        )}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 text-2xl" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/" className='link'>
            HOME
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown id="workout-dropdown">
            <DropdownTrigger >
              <a className='link'>
                WORKOUTS
                <span className="dropdown-icon" />
              </a>
            </DropdownTrigger>
            <DropdownMenu
              onSelectionChange
              closeOnSelect="True"
              aria-label="Static Actions"
            >
              {workoutblock}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/personal-records" className='link'>
            PERSONAL RECORDS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown id="account-dropdown">
            <DropdownTrigger>
              <a className='link' style={{ textAlign: "center" }}>
                ACCOUNT
                <span className="dropdown-icon" />
              </a>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={user ? [] : ["profile", "settings"]}
              onSelectionChange
              closeOnSelect="True"
              aria-label="Static Actions"
            >
              <DropdownSection showDivider>
                <DropdownItem
                  key="profile"
                  textValue="profile"
                  style={{ textAlign: "center" }}
                  onPress={() => handleSelection("/profile")}
                >
                  PROFILE
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="profile icon"
                    src="/images/prof.svg"
                  />
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  textValue="settings"
                  style={{ textAlign: "center" }}
                  onPress={() => handleSelection("/settings")}
                >
                  SETTINGS
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="cog icon"
                    src="/images/cog.svg"
                  />
                </DropdownItem>
              </DropdownSection>
              {user ? (
                <DropdownItem
                  key="logout"
                  textValue="logout"
                  style={{ textAlign: "center" }}
                  onClick={() => logOut()}
                >
                  LOG OUT
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="logout icon"
                    src="/images/logout.svg"
                  />
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="signin"
                  textValue="signin"
                  style={{ textAlign: "center" }}
                  onPress={() => handleSelection("/sign-up")}
                >
                  SIGN IN
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="signin icon"
                    src="/images/signin.svg"
                  />
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem id="header-title">
          <p className="text-lg font-bold">STEELSTANCE</p>
        </NavbarItem>
        <NavbarItem>
          <img
            id="header-logo"
            src="/images/pngegg.png"
            style={{
              height: "60px",
              width: "60px",
              filter: "hue-rotate(95deg)",
            }}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu style={{ justifyContent: "space-around" }}>
        <NavbarMenuItem className="navbar-menu-item">
          <Link href="/" onClick={handleMenu}>
            HOME
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="navbar-menu-item">
          <Dropdown id="workout-dropdown">
            <DropdownTrigger>
              <a>
                PROGRAMS
                <span className="dropdown-icon" />
              </a>
            </DropdownTrigger>
            <DropdownMenu
              onSelectionChange
              closeOnSelect="True"
              aria-label="Static Actions"
              className="dropdown-menu"
            >
              {workoutblockPhone}
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
        <NavbarMenuItem className="navbar-menu-item">
          <Link href="/personal-records" onClick={handleMenu}>
            PERSONAL RECORDS
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="navbar-menu-item">
          <Dropdown id="account-dropdown">
            <DropdownTrigger>
              <a style={{ textAlign: "center" }}>
                ACCOUNT
                <span className="dropdown-icon" />
              </a>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={user ? [] : ["profile", "settings"]}
              onSelectionChange
              closeOnSelect="True"
              aria-label="Static Actions"
              className="dropdown-menu"
            >
              <DropdownSection showDivider>
                <DropdownItem
                  key="profile"
                  textValue="profile"
                  style={{ textAlign: "center" }}
                  onPress={() => {
                    handleSelection("/profile");
                    handleMenu();
                  }}
                >
                  PROFILE
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="profile icon"
                    src="/images/prof.svg"
                  />
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  textValue="settings"
                  style={{ textAlign: "center" }}
                  onPress={() => {
                    handleSelection("/settings");
                    handleMenu();
                  }}
                >
                  SETTINGS
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="cog icon"
                    src="/images/cog.svg"
                  />
                </DropdownItem>
              </DropdownSection>
              {user ? (
                <DropdownItem
                  key="logout"
                  textValue="logout"
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    logOut();
                    handleMenu();
                  }}
                >
                  LOG OUT
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="logout icon"
                    src="/images/logout.svg"
                  />
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="signin"
                  textValue="signin"
                  style={{ textAlign: "center" }}
                  onPress={() => {
                    handleSelection("/sign-up");
                    handleMenu();
                  }}
                >
                  SIGN IN
                  <Image
                    style={{
                      display: "inline",
                      paddingBottom: "3px",
                      marginLeft: "3px",
                    }}
                    width={15}
                    height={15}
                    alt="signin icon"
                    src="/images/signin.svg"
                  />
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}