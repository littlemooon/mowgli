'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

'use strict';

exports['default'] = {
	propTypes: {
		tree: _React2['default'].PropTypes.object.isRequired,
		actions: _React2['default'].PropTypes.object
	},

	childContextTypes: {
		tree: _React2['default'].PropTypes.object,
		actions: _React2['default'].PropTypes.object
	},

	getChildContext: function getChildContext() {
		return {
			tree: this.props.tree,
			actions: this.props.actions
		};
	}
};
module.exports = exports['default'];
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Mixin = require('./Mixin');

var _Mixin2 = _interopRequireDefault(_Mixin);

var _RootMixin = require('./RootMixin');

var _RootMixin2 = _interopRequireDefault(_RootMixin);

'use strict';

exports['default'] = {
	Mixin: _Mixin2['default'],
	RootMixin: _RootMixin2['default']
};
module.exports = exports['default'];
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _getCursorFns$reducePaths$mapObj = require('the-jungle-common');

'use strict';

// know if we are on the client or the server
var isBrowser = !(global && Object.prototype.toString.call(global.process) === '[object process]');
var cursorFns = undefined;

exports['default'] = {
	contextTypes: {
		tree: _React2['default'].PropTypes.object,
		actions: _React2['default'].PropTypes.object
	},

	componentWillMount: function componentWillMount() {
		var tree = this.context && this.context.tree;
		var cursorDefs = this.data;
		var actions = this.context && this.context.actions;
		var actionDefs = this.actions;
		cursorFns = _getCursorFns$reducePaths$mapObj.getCursorFns(tree);

		// get a map of initial cursors pointing to subsets of the tree
		var cursors = getCursors(cursorDefs, tree);

		// get an array of subscriptions to be applied
		this._subscriptions = getSubscriptions(this, cursors);

		// subscribe to the update event for each cursor
		var subscribe = function subscribe(s) {
			return cursorFns.on && cursorFns.on(s.cursor, s.subscribe);
		};
		this._subscriptions.forEach(subscribe);

		// add the declared actions to the component
		this.actions = getActions(actionDefs, actions);

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
	return _getCursorFns$reducePaths$mapObj.reducePaths(cursorDefs, tree, 'Cursor', cursorFns.get);
};

// get a map of cursor values
var getCursorValues = function getCursorValues(cursors) {
	return _getCursorFns$reducePaths$mapObj.mapObj(cursors, function (cursor) {
		return cursorFns.value(cursor);
	});
};

// get a map of actions pointing to actions in the context
var getActions = function getActions(actionDefs, actions) {
	return _getCursorFns$reducePaths$mapObj.reducePaths(actionDefs, actions, 'Action');
};

// get an array of all subscriptions to apply
var getSubscriptions = function getSubscriptions(component, cursors) {
	// do not subscribe to anything on the server (rerender from root)
	if (!isBrowser) {
		return [];
	} // return an array of subscription functions that update tree on change
	return Object.keys(cursors).map(function (key) {
		return {
			cursor: cursors[key],
			subscribe: function subscribe() {
				return component.setState(_defineProperty({}, key, cursorFns.value(cursors[key])));
			}
		};
	});
};
module.exports = exports['default'];
