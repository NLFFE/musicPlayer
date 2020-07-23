import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Card = styled.div`
    display: block;
	width: 100%;
	height: 100%;
	border: 1px solid #e0e0e0;
	position: relative;
`

const Gradient = styled.div`
    position: absolute;
	width: 100%;
	bottom: 0;
	height: 100px;
	background-color: #fff;
	overflow: hidden;
	padding: 10px;
`

const Musictitle = styled.p`
    font-weight: 700;
	font-size: 13px;
`
const MusicArtist = styled.p`
    font-size: 12px;
	color: #757575;
	margin-top: 2px;
`

const MusicDate = styled.p`
    position: absolute;
	right: 12px;
	bottom: 12px;
	font-size: 13px;
	font-weight: 400;
`

const MusicMusicUpdate = styled(Link)`
    font-size: 14px;
	border: 1px solid #e0e0e0;
	border-radius: 5px;
	display: inline-block;
	margin-top: 8px;
	font-weight: 600;
	padding: 10px;
	font-size: 12px;
`

const MusicImage = styled.img`
    width: 100%;
    height: 252px;
    cursor: pointer;
    background-position: center center;
`

const Item = styled.div`
    height: 352px;
	min-width: 255px;
    &:hover ${MusicImage}{
        opacity:0.5;
    }
`

const MusicItem = (props) =>{
        const { music } = props;
        const DoubleClickmusic = e => {
            let selectMusic = { musicUrl: music.musicUrl, musicName: music.musicName, imageUrl: music.imageUrl };
            props.onDoubleClick(selectMusic);
        }        
        const handleContextMenu = e =>{
            e.preventDefault();
            let location = {x:e.clientX, y:e.clientY, music:music}
            props.onContextMenu(location);
        }

        const backgorundUrl = {
            backgroundImage: `url(${music.imageUrl})`  
        }
        return (
            <Item onContextMenu={handleContextMenu}>
                <Card>
                    <MusicImage style={backgorundUrl} onDoubleClick={DoubleClickmusic}></MusicImage>
                    <Gradient>
                        <Musictitle>{music.musicName}</Musictitle>
                        <MusicArtist>{`${music.userEmail} | ${music.userName}`}</MusicArtist>
                        {
                            localStorage.getItem('userData') && (music.userId === JSON.parse(localStorage.getItem('userData')).userId) &&
                            <MusicMusicUpdate to={`/musics/${music.musicId}`} className="music-update"><span>수정</span></MusicMusicUpdate>
                        }
                        <MusicDate>{music.today}</MusicDate>
                    </Gradient>
                </Card>
            </Item>
        );
}






export default MusicItem;