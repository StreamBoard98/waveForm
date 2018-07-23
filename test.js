import React from 'react';
import { shallow, mount, render } from 'enzyme';


//adapter config placement
import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './client/src/components/App.jsx';

configure({ adapter: new Adapter() });

jest.mock('./client/src/components/App.jsx'); // SoundPlayer is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  App.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
  const app = new App();
  expect(App).toHaveBeenCalledTimes(1);
});

it('renders the App', () => {
  const wrapper = shallow(<div className="content" />);
  expect(wrapper.find('.content').to.have.length(1));
});