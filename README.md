
# neocortex


##### Thin React application layer framework around Cortex


Set initial state with a single object:
```
const state = new State({
	text: 'Oh hey!'
});
```

Define actions that interact with the state:
```
const actions = {
	setText: (val) => state.text.set(val)
};
```

Render your application passing in the state and actions:
```
const RootComponent = React.render(
	App({state: state, actions: actions}),
	document.body
);
```

Rerender the application if the state object changes:
```
state.on('update', function(data) {
	RootComponent.setProps({state: data});
});
```

Read application state by declaratively defining 'cursors' in your components:
```
React.createClass({
	cursors: {
		theText: 'text'
	},

	render: function() {
		return p({}, this.state.theText.val());
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
			onClick: this.actions.updateText('I am jungle Jim'
		}, 'Update the text');
	}
});
```

Both state and actions can be defined in an arbitrary tree:
```
const state = new State({
	myNamespace: {
		text: 'Get ready for the show...',
		list: [
			'3',
			'2',
			'1',
			'BOOM'
		]
});
```

And accessed via an array or fullstop separated string:
```
React.createClass({
	cursors: {
		theText: 'myNamespace.text',
		theList: ['myNamespace', 'list']
	},

	render: function() {
		return div({},
			h3({}, this.state.theText.val()),
			this.state.theList.val().map((item, i) =>
				p({}, item)
			),
		);
	}
});
```
