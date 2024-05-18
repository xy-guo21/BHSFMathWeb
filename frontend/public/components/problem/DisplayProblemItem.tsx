'use client'

import { List, Space, Button, Flex, Tag, Statistic, Col, Descriptions } from "antd"
import React, { useEffect, useState } from "react"
import { LikeOutlined, MessageOutlined, ContainerOutlined, StarOutlined, DislikeOutlined, KeyOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { HTMLComponent } from "../../../src/app/Global/problem_components";
import { ProblemItem, IconText } from "./ProblemItem";
import { problemQueryIDFetch } from "./fetch_function/problemQueryID";
import {KatexSpan} from "@/app/test/test_katex/page";

const DisplayProblemItem = ({problem_}: {problem_: ProblemItem | undefined})=>{
    const problem = problem_
    return problem ? <>
    <Descriptions>
        <Descriptions.Item label="题目ID">{problem.problemID}</Descriptions.Item>
        <Descriptions.Item label="所属题库">{problem.problemBase}</Descriptions.Item>
        <Descriptions.Item label="题目来源">{problem.source}</Descriptions.Item>
        <Descriptions.Item label="题目难度">{problem.difficulty}</Descriptions.Item>
    </Descriptions>
    <h2>题目文字</h2>
    <KatexSpan text={problem.content}></KatexSpan>
    {/* <HTMLComponent htmlString={problem.content}/> */}
    <h2>题目图片</h2>
    {problem.images ? problem.images[0] : <p>暂无</p>}
    </> : <p>暂无数据</p>
}

const DisplayProblemListItem = ({problemID, opt=<></>}: {problemID: string; opt: React.ReactElement}) => {
    const router = useRouter()
    const [problem, setProblem] = useState<ProblemItem>()
    useEffect(()=>{
        const fetchData = async () => {
            const problem = await problemQueryIDFetch({ problemID });
            setProblem(problem);
            console.log("DisplayProblemItem", problem);
        }
        fetchData();
    }, [problemID])
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
                // <IconText icon={StarOutlined} text={problem.star.toString()} key="list-vertical-star-o" />,
                // <IconText icon={LikeOutlined} text={problem.star.toString()} key="list-vertical-like-o" />,
                // <IconText icon={DislikeOutlined} text={problem.dislike.toString()} key="list-vertical-star-o" />,
                <IconText icon={ContainerOutlined} text={problem.problemBase} key="problemBase"/>, 
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                opt
                ]}
                extra={problem.images ? problem.images[0] : false}
            >
                <KatexSpan text={problem.content}></KatexSpan>
                {/* <HTMLComponent htmlString={problem.content}/> */}
            </List.Item>
}

export {DisplayProblemListItem, DisplayProblemItem}