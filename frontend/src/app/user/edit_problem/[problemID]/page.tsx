export default function EditProblemPage({ params }: { params: { problemID: string } }) {
    const problemID = params.problemID
    return <>
        <h1>编辑题目</h1>
        <h2>题目ID</h2>
        {problemID}
        <h2>修改题目难度</h2>

    </>
}
