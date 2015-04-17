
React = require 'react/addons'
{app, helpers} = require 'super-glue'

{object, list, listItem, value, getAction, putAction, buildCursorTree} = helpers app

# Define data structure and actions
cursors = (app) ->
	buildCursorTree null,
		object 'header', null,
			value 'heading', null
			value 'subheading', null
		list 'listItems', null,
			getAction 'getAll', -> get 'listItem'
			listItem null,
				putAction 'update', -> put "listItem/#{@data.id}", @data

# Initialize application
app.initialize
	apiUrl: 'example'
	cursors: cursors(app)

# Render root component
App = require './App'
React.render React.createElement(App), document.body
