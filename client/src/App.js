import React, { Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from './components/Menu'
import SideMenu from './components/SideMenu'
import MainPageTemplate from './pages/MainPageTemplate';
import LoginPageTemplate from './pages/LoginPageTemplate';
import JoinPageTemplate from './pages/JoinPageTemplate';
import MusicAddTemplate from './pages/MusicAddTemplate';
import MusicUpdateTemplate from './pages/MusicUpdateTemplate';
import MyPageTemplate from './pages/MyPageTemplate';
import MyAlbumsTemplate from './pages/MyAlbumsTemplate';


const App = () =>{
  return (
  <Fragment>
        <Route exact path="/" component={MainPageTemplate} />

        <Route path="/" component={Menu} />
        <Route path="/" component={SideMenu} />
        <Route path="/login" component={LoginPageTemplate} />
        <Route path="/join" component={JoinPageTemplate} />
        <Route path="/albums/mine" component={MyAlbumsTemplate} />
        
        <Switch>
        <Route path="/musics/mine" component={MyPageTemplate} />
          <Route path="/musics/add" component={MusicAddTemplate} />
          <Route path="/musics/:id" component={MusicUpdateTemplate} />
        </Switch>
      </Fragment>
  );
}



export default App;
