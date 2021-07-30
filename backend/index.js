const express = require('express');
const fs = require('fs');
const upload = require('express-fileupload');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { db } = require('./conf');

const app = express();
app.use(upload());
app.use(express.json());
app.use(express.static('public'));

app.post('/form', async (req, res) => {
  const { avatar, background } = req.files;
  const { firstName, lastName, email } = req.body;

  try {
    const sqlUser = 'INSERT INTO users SET ?';
    const sqlValuesUser = { firstName, lastName, email };

    const [insertStats] = await db.query(sqlUser, [sqlValuesUser]);
    const idUser = insertStats.insertId;

    let fileName = `public/upload/${uuidv4()}.${mime.extension(
      avatar.mimetype
    )}`;
    await fs.writeFile(fileName, avatar.data, async () => {
      const sqlAvatar = 'INSERT INTO pictures SET ?';
      const sqlValuesAvatar = { idUser, url: fileName };
      await db.query(sqlAvatar, [sqlValuesAvatar]);
    });

    fileName = `public/upload/${uuidv4()}.${mime.extension(
      background.mimetype
    )}`;
    await fs.writeFile(fileName, background.data, async () => {
      const sqlBackground = 'INSERT INTO pictures SET ?';
      const sqlValuesBackground = { idUser, url: fileName };
      await db.query(sqlBackground, [sqlValuesBackground]);
    });

    res.status(201).send('Character recorded!');
  } catch (err) {
    console.log(err);
    res.status(400).send('An error ocurred');
  }
});

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(5050, () => {
  console.log('This API now available on http://localhost:5050 !');
});
