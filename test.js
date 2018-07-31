import React from 'react';
import Enzyme, { shallow, mount, render, configure } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

//adapter config placement
import Adapter from 'enzyme-adapter-react-16';
import App from './client/src/components/App';
import sinon from 'sinon';

import 'canvas-prebuilt';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

Enzyme.configure({ adapter: new Adapter() })

describe('<App /> component', () => {

  // it('calls componentDidMount', () => {
  //   sinon.spy(App.prototype, 'componentDidMount');
  //   const wrapper = mount(<App />);

  //   expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  // })

  // it('renders the App', () => {
  //   const wrapper = shallow(<App />);

  //   expect(wrapper.find('.waveformHero')).to.have.length(1);
  // })

  // it('adds correctly', () => {
  //   expect(1 + 1).toEqual(2);
  // })
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
  // it('should render a canvas element', () => {
  //   const wrapper = mount(<App />);
  //   expect(wrapper.find(<)).to.have.length(1);
  // });
});
