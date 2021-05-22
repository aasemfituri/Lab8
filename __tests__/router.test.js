/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';

describe('History stack length', () => {
    test('Push settings and check length', () => {
        pushToHistory('settings');
        expect(history.length).toBe(2);
    });
    test('Push entry and check length', () => {
        pushToHistory('entry', 9);
        expect(history.length).toBe(3);
    });
});

describe('Setting state', () => {
    test('Push settings state to history', () => {
    let state = pushToHistory('settings').state;
    expect(state).toEqual({ page: 'settings' });
    });

    test('Push setting state with null entryNum', () => {
        let state = pushToHistory('settings', null).state;
        expect(state).toEqual({ page: 'settings' });
    });
});

describe('Entry state', () => {
    test('Push entry state to history', () => {
        let state = pushToHistory('entry', 5).state;
        expect(state).toEqual({ page: 'entry5' });
    });
    test('Push entry state to history with high entryNum', () => {
        let state = pushToHistory('entry', 100).state;
        expect(state).toEqual({ page: 'entry100' });
    });
    test('Push entry state to history with no entryNum', () => {
        let state = pushToHistory('entry').state;
        expect(state).toEqual({ page: 'entryundefined' });
    });
    test('Push entry state to history with negative entryNum', () => {
        let state = pushToHistory('entry', -1).state;
        expect(state).toEqual({ page: 'entry-1' });
    });

});

describe('Other state', () => {
    test('Pushing any other state to history', () => {
        let state = pushToHistory().state;
        expect(state).toEqual({ });
        state = pushToHistory('something').state;
        expect(state).toEqual({ });
    });
});

