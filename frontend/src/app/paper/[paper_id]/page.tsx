'use client'

const PaperDetailPage = ({ params }: { params: { paper_id: string , data: string} })=>{
    
    return <>
        <h1>试卷详情页</h1>
        <>{params.paper_id}</>
        <>{params.data}</>
    </>
}

export default PaperDetailPage