import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter  } from 'react-router-dom';
import { UserContext } from './UserContext';
import { app } from '../firebaseInit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { async } from '@firebase/util';
import Loading from './Loading';

const HeaderPage = ({history}) => {
  const [loading, setLoading] =useState(false);
  const db = getFirestore(app);
  const { user, setUser } = useContext(UserContext);
  const email = sessionStorage.getItem('email');
  
  const getUser = async() => {
    setLoading(true);
    const result = await getDoc(doc(db, 'users', email))
    // console.log(result.data())
    setUser(result.data());
    setLoading(false);
  }

  useEffect(() => {
    if (email)  getUser();
  }, [email])

  const onLogout = () => {
    sessionStorage.removeItem('email');
    setUser(null);
    history.push('/')
  }
  if(loading) return <Loading/>
  return (
    <div className='header'>
      <img src="https://blog.kakaocdn.net/dn/n5Wh3/btqBBfHUmSJ/an7P5wKwtYAheLJL0Oftpk/img.jpg" width="100%" height='200px' />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">😁</Navbar.Brand>
          <Nav className='me-auto'>
            <Link to='/'>Home</Link>
            <Link to='/posts'>게시글</Link>
            {email ?
              <Link to='/logout' onClick={onLogout}>로그아웃</Link> :
              <Link to='/login'>로그인</Link>
            }
          </Nav>
          {(user && user.name) && <Link to = "mypage"> {user.name}</Link>}
          {(user && user.photo) && <img src={user.photo} style={{width:'30px', borderRadius:'50%'}}/>}
        </Container>
      </Navbar>
    </div>
  )
}

export default withRouter(HeaderPage)