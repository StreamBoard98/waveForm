const data = require('../sampleCommentData');
// console.log(data[0]);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/waveform');

const db = mongoose.connection;
db.on('error', () => console.log('error connecting to mongo'));
db.once('open', () => console.log('has connected to mongo'));

const commentSchema = mongoose.Schema({
  songId: Number,
  commentId: { type: Number, unique: false },
  commentText: String,
  userImage: String,
  commentTime: Number
})

const songSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  artist: String,
  genre: String,
  album: String,
  songLength: Number,
  comments: [commentSchema]
})

const Song = mongoose.model('Song', songSchema);

console.log

for(let i = 0; i < data.length; i++) {
  const songDocument = new Song(data[i])
  songDocument.save((error, data) => {
    if (error) {
      console.log('Issue saving data', error);
    } else {
      console.log('Import successful', data);
    }
  });
}

Song.find((error, songs) => {
  if (error) {
    console.log('couldnt find tracks');
  } else {
    console.log('here are the tracks', songs);
  }
});


// "id": 1,
// "title": "reprehenderit marfa quinoa bag",
// "artist": "Rick Astley",
// "genre": "Jazz",
// "album": "Whenever You Need Sombeody",
// "songLength": 511,
// "comments": [{
//   "songId": 1,
//   "commentId": 1,
//   "comment_text": "reprehenderit. marfa quinoa bag tote kickstarter cillum incididunt letterpress vinegar",
//   "userImage": "/.mary.png",
//   "commentTime": 473
