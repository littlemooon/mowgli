'use strict';

import React, {PureRenderMixin} from 'react/addons';

// know if we are on the client or the server
const isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');

export default {
	contextTypes: {
		tree: React.PropTypes.object,
		actions: React.PropTypes.object
	},

	mixins: [PureRenderMixin],

	componentWillMount: function() {
		const tree = this.context && this.context.tree;
		const cursorDefs = this.cursors;
		const actions = this.context && this.context.actions;
		const actionDefs = this.actions;

		// get a map of initial cursors pointing to subsets of the state
		const cursors = this._getCursors(cursorDefs, tree);

		// get an array of subscriptions to be applied
		this._subscriptions = this._getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		// TODO: Cortex does not support nested events
		// this._subscriptions.forEach(this._subscribe__).bind(this);

		// add the declared actions to the component
		this.actions = this._getActions(actionDefs, actions);

		// add the cursor values to the component state
		const cursorValues = this._getCursorValues(cursors);
		this.setState(cursorValues);
	},

	componentWillReceiveProps: function() {
		const tree = this.context = this.context.tree;
		const cursorDefs = this.cursors;

		// update cursor values
		const cursorValues = this._getCursorValues(this._getCursors(cursorDefs, tree));
		this.setState(cursorValues);
	},

	componentWillUnmount: function() {
		// unsubscribe from all changes to the state
		// TODO: Cortex does not support nested events
		// this._subscriptions.forEach(this._unsubscribe__).bind(this);
	},

	// get a map of cursors pointing to subsets of the state
	_getCursors: function(declaredCursors, tree) {
		return this._getNestedObjectForEachKey(declaredCursors, tree, 'Cursor');
	},

	// get a map of cursor values
	_getCursorValues: function(cursors) {
		return Object.keys(cursors).reduce((acc, key) => {
			acc[key] = cursors[key].val();
			return acc;
		}, {});
	},

	// get a map of actions pointing to actions in the context
	_getActions: function(declaredActions, actions) {
		return this._getNestedObjectForEachKey(declaredActions, actions, 'Action');
	},

	// determine whether any object values have changed
	_shallowDiff: function(obj, otherObj) {
		return Object.keys(obj).reduce((acc, key) => {
			return acc || obj[key] !== otherObj[key];
		}, false);
	},

	// get an array of all subscriptions to apply
	_getSubscriptions: function(component, cursors) {
		// do not subscribe to anything on the server (rerender from root)
		if (!isBrowser) return [];

		// return an array of subscription functions that update state on change
		return Object.keys(cursors).map(key => ({
			cursor: cursors[key],
			subscribe: () => component.setState({[key]: cursors[key]})
		}));
	},

	// bind update event on cursor to subscription function
	_subscribe__: function(subscription) {
		subscription.cursor.on('update', subscription.subscribe);
	},

	// remove the bound update event from the cursor
	_unsubscribe__: function(subscription) {
		subscription.cursor.off('update', subscription.subscribe);
	},

	// get a map of each key to the subtree identified by the path value
	_getNestedObjectForEachKey: function(keyObj, treeObj, errorDesc) {
		// check yourself
		if (!keyObj) return {};
		if (!treeObj) throw new Error(`No ${errorDesc}s have been passed to your root component`);

		// return a map of keys to nested object
		return Object.keys(keyObj).reduce((acc, key) => {
			acc[key] = this._getNestedObjectFromPath(keyObj[key], treeObj, errorDesc);
			return acc;
		}, {});
	},

	// return the subtree identified by following the given path
	_getNestedObjectFromPath: function(path, treeObj, errorDesc) {
		// split path into an array
		const pathArray = path.constructor === Array ? path : path.split('.');

		// navigate the object via the path array and return the result
		return pathArray.reduce((tree, key) => {
			const subTree = tree && tree[key];

			// handle not found case
			if (tree && subTree === undefined) {
				console.warn(`${errorDesc} ${path} (key: ${key}) cannot be found`);
				return null;
			}

			return subTree;
		}, treeObj);
	}
};
