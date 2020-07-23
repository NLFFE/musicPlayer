const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const usersRouter = require('./routes/users.js');
const musicsRouter = require('./routes/musics.js');
const myAlbums = require('./routes/albums.js');
const myAlbumMusics = require('./routes/albumMusics.js');

app.use('/users', usersRouter);
app.use('/musics', musicsRouter);
app.use('/albums', myAlbums);
app.use('/albumMusics', myAlbumMusics);

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})