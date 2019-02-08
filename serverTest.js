const db = require('./database.js');

describe('getSong', () => {
  test('should return song with given id', (done) => {
    function callback(data) {
      expect(data[0].songId).toBe(11);
      done();
    }
    db.getSong(11, callback);
  });
});