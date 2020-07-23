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

// db 설정 파일 가져오기 
const conf = require('../config/db.json');

// mysql 연결
const mysql = require('mysql2');
const pool = mysql.createPool(conf);
const promisePool = pool.promise();

// 비밀번호 암호화 
const bcrypt = require('bcrypt');

// 팟홀케이스 카멜케이스로 변환
const _ = require('lodash');
function objectToCamelCase(obj) {
  return _.mapKeys(obj, (v, k) => _.camelCase(k));
}



router.post("/login", upload.none(),async function(req, res){
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;

    if(!userEmail || !userPassword){
      res.status(404).send({ error: "Wrong Approach"});
    }

    let sql = 'select * from user where user_email = ?';
    let [rows] = await promisePool.query(sql, userEmail);
    rows = await rows.map(objectToCamelCase);

    if(rows.length > 0){
      let hashPassword = bcrypt.hashSync(userPassword, rows[0].userSalt);
      if(hashPassword === rows[0].userPassword){
        res.send(rows[0]);
      }
    }
    res.end();
});

router.post('/', upload.none(), async(req, res) => {
    let userEmail = req.body.userEmail;
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;

    if(!userEmail || !userName || !userPassword){
      res.status(404).send({ error: "Wrong Approach"});
    }

    let userSalt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(userPassword, userSalt);
    parames = [userEmail, userName, hashPassword, userSalt];

    let sql = 'INSERT INTO user(user_id, user_email, user_name, user_password, user_salt) VALUES(null, ?, ?, ?, ?)';
    let [rows] = await promisePool.execute(sql,parames);
    res.send(rows);
});

router.get('/:userEmail', upload.none(), async(req, res) => {
  let userEmail = req.params.userEmail;
  
  let sql = 'select 1 from user where user_email = ?';
  let [rows] = await promisePool.query(sql,userEmail);
  rows = await rows.map(objectToCamelCase);
  res.send(rows);
});

module.exports = router;