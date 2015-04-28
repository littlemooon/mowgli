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