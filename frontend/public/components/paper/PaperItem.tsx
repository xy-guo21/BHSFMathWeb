const paperIDs_debug = ['0', '1']
class PaperItem {
    paperID: string
    problemIDs: string[]
    paperName: string
    description: string
    problemBase?: string
    constructor(paperID: string, paperName: string, description: string, problemIDs: string[]){
        this.paperID = paperID
        this.paperName = paperName
        this.description = description
        this.problemIDs = problemIDs
    }

}
const papers_debug = [
    new PaperItem('0', '2024北京高考数学', '略', ['0', '1']), 
    new PaperItem('1', '2023北京高考数学', '这里是简介', ['0'])
]

const undefined_paper = new PaperItem('-1', '未定义', 'undefined', [])
export {PaperItem, papers_debug, paperIDs_debug, undefined_paper}