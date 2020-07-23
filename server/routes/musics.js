// express router 설정
const express = require('express');
const router = express.Router();

// bodyParser 설정
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// file upload
const multer = require('multer');
const upload = multer();

//db 설정파일
const conf = require('../config/db.json');

// mysql 연결
const mysql = require('mysql2');
const pool = mysql.createPool(conf);
const promisePool = pool.promise();


//aws설정
const AWS = require('aws-sdk');
const awsConfig = require('../config/aws.json');
AWS.config.update(awsConfig);

// 팟홀케이스 카멜케이스로 변환
const _ = require('lodash');
function objectToCamelCase(obj) {
  return _.mapKeys(obj, (v, k) => _.camelCase(k));
}



async function uploadFileAWS(file) {
  let s3params = {
    Bucket: awsConfig.bucketName,
    Key: `${Date.now()}${file.originalname}`,
    ACL: 'public-read',
    Body: file.buffer,
  };

  let res = await new AWS.S3().upload(s3params).promise();
  return res.Location;
}

router.get("/", upload.none(), async (req, res) => {
  let sql = "SELECT m.music_id, m.user_id, m.music_name, m.music_url, DATE_FORMAT(m.today, '%Y-%m-%d') AS today, m.image_url,u.user_email, u.user_name "
    + "FROM music as m join user as u on m.user_id = u.user_id";
  let userId = req.query.userId || null;
  let rows;
  if(userId){
    sql = sql + ` where u.user_id = ?`;
    [rows] = await promisePool.query(sql,[userId]);
  }else{
    [rows] = await promisePool.query(sql);  
  }
  rows = await rows.map(objectToCamelCase);
  res.send(rows);
});



router.post('/', upload.fields([{ name: 'imageFile' }, { name: 'musicFile' }]), async (req, res, next) => {
  let userId = req.body.userId;
  let musicName = req.body.musicName;
  let musicFile = req.files.musicFile[0];
  let imageFile = req.files.imageFile[0];

  if(!userId || !musicName || !musicFile || !imageFile){
    res.status(404).send({ error: "Wrong Approach"});
  }

  let musicUrl = await uploadFileAWS(musicFile);
  let imageUrl = await uploadFileAWS(imageFile);

  let parames = [userId, musicName, musicUrl, imageUrl];
  let sql = 'INSERT INTO music(music_id, user_id, music_name, music_url, image_url, today) VALUES(null, ?, ?, ?, ?, DATE(NOW()))';
  let [rows] = await promisePool.execute(sql, parames);
  res.send(rows);
});

router.put('/', upload.fields([{ name: 'imageFile' }, { name: 'musicFile' }]), async (req, res) => {
  let musicName = req.body.musicName;
  let musicId = req.body.musicId;
  let musicFile = req.files.musicFile;    
  let imageFile = req.files.imageFile;

  if(!musicId || !musicName){
    res.status(404).send({ error: "Wrong Approach"});
  }

  parames = [musicName,];
  let sql = 'UPDATE music SET music_name = ?';
  if (imageFile) {
    let imageUrl = await uploadFileAWS(imageFile[0]);
    parames.push(imageUrl);
    sql += ', image_url = ?'
  }

  if (musicFile) {
    let musicUrl = await uploadFileAWS(musicFile[0]);
    parames.push(musicUrl);
    sql += ', music_url = ?'
  }
  sql += ' where music_id = ?';
  parames.push(musicId);
  let [rows] = await promisePool.execute(sql, parames);
  res.send(rows);
});


router.get('/:musicId', upload.none(), async(req, res) => {
  let musicId = req.params.musicId;
  if(!musicId){
    res.status(404).send({ error: "Wrong Approach"});
  }
  let sql = 'select * from music where music_id = ?';
  let [rows] = await promisePool.query(sql, musicId);
  rows = await rows.map(objectToCamelCase);
  res.send(rows);
});



router.delete('/:musicId', upload.none(), async(req, res) => {
  let musicId = req.params.musicId;
  if(!musicId){
    res.status(404).send({ error: "Wrong Approach"});
  }
  let sql = 'delete from music where music_id = ?';
  let [rows] = await promisePool.execute(sql, [musicId]);
  res.send(rows);  
});



module.exports = router;

