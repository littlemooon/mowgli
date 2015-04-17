
React = require 'react/addons'
{app, SidewaysDataMixin} = require 'super-glue'

ListItem = React.createFactory require('./ListItem')

module.exports = React.createClass
	displayName:  'List'

	mixins: [SidewaysDataMixin]

	cursors:
		lists:
			fruits: app.cursors.listItems

	render: ->
		React.createElement 'div', {},
			@c.listItems.listOfSubCursors().map (item) ->
				React.createElement ListItem, {item: item}
