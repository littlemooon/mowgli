'use strict';

import React from 'react/addons';
import {RootMixin} from 'mowgli';

const List = React.createFactory(require('./List'));

export default React.createClass({
	displayName: 'App',

	mixins: [RootMixin],

	render: function() {
		return (List());
	}
});
