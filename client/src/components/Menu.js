import React,{Fragment} from 'react';
import logo from '../image/logo.png';
import styled from 'styled-components';
import A from '../styled/A';


const Header = styled.header`
    height: 75px;
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
`;


const Login = styled.div`
    float: right;
    width: 200px;
    display: flex;
    align-items: center;
    height: 75px;
    padding: 10px;
`


const Logo = styled.img`
    float: left;
    width: 90px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
`

const Span = styled.span`
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    float: right;
    cursor: pointer;
    margin-right:${props => props.mr ? '20px' : '0px'};
`

const Menu = (props) =>{
    
    const logout = () =>{
        localStorage.removeItem("userData");
        alert("로그아웃 되었습니다.");
        props.history.push('/');
    }
    
    return (
        <Header>
            <A to="/"><Logo src={logo} alt="logo" /></A>
            <Login>
                { 
                localStorage.getItem('userData') ? 
                <Fragment>
                    <Span mr="true"> {JSON.parse(localStorage.getItem('userData')).userName}님</Span>
                    <Span onClick={logout}>로그아웃</Span>
                </Fragment> 
                : 
                <Fragment>
                    <A to="/login" mr="true">로그인</A>
                    <A to="/join">회원가입</A>
                </Fragment> 
                }
            </Login>
        </Header>
    );
    
}


export default Menu;