import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import {app} from '../firebaseInit'
import {getFirestore, collection, addDoc} from 'firebase/firestore'


const WritePage = ({history}) => {
  const db = getFirestore(app);
  const ref_title = useRef(null);
  const ref_body = useRef(null);
  const [form, setForm] = useState({
    title: '', body: ''
  })
  const { title, body } = form;
  const onChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(title === '') {
      alert('제목을 입력하세요');
      ref_title.current.focus();
    }else if (body === '') {
      alert('내용을 입력하세요.')
      ref_body.current.focus();
    }else{
      if(!window.confirm('위 내용의 글을 등록하실래요?')) return;
      const data = {
        title: title, body: body, email:sessionStorage.getItem('email'),date:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
      // console.log(data)
      addDoc(collection(db, 'posts' ), data)
      setForm({
        title:'', body:''
      })
      alert('성공')
      history.push('/posts')
    }
  }

  return (
    <Row className='justify-content-center p-4'>
      <h1>글쓰기</h1>

      <Col xl={5} className='m-3 p-3 text-center'>
        <Form onSubmit={onSubmit}>
          <Form.Control placeholder='제목을 입력하세요.' className='my-2' name='title' value={title} onChange={onChange} ref={ref_title}/>
          <Form.Control placeholder='내용을 입력하세요' as="textarea" rows={10} name='body' value={body} onChange={onChange} ref={ref_body}/>
          <Button type="submit p-5" className='my-2'>등록</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default WritePage