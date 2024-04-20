'use client'

import React, { useState, useEffect } from 'react';
import { Checkbox, message, Table } from 'antd';
import { queryAdminsList} from '../../.././../../public/users/fetch_function/queryUsersList'; 
import { AdminItem } from '../../../../../public/users/UserItem';
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"
import { SERVER_ROOT_URL } from "@/app/Global/url"
import { TSMSPMessage } from "@/app/Global/message";

export class ChangePermission extends TSMSPMessage {
    adminID : string
    permissionType: string
    constructor(adminID : string, permissionType : string) {
        super();
        this.adminID = adminID
        this.permissionType = permissionType
    }
}
const AdminsTable: React.FC = () => {
  // Specify the state type as AdminItem[]
  const [adminsList, setAdminsList] = useState<AdminItem[]>([]);

  useEffect(() => {
    const fetchAdminsList = async () => {
      try {
        // Ensure that queryAdminsList correctly handles the creation of AdminItem instances
        const admins = queryAdminsList();
        setAdminsList(admins);
      } catch (error) {
        message.error('Failed to fetch admins list');
        console.error(error);
      }
    };
    fetchAdminsList();
  }, []);

  const handlePermissionChange = (adminID: string, permissionType: string, checked: boolean) => {
    const updatedAdminsList = adminsList.map(admin => {
      if (admin.adminID === adminID) {
        return { ...admin, [permissionType]: checked };
      }
      return admin;
    });
    setAdminsList(updatedAdminsList);
    if (DEBUG_NO_BACKEND){
        return
    }
    fetch(SERVER_ROOT_URL + 'changePermission',{
        method: "POST", 
        headers: {"Content-Type":"text/plain"},
        body: JSON.stringify(new ChangePermission(adminID, permissionType)
        )
    }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
        alert("更改权限成功！")
        } else {
            alert(replyJson.message) 
        }
    }).catch((e) => console.log(e)) 
  };

  // Define the columns configuration for the Table component
  const columns = [
    {
      title: '管理员ID',
      dataIndex: 'adminID',
      key: 'adminID',
    },
    {
      title: '是否为题库管理员',
      key: 'isProblemAdmin',
      render: (_: any, record: AdminItem) => (
        <Checkbox checked={record.isProblemAdmin} onChange={e => handlePermissionChange(record.adminID, 'isProblemAdmin', e.target.checked)}/>
      ),
    },
    {
      title: '是否为系统管理员',
      key: 'isSystemAdmin',
      render: (_: any, record: AdminItem) => (
        <Checkbox checked={record.isSystemAdmin} onChange={e => handlePermissionChange(record.adminID, 'isSystemAdmin', e.target.checked)}/>
      ),
    },
    {
      title: '是否为超级管理员',
      key: 'isSuperAdmin',
      render: (_: any, record: AdminItem) => (
        <Checkbox checked={record.isSuperAdmin} onChange={e => handlePermissionChange(record.adminID, 'isSuperAdmin', e.target.checked)}/>
      ),
    },
  ];

  return <Table dataSource={adminsList} columns={columns} rowKey="adminID" />;
};

export default AdminsTable;