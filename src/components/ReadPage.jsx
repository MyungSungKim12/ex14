import React, { useEffect, useState } from 'react'
import { app } from '../firebaseInit'
import { getFirestore, getDoc, doc, deleteDoc } from 'firebase/firestore';
import Loading from './Loading';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { async } from '@firebase/util';
import { Link } from 'react-router-dom';

const ReadPage = ({ match, history }) => {
  const db = getFirestore(app);
  const id = match.params.id;
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);

  const getPost = async () => {
    setLoading(true);
    const result = await getDoc(doc(db, 'posts', id))
    console.log(result.data())
    setPost(result.data())
    setLoading(false);
  }

  useEffect(() => {
    getPost();
  }, [])
  if (loading) return <Loading />

  const onDelete = async(id) => {
    if(!window.confirm(`${id}번 게시글을 삭제하실래요?`)) return
    await deleteDoc(doc(db, 'posts', id))
    history.push('/posts')
  }
  return (
    <Row className='justify-content-center'>
      <Col xl={10}>
        <h1>게시글 정보</h1>

        <Card className='my-3' style={{ float: 'left' }}>
          <Card.Title><h2>{post.title}</h2></Card.Title>
          <Card.Body>
            <p>{post.body}</p>
            
            <p><b>{post.date}  {post.email}</b></p>
          </Card.Body>
          <hr />
          {sessionStorage.getItem('email') === post.email &&
            <div className='my-2'>
              <Link to ={`/posts/update/${id}`}><Button className='mx-2'>수정</Button></Link>
              <Button type='submit' onClick={()=>onDelete(id)} >삭제</Button>
            </div>
          }
        </Card>
      </Col>
    </Row>
  )
}

export default ReadPage