import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-dom/test-utils';
import {expect} from 'chai';
import configureMockStore from 'redux-mock-store';

import Creater from "../components/CounterContainer/Creater/Creater";

describe('Creater', () => {
  const mockStore = configureMockStore();
  let store;

  beforeEach(function() {
    store = mockStore({});
  });

  it('renders without crashing', () => {
    const component = renderIntoDocument(
      <Creater store={store}/>
    );
    const btn = findRenderedDOMComponentWithClass(component, 'action--creater');
    Simulate.click(btn);
    expect(btn.className).to.equal('action action--creater');
  });
});
