import logo from './logo.svg';
import './App.css';
import HeaderPage from './components/HeaderPage';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import PostsPage from './components/PostsPage';
import WritePage from './components/WritePage';
import ReadPage from './components/ReadPage';
import UpdatePage from './components/UpdatePage';

function App() {
  const [user, setUser] = useState('');
  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="App">
      <HeaderPage />

      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} exact={true}/>
        <Route path="/posts" component={PostsPage} exact={true} />
        <Route path="/posts/write" component={WritePage}/>
        <Route path="/posts/:id" component={ReadPage} exact={true}/>
        <Route path="/posts/update/:id" component={UpdatePage}/>
      </Switch>
    </div>
    </UserContext.Provider>
  );
}

export default App;
