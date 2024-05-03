'use client'

import 'katex/dist/katex.css';
import React, { useState } from "react";

import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { HTMLComponent } from '../../Global/problem_components';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { ProblemItem } from '../../../../public/components/problem/ProblemItem';
import { DisplayProblemListItem } from '../../../../public/components/problem/DisplayProblemItem';
import { useEffect } from 'react';
import { problemIDs_debug } from '../../../../public/components/problem/ProblemItem';
import { QueryUserProblemMessage } from '../../../../public/messages/problems/QueryUserProblemMessage';
import { UserTokenStore } from '../../../../public/UserTokenStore';

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
                method: "POST",
                headers: {"Content-Type": "text/plain"}, 
                body: JSON.stringify(new QueryUserProblemMessage(UserTokenStore.getState().userToken))
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
                <Button onClick={()=>{router.push('/user/upload_answer/' + problemID)}}>上传题解</Button>
                <Button onClick={()=>{router.push('/user/edit_problem/' + problemID)}}>编辑题目</Button>
            </>
            }/>
            )}
        />
  </>
}

export default App;