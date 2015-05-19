'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _getCursorFns$reducePaths$mapObj$throwError$debounce = require('junglejs-common');

'use strict';

// know if we are on the client or the server
var isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');
var cursorFns = undefined;

exports['default'] = {
	contextTypes: {
		tree: _React2['default'].PropTypes.object,
		actions: _React2['default'].PropTypes.object,
		cursorFns: _React2['default'].PropTypes.object
	},

	componentWillMount: function componentWillMount() {
		var tree = this.context && this.context.tree;
		if (!tree) _getCursorFns$reducePaths$mapObj$throwError$debounce.throwError('No tree has been passed to your root component');
		var actions = this.context && this.context.actions;

		var cursorDefs = this.data;
		var actionDefs = this.actions;
		cursorFns = _getCursorFns$reducePaths$mapObj$throwError$debounce.getCursorFns(tree);

		// add the declared actions to the component
		this.actions = getActions(actionDefs, actions);

		// get a map of initial cursors pointing to subsets of the tree
		var cursors = getCursors(cursorDefs, tree);

		// get an array of subscriptions to be applied
		this._subscriptions = getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		var subscribe = function subscribe(s) {
			return cursorFns.on(s.cursor, s.subscribe);
		};
		this._subscriptions.forEach(subscribe);

		// add the cursor values to the component state
		var cursorValues = getCursorValues(cursors);
		this.setState(cursorValues);
	},

	componentWillReceiveProps: function componentWillReceiveProps() {
		var tree = this.context = this.context.tree;
		var cursorDefs = this.data;

		// update cursor values
		var cursorValues = getCursorValues(getCursors(cursorDefs, tree));
		this.setState(cursorValues);
	},

	componentWillUnmount: function componentWillUnmount() {
		// unsubscribe from all changes to the tree
		var unsubscribe = function unsubscribe(s) {
			return cursorFns.off && cursorFns.off(s.cursor, s.subscribe);
		};
		this._subscriptions.forEach(unsubscribe);
	}
};

// get a map of cursors pointing to subsets of the tree
var getCursors = function getCursors(cursorDefs, tree) {
	return _getCursorFns$reducePaths$mapObj$throwError$debounce.reducePaths(cursorDefs, tree, cursorFns.get);
};

// get a map of cursor values
var getCursorValues = function getCursorValues(cursors) {
	return _getCursorFns$reducePaths$mapObj$throwError$debounce.mapObj(cursors, function (cursor) {
		return cursorFns.value(cursor);
	});
};

// get a map of actions pointing to actions in the context
var getActions = function getActions(actionDefs, actions) {
	return _getCursorFns$reducePaths$mapObj$throwError$debounce.reducePaths(actionDefs, actions, false, 'Action');
};

// get an array of all subscriptions to apply
var getSubscriptions = function getSubscriptions(component, cursors) {
	// render from root on the server
	if (!isBrowser || !cursorFns.on) {
		return [];
	} // return an array of subscription functions that update tree on change
	return Object.keys(cursors).map(function (key) {
		return {
			cursor: cursors[key],
			subscribe: _getCursorFns$reducePaths$mapObj$throwError$debounce.debounce(function () {
				return component.setState(_defineProperty({}, key, cursorFns.value(cursors[key])));
			})
		};
	});
};
module.exports = exports['default'];