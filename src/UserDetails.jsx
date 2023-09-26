import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import service from "./userSevice"
import { Button, Card, Form, Select, notification } from 'antd';
import { Input } from 'antd';
import { statuses } from "./constants";


export default function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {
    service.getUser(id).then(r => r.json()).then(d => setUser(d))
  }, [id])

  function handleSubmitForm(e){
    service.editUser({id,...e})
    .then(r => r.json())
    .then(r => notification.success({
      message: `User updated ${r.id}`,
      duration: 3
    }))
    .then(()=>navigate('/users'))
    .catch((e) => notification.error({
      message: e,
      duration: 3
    }))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      {user ? (
        <Card title={user.name} bordered={false} style={{ width: 400 }}>
          <Form 
            style={{ display: "flex", flexDirection: 'column', rowGap: '12px' }} 
            onFinish={handleSubmitForm}
          >
            <Form.Item  
              label="Username"
              initialValue={user.name}
              name="username" rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
              <Input type="text"  />
            </Form.Item>
            <Form.Item  
              label="Email"
              name="email"
              initialValue={user.email} rules={[
              {
                required: true,
                message: 'Please input your email!',
                type:'email'
              },
            ]}>
              <Input  />
            </Form.Item>
            <Form.Item  
              label="Gender"
              initialValue={user.gender}
              name="gender" rules={[
              {
                required: true,
                message: 'Please input your gender!',
              },
            ]}>
              <Input type="text"  />
            </Form.Item>
            <Form.Item 
              label="Status"
              initialValue={user.status}
              name="status" rules={[
                {
                  required: true,
                  message: 'Please select your status!',
                },
              ]}>
                <Select
                style={{ width: 120 }}
                options={statuses} />
              </Form.Item>
              <Button htmlType="submit">Edit</Button>
          </Form>
        </Card>
    ) : ''}</div>
  )
}
