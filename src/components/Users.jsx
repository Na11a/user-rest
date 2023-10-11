import { useState, useEffect } from 'react'
import { Select, Table,  } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import service from "../services/userSevice"
import { genders } from '../constants';

const { Column } = Table;
const totalUsersHeaders= 'X-Pagination-Total'

function Users() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  console.log('hotfix')


  const [users, setUsers] = useState([])
  const [paginationPage, setPaginationPage] = useState(searchParams?.get('page') || 1)
  const [gender, setGender] = useState(searchParams?.get('gender') || 'all')
  const [totalUsers, setTotalUsers] = useState(0)
  const [pageSize, setPageSize] = useState(10)


  useEffect(()=>{
    setSearchParams([['gender', gender], ['page', paginationPage] ])
    service.getUsers(paginationPage,gender,pageSize).then(r => {setTotalUsers(r.headers.get(totalUsersHeaders)); return r.json()}).then(d => {setUsers(d)})
    
  },[paginationPage, gender, pageSize, setSearchParams])


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
        total: totalUsers,
        defaultCurrent: paginationPage, 
        onChange: (page) => {setPaginationPage(page)},
        pageSize: pageSize, 
        onShowSizeChange: (_,size) => {setPageSize(size)}}} 
      rowKey={record => record.id}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/edit/${record.id}`)
          }}}} >
    <Column title="Name" dataIndex="name" key="name" />
    <Column title="Email" dataIndex="email" key="email" />
    <Column title="Gender" dataIndex="gender" key="gender" />
    <Column title="Status" dataIndex="status" key="status" render={(text,) => {
      return (
        <span style={{color: text === 'active' ? 'green' : 'red'}}>{text}</span>
      )
    }}/>
    </Table>
    </>
  )
}

export default Users
