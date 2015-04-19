'use strict';

import React from 'react/addons';

import RootMixin from './RootMixin';

export default React.createClass({
	displayName: 'RootComponent',

	mixins: [RootMixin],

	render: function() {
		return React.createElement('div', {}, this.props.children);
	}
});
