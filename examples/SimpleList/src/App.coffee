
React = require 'react/addons'
{RootViewMixin} = require 'super-glue'

Header = React.createFactory require('./Header')
List = React.createFactory require('./List')

module.exports = React.createClass
	displayName:  'App'

	mixins: [RootViewMixin]

	render: ->
		React.createElement 'div', {},
			Header()
			List()
