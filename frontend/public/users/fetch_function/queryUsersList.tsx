'use client'
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"
import { SERVER_ROOT_URL } from "@/app/Global/url"
import {StudentItem, AdminItem} from "../UserItem"


const undefined_student = new StudentItem("0001")
const undefined_admin = new AdminItem("0001", true, true, true)
const students_list_debug = [new StudentItem("0001"), new StudentItem("0002")]
const admins_list_debug = [new AdminItem("0001", true, false, false), new AdminItem("0002",false, true, false)]

const queryStudent = ({studentID}: {studentID: string})=> {
  let student = undefined_student
  if (DEBUG_NO_BACKEND){
  } else {
      fetch(SERVER_ROOT_URL + 'queryStudent',{
        method: "GET", 
        headers: {"Content-Type":"text/plain"},
      }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
          student = new StudentItem(studentID)
        } else {
            alert(replyJson.message) 
        }
      }).catch((e) => console.log(e))
  }
  return student
}

const queryAdmin = ({adminID}: {adminID: string})=> {
  let admin = undefined_admin
  if (DEBUG_NO_BACKEND){
  } else {
      fetch(SERVER_ROOT_URL + 'queryAdmin',{
        method: "GET", 
        headers: {"Content-Type":"text/plain"},
      }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
          admin = new AdminItem(adminID, replyJson.isProblemAdmin, replyJson.isSystemAdmin, replyJson.isSuperAdmin)
        } else {
            alert(replyJson.message) 
        }
      }).catch((e) => console.log(e))
  }
  return admin
}

const queryStudentsList = ()=> {
  let students_list: StudentItem[] = []
  if (DEBUG_NO_BACKEND){
   students_list = students_list_debug
  } else {
      fetch(SERVER_ROOT_URL + 'queryStudentsList',{
        method: "GET", 
        headers: {"Content-Type":"text/plain"},
      }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
          let studentIDs = replyJson.studentIDs
          for (const studentID of studentIDs) {
            students_list.push(queryStudent(studentID))
          }
        } else {
            alert(replyJson.message) 
        }
      }).catch((e) => console.log(e))
  }
  return students_list
}


const queryAdminsList = ()=> {
  let admins_list: AdminItem[] = []
  if (DEBUG_NO_BACKEND){
     admins_list = admins_list_debug
  } else {
      fetch(SERVER_ROOT_URL + 'queryUsersList',{
        method: "GET", 
        headers: {"Content-Type":"text/plain"},
      }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
          // TODO 对返回的管理员ID列表中的每一个获得AdminItem
          let adminIDs = replyJson.adminIDs
          for (const adminID of adminIDs) {
            admins_list.push(queryAdmin(adminID))
          }
        } else {
            alert(replyJson.message) 
        }
      }).catch((e) => console.log(e))
  }
  return admins_list
}


export {queryStudentsList, queryAdminsList, queryStudent, queryAdmin}