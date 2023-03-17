
import React, { useState } from 'react'
import {  Button, Card, Col, Form, Row } from 'react-bootstrap'
import {app} from '../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import Loading from './Loading'


const LoginPage = ({history}) => {
  const [loading, setLoading] = useState(false)
  const auth = getAuth(app);
  const [form, setForm] = useState({
    email:'user01@email.com', password:'12341234'
  })
  const {email, password} = form;
  const onChange = (e) => {
    setForm({
      ...form, [e.target.name]:e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    //로그인 처리
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((success)=>{
      // setLoading(false);
      sessionStorage.setItem('email', email);
      history.push('/');
    })
    .catch((error)=>{
      setLoading(false);
      alert(error.message + '로그인 실패')
    })
  }
  if(loading) return <Loading/>
  return (
    <Row className='justify-content-center'>
      <Col xl={4} md={5}>
        <Card className='m-5 p-3'>
          <Card.Title className='text-center'>
            <h3>로그인</h3>
          </Card.Title>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Control onChange={onChange} placeholder='email' className='my-2' name='email' value={email}/>
              <Form.Control onChange={onChange} placeholder='password' className='my-2'type='password' value={password} name='password'/>
              <Button type='submit' className='my-2 px-5'>Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>

  )
}

export default LoginPage