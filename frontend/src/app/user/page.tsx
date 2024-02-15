'use client'
import React from "react";
import { HomeButton } from "../Global/navi";
import { useRouter } from "next/navigation";
import { Button } from "antd";

const UserCenterHome = () => {
    const router = useRouter()
    return <>
        <h1>个人中心首页</h1>
    </>
}
export default UserCenterHome;