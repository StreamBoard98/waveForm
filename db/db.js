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

const getSong = (id, callback) => {
  Song.find({ id: id }).exec((error, data) => {
    if (error) {
      console.log('There was an error looking up song in db', err);
    } else {
      console.log('Song found!', data);
      callback(null, data[0]);
    }
  });
}

const getAll = () => {
  Song.find({}).exec((error, data) => {
    if (error) {
      console.log(err);
    } else {
      console.log(data);
    }
  })
}

const saveSong = (error, input) => {
  if (error) {
    console.log('Error saving song', error);
  } else {
    const song = new Song(input);
    song.save(() => {
      console.log('Song saved');
    })
  }
};

for (let i = 0; i < data.length; i++) {
  saveSong(null, data[i]);
}

module.exports = {
  getAll,
  getSong
}