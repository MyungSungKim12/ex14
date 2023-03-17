import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

const UpdatePage = ({ history, match }) => {
  const id = match.params.id;
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
    if (title === '') {
      alert('제목을 입력하세요');
      ref_title.current.focus();
    } else if (body === '') {
      alert('내용을 입력하세요.')
      ref_body.current.focus();
    } else {
      if (!window.confirm('위 내용의 글을 수정하실래요?')) return;
      updateDoc(doc(db, 'posts', id), {
        title: title, body: body, email: sessionStorage.getItem('email'), date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    alert('성공')
    history.push('/posts')
  }

const getPost = async () => {
  const result = await getDoc(doc(db, 'posts', id))
  setForm(result.data())
}

useEffect(() => {
  getPost();
}, [])

return (
  <Row className='justify-content-center p-4'>
    <h1>글수정</h1>

    <Col xl={5} className='m-3 p-3 text-center'>
      <Form onSubmit={onSubmit}>
        <Form.Control placeholder='제목을 입력하세요.' className='my-2' name='title' value={title} onChange={onChange} ref={ref_title} />
        <Form.Control placeholder='내용을 입력하세요' as="textarea" rows={10} name='body' value={body} onChange={onChange} ref={ref_body} />
        <Button type="submit p-5" className='my-2'>수정</Button>
      </Form>
    </Col>
  </Row>
)
}

export default UpdatePage