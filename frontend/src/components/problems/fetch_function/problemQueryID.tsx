import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"
import { SERVER_ROOT_URL } from "@/app/Global/url"
import { ProblemQueryIDMessage } from "@/app/problem/ProblemQueryMessage"


const problemQueryIDFetch = ({problemID}: {problemID: string})=> {
    let problemText = ''
    let has_images = false
    let images : JSX.Element[]= []
    if (DEBUG_NO_BACKEND){
        problemText = '<p>test with problem ID = ' +  problemID +'<p>'
        has_images = true
        images = [<img
          width={200}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />,
          <img
          width={100}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />,
      ]
    } else {
        fetch(SERVER_ROOT_URL + 'problemQueryID',{
          method: "POST", 
          headers: {"Content-Type":"text/plain"},
          body: JSON.stringify(new ProblemQueryIDMessage(problemID))
        }).then(response => response.json()).then(replyJson => {
          console.log(replyJson)
          if (replyJson.status === 200) {
            problemText = replyJson.problemContent
            if (replyJson.images.length > 0){
              has_images = true
              images = replyJson.images.map((imagePath: string) => (<img width={272} src={imagePath}/>))
            }
          } else {
              alert(replyJson.message) //以后改一个状态条，优雅一点
          }
        }).catch((e) => console.log(e))
    }
    return {problemText: problemText, has_images: has_images, images: images}
}

export {problemQueryIDFetch}