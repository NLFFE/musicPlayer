import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const SideBar = styled.div`
    height: 100%;
	width: 200px;
	position: fixed;
	background-color: #fff;
	border-right: 1px solid #e0e0e0;
	top: 75px;
	left: 0;
	z-index: 2;
	padding: 20px 20px;
	text-align: center;
	font-weight: 800;
	font-size: 14px;
`;


const Menu = styled(Link)`
	display:flex;
	height:50px;
	justify-content:center;
	align-items:center;
`;


const SideMenu = () => {
    return (
        <SideBar>
            {localStorage.getItem('userData') && <Menu to="/musics/add">음악 추가하기 </Menu>}
			{localStorage.getItem('userData') && <Menu to="/">전체 음악 </Menu>}
			{localStorage.getItem('userData') && <Menu to="/musics/mine">내 음악 </Menu>}
			{localStorage.getItem('userData') && <Menu to="/albums/mine">내 앨범</Menu>}
        </SideBar>
    );
};

export default SideMenu;