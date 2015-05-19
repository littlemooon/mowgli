'use strict';

import React from 'react';

import {getCursorFns, reducePaths, mapObj, throwError, debounce} from 'junglejs-common';

// know if we are on the client or the server
const isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');
let cursorFns;

export default {
	contextTypes: {
		tree: React.PropTypes.object,
		actions: React.PropTypes.object,
		cursorFns: React.PropTypes.object
	},

	componentWillMount: function() {
		const tree = this.context && this.context.tree;
		if (!tree) throwError(`No tree has been passed to your root component`);
		const actions = this.context && this.context.actions;

		const cursorDefs = this.data;
		const actionDefs = this.actions;
		cursorFns = getCursorFns(tree);

		// add the declared actions to the component
		this.actions = getActions(actionDefs, actions);

		// get a map of initial cursors pointing to subsets of the tree
		const cursors = getCursors(cursorDefs, tree);

		// get an array of subscriptions to be applied
		this._subscriptions = getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		const subscribe = s => cursorFns.on(s.cursor, s.subscribe);
		this._subscriptions.forEach(subscribe);

		// add the cursor values to the component state
		const cursorValues = getCursorValues(cursors);
		this.setState(cursorValues);
	},

	componentWillReceiveProps: function() {
		const tree = this.context = this.context.tree;
		const cursorDefs = this.data;

		// update cursor values
		const cursorValues = getCursorValues(getCursors(cursorDefs, tree));
		this.setState(cursorValues);
	},

	componentWillUnmount: function() {
		// unsubscribe from all changes to the tree
		const unsubscribe = s => cursorFns.off && cursorFns.off(s.cursor, s.subscribe);
		this._subscriptions.forEach(unsubscribe);
	}
};

// get a map of cursors pointing to subsets of the tree
const getCursors = (cursorDefs, tree) => reducePaths(cursorDefs, tree, cursorFns.get);

// get a map of cursor values
const getCursorValues = cursors => mapObj(cursors, cursor => cursorFns.value(cursor));

// get a map of actions pointing to actions in the context
const getActions = (actionDefs, actions) => reducePaths(actionDefs, actions, false, 'Action');

// get an array of all subscriptions to apply
const getSubscriptions = (component, cursors) => {
	// render from root on the server
	if (!isBrowser || !cursorFns.on) return [];

	// return an array of subscription functions that update tree on change
	return Object.keys(cursors).map(key => ({
		cursor: cursors[key],
		subscribe: debounce(() => component.setState({[key]: cursorFns.value(cursors[key])}))
	}));
};
