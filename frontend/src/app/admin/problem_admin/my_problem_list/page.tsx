'use client'

import 'katex/dist/katex.css';
import React, { useState } from "react";

import { Avatar, List, Space, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { DisplayProblemListItem } from '../../../../../public/components/problem/DisplayProblemItem';
import { useEffect } from 'react';
import { problemIDs_debug } from '../../../../../public/components/problem/ProblemItem';

let problemIDs_default: string[] = []

const App: React.FC = () => {
    const router = useRouter()
    const [problemIDs, setProblemIDs] = useState<string[]>(problemIDs_default)
    
    // const [problems, setProblems] = useState<ProblemItem[]>(problems_default)
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = ()=>{
        if (DEBUG_NO_BACKEND){
            setProblemIDs(problemIDs_debug)
        }
        else{
            fetch(SERVER_ROOT_URL+'queryProblemUser', {
                method: "GET",
                headers: {"Content-Type": "text/plain"}
            }).then(response=>response.json()).then(response =>{
                setProblemIDs(response.problemIDs)
            })
        }
    }
    return <>
        <h1>我的题目</h1>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page);},
                pageSize: 3,
            }}
            dataSource={problemIDs}
            renderItem={(problemID) => (
            <DisplayProblemListItem problemID={problemID} opt={
            <>
                <Button onClick={()=>{router.push('/admin/problem_admin/upload_answer/' + problemID)}}>上传题解</Button>
                <Button onClick={()=>{router.push('/admin/problem_admin/edit_problem/' + problemID)}}>编辑题目</Button>
            </>
            }/>
            )}
        />
  </>
}

export default App;