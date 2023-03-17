import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import WritePage from './WritePage'
import {Row, Col, Card, Button} from 'react-bootstrap'
import {app} from '../firebaseInit'
import {onSnapshot, getFirestore, doc, query, collection, orderBy } from 'firebase/firestore'
import Loading from './Loading'


const PostsPage = () => {
  const db = getFirestore(app);
  const [total, setTotal] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPosts = () => {
    setLoading(true);
    const q = query(collection(db,'posts'), orderBy('date', 'desc'))
    onSnapshot(q, (result)=>{
      let rows = [];
      result.forEach(row=>{
        rows.push({id:row.id, ...row.data()});
      })
      setTotal(rows.length);
      setPosts(rows);
      setLoading(false);
    })
  }

  useEffect(()=>{
    getPosts();
  },[])
  if(loading) return <Loading/>
  return (
    <Row className='posts m-3 justify-content-center'>
      <Col xl={10}>
      {sessionStorage.getItem('email') &&
        <>
          <Link to="/posts/write" style={{float:'left'}}><Button type='submit'>글쓰기</Button></Link>
        </>
      }
      <hr/>
      <h1>게시글 목록</h1>
      <br/>
      
      <span style={{float:'right'}}>전체 게시물 수 : {total} </span>
      <hr/>
      {posts.map(post=>
        <Card className='my-2 mx-2' key={post.id}>
          <Card.Body style={{float:'left'}}>
            <h4>{post.title}</h4>
            <p className='ellipsis'>{post.body}</p>
            <Link to={`/posts/${post.id}`}><Button>Read More</Button></Link>
          </Card.Body>
          <Card.Footer className='text-muted'>
            Posted on {post.date} by {post.email}
          </Card.Footer>
        </Card>
        )}
      </Col>
    </Row>
  )
}

export default PostsPage