'use client'
import React from "react";
import { HomeButton } from "../Global/navi";
import { useRouter } from "next/navigation";
import { Button } from "antd";

const UserCenterHome = () => {
    const router = useRouter()
    return <>
        <p>User Center Home Page</p>
        <HomeButton/>
        <Button onClick={()=>{router.push('/user/upload_problem')}}>上传题目</Button>
        <Button onClick={()=>{router.push('/user/user_problem')}}>我的题目</Button>
    </>
}
export default UserCenterHome;