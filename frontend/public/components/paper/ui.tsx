'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { List } from "antd";
import { IconText } from "../problem/ProblemItem";
import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined, KeyOutlined } from '@ant-design/icons';
import { paperQueryIDFetch } from "./fetch_function/queryPaperID";
import { PaperItem } from "./PaperItem";


const DisplayPaperItem = ({paperID, opt}: {paperID: string; opt: React.ReactElement}) => {
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

export {DisplayPaperItem, PaperItem}