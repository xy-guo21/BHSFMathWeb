class StudentItem {
    studentID: string
    constructor(studentID: string){
        this.studentID = studentID 
    }
}
class AdminItem {
    adminID: string
    isProblemAdmin: boolean
    isSystemAdmin: boolean
    isSuperAdmin: boolean
    constructor(adminID: string, isProblemAdmin: boolean, isSystemAdmin: boolean, isSuperAdmin: boolean){
        this.adminID = adminID 
        this.isProblemAdmin = isProblemAdmin
        this.isSystemAdmin = isSystemAdmin
        this.isSuperAdmin = isSuperAdmin
    }
}

export {StudentItem, AdminItem}