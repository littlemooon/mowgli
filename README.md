
# The Tree

The tree is a single immutable object that stores the entire state of the application. It is conceptually equivalent to the atom in Om and related frameworks.

Initialise with a single JS object:
```javascript
const tree = new Tree({
	namespace: {
		text: 'Get ready for the show...',
		list: ['3', '2', '1', 'BOOM']
	}
});
```

Make sure the root component implements the RootComponentMixin:
```javascript
import {RootComponentMixin} from 'mowgli';

const App = React.createClass({
	mixins: [RootComponentMixin],

	render: function() {
		return ...;
	}
});
```

Then pass the whole tree into the root component as a prop:
```javascript
const RootComponent = React.render(
	App({tree: tree}),
	document.body
);

Read the application state by declaratively defining paths through the tree in your components. The data will be added to the component state using the name you provide in the 'data' object:
```javascript
React.createClass({
	data: {
		theText: 'namespace.text'
	},

	render: function() {
		return p({}, this.state.theText);
	}
});
```

# Actions

An actions object should be created to define interactions with the tree. This will be the only means of interacting with the application state to ensure a unidirectional data flow.

Define actions that interact with the tree:
```javascript
const actions = {
	setText: (val) => tree.text.set(val)
};
```

Pass the actions into the root component:
```javascript
const RootComponent = React.render(
	App({tree: tree, actions: actions}),
	document.body
);
```

Access actions by declaratively defining paths through the actions object in your components. The functions will be added to the 'actions' object using the name you provide in the 'actions' config object:
```javascript
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

Perform any server calls from within an action:
```javascript
const actions = {
  list: {
    get: () => {
      tree.list.loading.set('true');
      service.get()
        .then(res => {
          tree.list.value.set(res.body);
          tree.list.loading.set('false');
        });
    }
  }
};
```
