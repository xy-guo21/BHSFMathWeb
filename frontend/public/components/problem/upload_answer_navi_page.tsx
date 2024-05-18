'use client'

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UploadAnswerNaviPage = (params: {is_stu: boolean}) => {
    const [problemID, setProblemID] = useState<string>()
    const router = useRouter()
    return <>
    <h1>上传题目答案</h1>
    <p>TODO: 检查题目 1) 是否存在 2) 是否有权限修改</p>
    <p>请输入题目ID</p>
    <Input value={problemID} onChange={(e)=>{setProblemID(e.target.value)}}/>
    <Button onClick={()=>{
        if (params.is_stu){
            router.push('/user/upload_answer/' + problemID)
        } else {
            router.push('/admin/problem_admin/upload_answer/' + problemID)
        }
    }}>确认</Button>
    </>
}

export default UploadAnswerNaviPage