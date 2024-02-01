'use client'
import { Button } from "antd";
import exp from "constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HomeButton } from "../GlobalComponents/navi";

const UserLogin = () => {
    const router = useRouter();
    const handleClick = ()=>{
        router.push("home");
    }
    return <>
        <p>User Login Page</p>
        <HomeButton text="Login"></HomeButton>
    </>
}

export default UserLogin;