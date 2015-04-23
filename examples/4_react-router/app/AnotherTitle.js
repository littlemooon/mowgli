
'use strict';

import React from 'react/addons';
import {Mixin} from 'mowgli';

const h4 = React.createFactory('h4');

export default React.createClass({
	displayName: 'AnotherTitle',

	mixins: [Mixin],

	data: {
		text: 'anotherTitle.text'
	},

	render: function() {
		return h4({}, this.state.text);
	}
});
