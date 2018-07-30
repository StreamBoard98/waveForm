import React from 'react';
import { shallow, mount, render } from 'enzyme';

//adapter config placement
import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const db = require('./db/db');

describe('GET request', () => {
  test('should return song with given id', (done) => {
    function callback(error, data) {
      expect(data.id).toBe(11);
      done();
    }
    db.getSong(11, callback);
  });

});
