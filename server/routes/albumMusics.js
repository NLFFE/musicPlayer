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



router.post('/', upload.none(), async(req, res) => {
  let sql = "insert into album_music(album_id,music_id) values(?,?)";
  let musicId = req.body.musicId;
  let albumId = req.body.albumId;
  if(!musicId || !albumId){
    res.status(404).send({ error: "Wrong Approach"});
  }
  let parames = [albumId,musicId];
  let [rows] = await promisePool.query(sql, parames);  
  res.send(rows);
});

  


module.exports = router;