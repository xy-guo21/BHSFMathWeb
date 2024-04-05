'use client'

import EditProblemPage from "../../../../../../public/components/problem/edit_problem_page"

const Page = ({ params }: { params: { problemID: string } }) => {
    return <EditProblemPage params={{problemID: params.problemID}}></EditProblemPage>
}
export default Page