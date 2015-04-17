
React = require 'react/addons'
{app, SidewaysDataMixin} = require 'super-glue'

module.exports = React.createClass
	displayName:  'Header'

	mixins: [SidewaysDataMixin]

	cursors:
		values:
			heading: app.cursors.header.heading
			subheading: app.cursors.header.subheading

	render: ->
		React.createElement 'div', {},
			React.createElement 'h1', @c.heading
			React.createElement 'h3', @c.subheading
