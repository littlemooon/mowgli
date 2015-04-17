
React = require 'react/addons'
{app, SidewaysDataMixin} = require 'super-glue'

module.exports = React.createClass
	displayName:  'ListItem'

	propTypes:
		fruit: React.PropTypes.object.isRequired

	render: ->
		React.createElement 'div', {},
