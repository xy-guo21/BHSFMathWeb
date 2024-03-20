
const sourceOptions= [
    {value: "未知", label: "未知"},
    {value: "高联一试", label: "高联一试"},
    {value: "高联二试", label: "高联二试"}
]
const difficultyOptions = [
    {value: 0, label: "简单"},
    {value: 1, label: "中等"}
]

class ProblemBaseItem{
    value: string
    label: string
    constructor(value: string, label: string){
        this.value = value
        this.label = label
    }
} 
const problemBaseOptions = [
    new ProblemBaseItem("JuniorMath", "初中数学"), 
    new ProblemBaseItem("SeniorMath", "高中数学")
]
export {sourceOptions, difficultyOptions, problemBaseOptions,ProblemBaseItem}