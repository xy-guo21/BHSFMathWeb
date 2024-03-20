'use client'
import React, { useEffect } from 'react';
import { DisplayProblemListItem } from '../../../../public/components/problem/DisplayProblemItem';

import { DEBUG_NO_BACKEND} from '@/app/Global/self_setting';
import { List, Space, Button } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined, KeyOutlined } from '@ant-design/icons';
import { HTMLComponent } from '../../Global/problem_components';
import 'katex/dist/katex.css';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { ProblemQueryIDMessage } from '@/app/problem/ProblemQueryMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { problemIDs_debug } from '../../../../public/components/problem/ProblemItem';

let problemIDs_default: string[] = []


const StarProblemPage: React.FC = () =>{
    const router = useRouter();
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
            fetch(SERVER_ROOT_URL+'queryUserStar', {
                method: "GET",
                headers: {"Content-Type": "text/plain"}
            }).then(response=>response.json()).then(response =>{
                setProblemIDs(response.problemIDs)
            })
        }
    }
    return <div>
        <h1>我的收藏</h1>
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
                <Button onClick={()=>{router.push('/problem/' + problemID)}}>查看详情</Button>
                <Button onClick={()=>{alert("这里的功能还没开放，以后再来探索吧！")}}>取消收藏</Button>
            </>
            }/>
            )}
        />
    </div>
}

export default StarProblemPage;