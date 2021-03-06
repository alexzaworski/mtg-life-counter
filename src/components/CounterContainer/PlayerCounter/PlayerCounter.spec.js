import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass,
    Simulate,
} from 'react-dom/test-utils';
import { Map } from 'immutable';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import HEROLIST from '../../../helpers/heroList';
import PlayerCounter from './PlayerCounter';

describe('PlayerCounter', () => {
    const mockStore = configureMockStore();
    let store; // eslint-disable-line immutable/no-let

    beforeEach(() => {
        store = mockStore({});
    });

    it('renders without crashing', () => {
        const player = new Map({ life: 20, position: 0, currentHero: HEROLIST.get(0) });

        const component = renderIntoDocument(
            <PlayerCounter store={store} key={ 1 } index={1} player={player}/>,
        );
        const div = findRenderedDOMComponentWithClass(component, 'icon-player');
        expect(div.textContent).to.equal(HEROLIST.get(0).name + 20);
    });

    it('check buttons count', () => {
        const player = new Map({ life: 20, position: 0, currentHero: HEROLIST.get(0) });

        const component = renderIntoDocument(
            <PlayerCounter store={store} key={ 1 } index={1} player={player}/>,
        );
        const avatarBtns = scryRenderedDOMComponentsWithClass(component, 'avatar-controls');
        expect(avatarBtns.length).to.equal(2);
        const lifeBtns = scryRenderedDOMComponentsWithClass(component, 'life-actions');
        expect(lifeBtns.length).to.equal(2);
    });

    it('Can click to button', () => {
        const player = new Map({ life: 20, position: 0, currentHero: HEROLIST.get(0) });

        const component = renderIntoDocument(
            <PlayerCounter store={store} key={ 1 } index={1} player={player}/>,
        );
        const btns = scryRenderedDOMComponentsWithClass(component, 'btn');
        Simulate.click(btns[0]);
        Simulate.click(btns[1]);
        Simulate.click(btns[2]);
        Simulate.click(btns[3]);
        expect(btns.length).to.equal(4);
    });

    it('check life total', () => {
        const player = new Map({ life: 20, position: 0, currentHero: HEROLIST.get(0) });

        const component = renderIntoDocument(
            <PlayerCounter store={store} key={ 1 } index={1} player={player}/>,
        );
        const life = findRenderedDOMComponentWithClass(component, 'life-total');
        expect(life.textContent).to.equal('20');
    });
});
