
'use strict';

import React from 'react/addons';
import {Mixin} from 'neocortex';

const h4 = React.createFactory('h4');

export default React.createClass({
	displayName: 'Title',

	mixins: [Mixin],

	cursors: {
		text: 'title.text'
	},

	render: function() {
		return h4({}, this.state.text.val());
	}
});
