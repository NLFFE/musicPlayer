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


// 팟홀케이스 카멜케이스로 변환
const _ = require('lodash');
function objectToCamelCase(obj) {
  return _.mapKeys(obj, (v, k) => _.camelCase(k));
}


router.get('/', upload.none(), async(req, res) => {
    let sql = "select * from album "
    let userId = req.query.userId;
    let rows;
    if(!userId){
      [rows] = await promisePool.query(sql);
    }else{
      sql = sql + "where user_id = ?";
      [rows] = await promisePool.query(sql, userId);
    }
    rows = await rows.map(objectToCamelCase);
    
    res.send(rows);
});



router.post('/', upload.none(), async(req, res) => {
  let sql = "insert into album(album_name,user_id) values(?,?)";
  let userId = req.body.userId;
  let albumName = req.body.albumName
  if(!userId || !albumName){
    res.status(404).send({ error: "Wrong Approach"});
  }
  let parames = [albumName,userId];
  try{
    let rows = await promisePool.query(sql, parames);
    res.send(rows);
  } catch(e){
    res.statusMessage = "이미 추가된 음악입니다.";
    res.end();
  }
  
  
  
});





module.exports = router;