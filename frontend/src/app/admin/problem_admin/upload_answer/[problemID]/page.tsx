'use client'

import UploadAnswerPage from "../../../../../../public/components/problem/upload_answer_page"

const Page = ({ params }: { params: { problemID: string } }) =>{
    return <UploadAnswerPage params={{problemID: params.problemID}}/>
}

export default Page