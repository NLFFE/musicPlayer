import React,{useEffect, useState, useRef} from 'react';
import styled from 'styled-components';


const Footers = styled.footer`
    width: 100%;
	height: 56px;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 999;
	background-color: #fff;
	border-top: 1px solid #e0e0e0;
`

const Audio = styled.audio`
    display: none;
`

const FooterTime = styled.div`
    height: 100%;
	width: 200px;
	float: left;
	display: flex;
	justify-content: center;
	align-items: center;	
`

const FooterMusicName = styled.div`
    padding: 0px 40px;
	width: 400px;
	height: 100%;
	display: flex;
	font-weight: bold;
	align-items: center;
	color: #757575;
	float: left;
`

const FooterMusicImage = styled.div`
    width: 56px;
	height: 56px;
	float: left;
    background-position: center center;
    background-image: ${props => props.backgroundImage};
    
`

const Control = styled.div`
    width: 400px;
	height: 100%;
	float: right;
	display: flex;
	align-items: center;
`

const Button = styled.button`
    padding: 10px;
	border: 0px;
	margin: 0px 10px;
`

const Progress = styled.div`
    width: 100%;
	height: 5px;
	position: relative;
	cursor: pointer;
	border-bottom: 1px solid #e0e0e0;	
`

const Bar = styled.div`
    width: ${props => props.width};
	background-color: black;
    height: 5px;
`

const Footer = ({selectMusic}) =>{
    let [isPlaying, setisPlaying] = useState(false);
    let [currentTime, setCurrentTime] = useState(0);
    let [duration, setDuration] = useState(0);
    let [loop, setLoop] = useState(false);

    let audio = useRef(null);
    let progress = useRef(null);
    let [barWidth, setBarWidth] = useState("0%");
    const {musicUrl,musicName,imageUrl} = selectMusic;


    useEffect(()=>{
        audio.current.volume = 0.1;
    },[]);


    useEffect(()=>{
        isPlaying ? audio.current.play() : audio.current.pause();
        let interval = setInterval(()=>{
            if(isPlaying){
                setCurrentTime(audio.current.currentTime);    
            }
        }, isPlaying ? 100 : null);

        return () => {
            clearInterval(interval);
        };
    },[isPlaying]);

    useEffect(()=>{
        audio.current.addEventListener('ended', ()=> {
            if(loop){
                setCurrentTime(0);
                audio.current.play();
            }else{
                setisPlaying(false);
            }
        });  
    },[loop]);

    useEffect(()=>{
        audio.current.addEventListener('loadedmetadata', (e) => {
            setisPlaying(false);
            setDuration(e.target.duration);
            setisPlaying(true);
        });
    },[selectMusic]);

    useEffect(()=>{
        if(duration > 0 && currentTime > 0){
            let barWidth = ((progress.current.offsetWidth / duration) * currentTime / progress.current.offsetWidth * 100)+"%";
            setBarWidth(barWidth);
        }
        
    },[currentTime, duration]);

    const clickProgress = (e) =>{
        let point = e.clientX;
        let pWidth = point / progress.current.offsetWidth * 100+"%";
        audio.current.currentTime = duration *  point / progress.current.offsetWidth;
        setBarWidth(pWidth);
        setCurrentTime(audio.current.currentTime);
    }
    
    const count = (time) =>{
        let ftime = Math.floor(time);
        let m = 0;
        m = Math.floor(ftime / 60);
        let s = Math.floor(ftime % 60);
        if(m <= 9){
            m = "0"+m
        }
        if(s <= 9){
            s = "0"+s
        }
        return m+":"+s
    }

    return(
        <Footers>
            <Progress onClick={clickProgress} ref ={progress}>
                <Bar width={barWidth}></Bar>
            </Progress>

            <Audio preload="metadata" ref={audio} type="audio/mpeg" src={musicUrl}></Audio>

            <FooterMusicImage backgroundImage = {`url(${imageUrl})`}></FooterMusicImage>
            <FooterMusicName>{musicName}</FooterMusicName>

            <Control>
                {
                    loop ?  <Button onClick={()=>setLoop(false)}>반복취소</Button> : <Button onClick={()=>setLoop(true)}>반복하기</Button>
                }
                {
                    isPlaying ?  <Button onClick={()=>setisPlaying(false)}>중지</Button> : <Button onClick={()=> setisPlaying(true)}>실행</Button>
                }
            </Control>

            <FooterTime>{count(currentTime)} : {count(duration)}</FooterTime>
        </Footers>
    );
}

        




export default Footer;