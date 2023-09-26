import React, { useState, useEffect } from 'react'
import { Select, Table,  } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import service from "./userSevice"
import { genders, statuses } from './constants';

const { Column } = Table;

function Users() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()


  const [users, setUsers] = useState([])
  const [paginationPage,setPaginationPage] = useState(searchParams?.get('page') || 1)
  const [gender,setGender] = useState(searchParams?.get('gender') || 'all')


  useEffect(()=>{
    setSearchParams([['gender', gender], ['page', paginationPage] ])
    service.getUsers(paginationPage,gender).then(r => r.json()).then(d => setUsers(d))
  },[paginationPage,gender])


  return (
    <>
     <Select
      style={{ width: 120 }}
      defaultValue={gender}
      options={genders}
      onChange={gender => setGender(gender)}
      />
    <Table 
      dataSource={users}
      pagination={{ 
        total:100,
        defaultCurrent: paginationPage, 
        onChange: (page) => {setPaginationPage(page)}, 
        pageSizeOptions:[10] }} 
      rowKey={record => record.id}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/edit/${record.id}`)
          }}}} >
    <Column title="Name" dataIndex="name" key="name" />
    <Column title="Email" dataIndex="email" key="email" />
    <Column title="Gender" dataIndex="gender" key="gender" />
    <Column title="Status" dataIndex="status" key="status" render={(text,record) => {
      return (
        <span style={{color: text === 'active' ? 'green' : 'red'}}>{text}</span>
      )
    }}/>
    </Table>
    </>
  )
}

export default Users
