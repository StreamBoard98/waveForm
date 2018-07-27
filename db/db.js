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

// for(let i = 0; i < data.length; i++) {
//   const songDocument = new Song(data[i])
//   songDocument.save((error, data) => {
//     if (error) {
//       console.log('Issue saving data', error);
//     } else {
//       console.log('Import successful');
//     }
//   });
// }

// Song.find((error, songs) => {
//   if (error) {
//     console.log('couldnt find tracks');
//   } else {
//     console.log('here are the tracks', songs);
//   }
// });

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

const getAll = (callback) => {
  Song.find({ id: 15 }).exec((error, data) => {
    if (error) {
      console.log(err);
    } else {
      console.log(data);
    }
  })
}

const saveSong = (error, song) => {
  if (error) {
    console.log('error saving song', error);
  } else {
    const song = new Song(song);
    song.save(() => {
      console.log('Song saved');
    })
  }
}

// getSong(13, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('success');
//   }
// })

// getAll((err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
module.exports = {
  getAll,
  getSong
}