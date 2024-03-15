'use client'
import { useEffect, useState } from "react"
import { paperQueryIDFetch } from "../../../../public/components/paper/fetch_function/queryPaperID"
import { PaperItem, undefined_paper } from "../../../../public/components/paper/PaperItem"
import { Divider, Typography, List, Button } from 'antd';
import { DisplayProblemItem } from "../../../../public/components/problem/DisplayProblemItem";
import { useRouter } from "next/navigation";
const { Title, Paragraph, Text, Link } = Typography;

const PaperDetailPage = ({ params }: { params: { paper_id: string , data: string} })=>{
    const router = useRouter()
    const [paperID, setPaperID] = useState<string>(params.paper_id)
    const [paper, setPaper] = useState<PaperItem>(undefined_paper)
    const [problemIDs, setProblemIDs] = useState<string[]>()
    useEffect(() => {
        let results = paperQueryIDFetch({paperID})
        setPaper(results)
        setProblemIDs(results.problemIDs)
    }, [paperID])
    return <Typography>
        <Button onClick={()=>{
            router.push('/paper')
        }}>返回试卷列表页</Button>
        <Title>试卷详情页</Title>
        <Paragraph>
            <ul>
                <li>试卷ID {paper.paperID}</li>
                <li>题库 {paper.problemBase}</li>
                <li>题目IDs {paper.problemIDs}</li>
            </ul>
        </Paragraph>
        <h2>试卷内容</h2>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page);},
                pageSize: 3,
            }}
            dataSource={problemIDs}
            renderItem={(problemID) => (
            <DisplayProblemItem problemID={problemID} opt={
            <></>
            }/>
            )}
        />
    </Typography>
}

export default PaperDetailPage