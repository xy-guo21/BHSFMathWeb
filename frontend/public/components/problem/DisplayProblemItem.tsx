'use client'

import { List, Space, Button } from "antd"
import React, { useEffect, useState } from "react"
import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined, KeyOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { HTMLComponent } from "../../../src/app/Global/problem_components";
import { ProblemItem, IconText } from "./ProblemItem";
import { problemQueryIDFetch } from "./fetch_function/problemQueryID";

const DisplayProblemItem = ({problemID, opt}: {problemID: string; opt: React.ReactElement}) => {
    const router = useRouter()
    const [problem, setProblem] = useState<ProblemItem>()
    useEffect(()=>{setProblem(problemQueryIDFetch({problemID}))}, [problemID])
    // const fetchProblem = ()=>{
    //     if(DEBUG_NO_BACKEND){
    //         // console.log(problems_debug[0])
    //         // console.log(problems_debug[1])
    //         setProblem(problems_debug.filter((prob)=>(prob.problemID === problemID))[0])
    //     }
    //     else{
    //         fetch(SERVER_ROOT_URL + 'problemQueryID', {
    //             method: "POST", 
    //             headers: {"Content-Type":"text/plain"},
    //             body: JSON.stringify(new ProblemQueryIDMessage(problemID))
    //         }).then(response=> response.json()).then( replyJson =>{
    //             setProblem(new ProblemItem(problemID, replyJson.content, replyJson.like, replyJson.dislike, replyJson.star, replyJson.imagePath))
    //             console.log(replyJson)
    //         })
    //     }
    // }
    return problem && <List.Item
                key={problem.problemID}
                actions={[
                <IconText icon={KeyOutlined} text={"id = " + problem.problemID} key="list-vertical-star-o" />,
                <IconText icon={StarOutlined} text={problem.star.toString()} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text={problem.star.toString()} key="list-vertical-like-o" />,
                <IconText icon={DislikeOutlined} text={problem.dislike.toString()} key="list-vertical-star-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                opt
                ]}
                extra={problem.images ? problem.images[0] : false}
            >
                <HTMLComponent htmlString={problem.content}/>
            </List.Item>
}

export {DisplayProblemItem}