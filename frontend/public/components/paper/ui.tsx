'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Descriptions, List } from "antd";
import { IconText } from "../problem/ProblemItem";
import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined, KeyOutlined } from '@ant-design/icons';
import { paperQueryIDFetch } from "./fetch_function/queryPaperID";
import { PaperItem } from "./PaperItem";
import { DisplayProblemListItem } from "../problem/DisplayProblemItem";

const DisplayPaperItem = ({paper_}: {paper_: PaperItem | undefined} ) =>{
    const paper = paper_
    return paper? <>
        <Descriptions>
            <Descriptions.Item label="试卷标题">{paper.paperName}</Descriptions.Item>
            <Descriptions.Item label="试卷ID">{paper.paperID}</Descriptions.Item>
            <Descriptions.Item label="题库">{paper.problemBase}</Descriptions.Item>
            <Descriptions.Item label="试卷描述">{paper.description}</Descriptions.Item>
        </Descriptions>
        <h2>试卷题目</h2>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page);},
                pageSize: 3,
            }}
            dataSource={paper.problemIDs}
            renderItem={(problemID) => (
            <DisplayProblemListItem problemID={problemID} opt={
            <></>
            }/>
            )}
        />
    </> : <></>
}

const DisplayPaperListItem = ({paperID, opt}: {paperID: string; opt: React.ReactElement}) => {
    const router = useRouter()
    const [paper, setPaper] = useState<PaperItem>()
    useEffect(()=>{fetchPaper(paperID)}, [paperID])
    const fetchPaper = (paperID: string) => {
        setPaper(paperQueryIDFetch({paperID}))
    }
    return paper && <List.Item
                key={paper.paperID}
                actions={[
                <IconText icon={KeyOutlined} text={"id = " + paper.paperID} key="list-vertical-star-o" />,
                // <IconText icon={StarOutlined} text={problem.star.toString()} key="list-vertical-star-o" />,
                // <IconText icon={LikeOutlined} text={problem.star.toString()} key="list-vertical-like-o" />,
                // <IconText icon={DislikeOutlined} text={problem.dislike.toString()} key="list-vertical-star-o" />,
                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                opt
                ]}
            >   <h2>{paper.paperName}</h2>
                <p>{paper.description}</p>
            </List.Item>
}

export {DisplayPaperListItem, DisplayPaperItem, PaperItem}