'use client'

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const [problemID, setProblemID] = useState<string>()
    const router = useRouter()
    return <>
    <h1>编辑题目</h1>
    <p>请输入需要修改的试题ID</p>
    <Input value={problemID} onChange={(e)=>{setProblemID(e.target.value)}}/>
    <Button onClick={()=>{
        router.push('/user/edit_problem/' + problemID)
    }}>确认</Button>
    </>
}

export default Page