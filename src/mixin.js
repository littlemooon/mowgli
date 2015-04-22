'use strict';

import React, {PureRenderMixin} from 'react/addons';

import {getCursorFns, reducePaths, mapObj} from './helpers';

// know if we are on the client or the server
const isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');
let cursorFns;

export default {
	contextTypes: {
		tree: React.PropTypes.object,
		actions: React.PropTypes.object
	},

	mixins: [PureRenderMixin],

	componentWillMount: function() {
		const tree = this.context && this.context.tree;
		const cursorDefs = this.data;
		const actions = this.context && this.context.actions;
		const actionDefs = this.actions;
		cursorFns = getCursorFns(tree);

		// get a map of initial cursors pointing to subsets of the tree
		const cursors = this._getCursors(cursorDefs, tree);

		// get an array of subscriptions to be applied
		this._subscriptions = this._getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		const subscribe = s => cursorFns.on && cursorFns.on(s.cursor, s.subscribe);
		this._subscriptions.forEach(subscribe);

		// add the declared actions to the component
		this.actions = this._getActions(actionDefs, actions);

		// add the cursor values to the component state
		const cursorValues = this._getCursorValues(cursors);
		this.setState(cursorValues);
	},

	componentWillReceiveProps: function() {
		const tree = this.context = this.context.tree;
		const cursorDefs = this.data;

		// update cursor values
		const cursorValues = this._getCursorValues(this._getCursors(cursorDefs, tree));
		this.setState(cursorValues);
	},

	componentWillUnmount: function() {
		// unsubscribe from all changes to the tree
		const unsubscribe = s => cursorFns.off && cursorFns.off(s.cursor, s.subscribe);
		this._subscriptions.forEach(unsubscribe);
	},

	// get a map of cursors pointing to subsets of the tree
	_getCursors: function(cursorDefs, tree) {
		return reducePaths(cursorDefs, tree, 'Cursor', cursorFns.get);
	},

	// get a map of cursor values
	_getCursorValues: function(cursors) {
		return mapObj(cursors, cursor => cursorFns.value(cursor));
	},

	// get a map of actions pointing to actions in the context
	_getActions: function(actionDefs, actions) {
		return reducePaths(actionDefs, actions, 'Action');
	},

	// get an array of all subscriptions to apply
	_getSubscriptions: function(component, cursors) {
		// do not subscribe to anything on the server (rerender from root)
		if (!isBrowser) return [];

		// return an array of subscription functions that update tree on change
		return Object.keys(cursors).map(key => ({
			cursor: cursors[key],
			subscribe: () => component.setState({[key]: cursorFns.value(cursors[key])})
		}));
	}
};
