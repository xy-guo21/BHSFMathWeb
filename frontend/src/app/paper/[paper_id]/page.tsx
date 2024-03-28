'use client'
import { useEffect, useState } from "react"
import { paperQueryIDFetch } from "../../../../public/components/paper/fetch_function/queryPaperID"
import { PaperItem, undefined_paper } from "../../../../public/components/paper/PaperItem"
import { Divider, Typography, List, Button } from 'antd';
import { DisplayProblemListItem } from "../../../../public/components/problem/DisplayProblemItem";
import { useRouter } from "next/navigation";
import { DisplayPaperItem } from "../../../../public/components/paper/ui";
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
        <DisplayPaperItem paper_={paper}/>
    </Typography>
}

export default PaperDetailPage