
# mowgli


##### Thin React application layer framework around Cortex


Tree initialised with a single JS object:
```
const tree = new Tree({
	text: 'Oh hey!'
});
```

Define actions that interact with the tree:
```
const actions = {
	setText: (val) => state.text.set(val)
};
```

Render your application passing in the tree and the actions:
```
const RootComponent = React.render(
	App({tree: tree, actions: actions}),
	document.body
);
```

Re-render the application if the tree changes:
```
tree.on('update', function(data) {
	RootComponent.setProps({tree: data});
});
```

Read the tree by declaratively defining 'data' in your components:
```
React.createClass({
	data: {
		theText: 'text'
	},

	render: function() {
		return p({}, this.state.theText);
	}
});
```

Trigger updates by declaratively defining 'actions' in your components:
```
React.createClass({
	actions: {
		'updateText': 'setText'
	},

	render: function() {
		return button({
			onClick: this.actions.updateText('I am mowgli Jim')
		}, 'Update the text');
	}
});
```

Both the tree and the actions can be defined in an arbitrary object structure:
```
const tree = new Tree({
	myNamespace: {
		text: 'Get ready for the show...',
		list: ['3', '2', '1', 'BOOM']
	}
});
```

And accessed via an array or fullstop separated string:
```
React.createClass({
	data: {
		theText: 'myNamespace.text',
		theList: ['myNamespace', 'list']
	},

	render: function() {
		return div({},
			h3({}, this.state.theText),
			this.state.theList.map((item, i) =>
				p({}, item)
			),
		);
	}
});
```
