'use strict';

import React from 'react/addons';
import {RootMixin} from 'neocortex';

const List = React.createFactory(require('./List'));

export default React.createClass({
	displayName: 'App',

	mixins: [RootMixin],

	render: function() {
		return (List());
	}
});
