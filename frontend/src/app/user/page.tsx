'use client'
import React, { useEffect, useState } from "react";
import { HomeButton } from "../Global/navi";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { SERVER_ROOT_URL } from "../Global/url";
import { DEBUG_NO_BACKEND } from "../Global/self_setting";
import { QueryWithUserToken } from "../../../public/messages/user/queryWithUserToken";
import { UserTokenStore } from "../../../public/UserTokenStore";


const UserCenterHome = () => {
    const router = useRouter()
    const [userName, setUserName] = useState<string>()
    useEffect(()=>{
        const fetch_func = () =>{
            if (DEBUG_NO_BACKEND){
                setUserName("frontend user")
            } else {
                fetch(SERVER_ROOT_URL + 'queryUserInfo/', {
                    method: "POST", 
                    headers: {"Content-Type":"text/plain"},
                    body: JSON.stringify(new QueryWithUserToken(UserTokenStore.getState().userToken))
                }).then(resp => resp.json()).then(replyJson =>{
                    console.log(replyJson)
                    if (replyJson.status === 200) {
                        setUserName(replyJson.userName)
                    } else {
                        alert(replyJson.message)
                    }
                }).catch((e) => console.log(e))
            }
        }
        fetch_func()
    }, [])
    return <>
        <h1>个人中心首页</h1>
        <p>用户名：{userName}</p>
    </>
}
export default UserCenterHome;