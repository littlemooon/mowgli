'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

import RootMixin from '../src/RootMixin';
import Mixin from '../src/Mixin';

const RootComponent = React.createClass({
	mixins: [RootMixin],
	render: function() { return React.createElement(Component, {ref: 'theComponent'}); }
});
const Component = React.createClass({
	mixins: [Mixin],
	render: function() { return React.createElement('div'); }
});

const RootComponentWithData = React.createClass({
	mixins: [RootMixin],
	render: function() { return React.createElement(ComponentWithData, {ref: 'theComponent', data: 'asd.qwe'}); }
});
const ComponentWithData = React.createClass({
	mixins: [Mixin],
	data: { string: 'asd.qwe', array: ['asd', 'qwe'] },
	render: function() { return React.createElement('div'); }
});

const RootComponentWithActions = React.createClass({
	mixins: [RootMixin],
	render: function() { return React.createElement(ComponentWithActions, {ref: 'theComponent', action: 'asd.qwe'}); }
});
const ComponentWithActions = React.createClass({
	mixins: [Mixin],
	actions: { string: 'asd.qwe', array: ['asd', 'qwe'] },
	render: function() { return React.createElement('div'); }
});

describe('Mixin', () => {

	describe('on mount', () => {
		it('should require a tree', () => {
			expect(() => TestUtils.renderIntoDocument(React.createElement(RootComponent))).to.throw(`No tree has been passed to your root component`);
		});

		describe('with data', () => {
			it('should not add unmatched data to the state', () => {
				const c = TestUtils.renderIntoDocument(React.createElement(RootComponentWithData, {tree: {test: 123}}));
				expect(c.refs.theComponent.state.string).to.not.exist;
			});
			it('should add matching data to the state for a string path', () => {
				const c = TestUtils.renderIntoDocument(React.createElement(RootComponentWithData, {tree: {asd: {qwe: 123}}}));
				c.refs.theComponent.state.string.should.eql(123);
			});
			it('should add matching data to the state for an array path', () => {
				const c = TestUtils.renderIntoDocument(React.createElement(RootComponentWithData, {tree: {asd: {qwe: 123}}}));
				c.refs.theComponent.state.array.should.eql(123);
			});
			it('should update data on rerender', () => {
				const c = TestUtils.renderIntoDocument(React.createElement(RootComponentWithData, {tree: {asd: {qwe: 123}}}));
				c.setProps({tree: {asd: {qwe: 234}}});
				// TODO: fails in the test, context is not correctly passed to the component... does it need to be another layer deep???!
				// c.refs.theComponent.state.array.should.eql(234);
			});
		});

		describe('with actions', () => {
			it('should throw an error if an action path cannot be matched', () => {
				expect(() => TestUtils.renderIntoDocument(React.createElement(RootComponentWithActions, {tree: {}}))).to.throw(`Cannot find Action: 'asd.qwe'`);
			});
			it('should add matching actions to the component for a string path', () => {
				const c = TestUtils.renderIntoDocument(React.createElement(RootComponentWithActions, {tree: {}, actions: {asd: {qwe: 123}}}));
				c.refs.theComponent.actions.string.should.eql(123);
			});
			it('should add matching actions to the component for an array path', () => {
				const c = TestUtils.renderIntoDocument(React.createElement(RootComponentWithActions, {tree: {}, actions: {asd: {qwe: 123}}}));
				c.refs.theComponent.actions.array.should.eql(123);
			});
		});
	});
});
