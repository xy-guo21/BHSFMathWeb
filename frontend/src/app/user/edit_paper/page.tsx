'use client'

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const [paperID, setPaperID] = useState<string>()
    const router = useRouter()
    return <>
    <h1>编辑试卷</h1>
    <p>请输入需要修改的试卷ID</p>
    <Input value={paperID} onChange={(e)=>{setPaperID(e.target.value)}}/>
    <Button onClick={()=>{
        router.push('/user/edit_paper/' + paperID)
    }}>确认</Button>
    </>
}

export default Page