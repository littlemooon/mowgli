
# The Tree

The tree is a single object that stores the entire state of the application. It is conceptually similar to the atom in Om and related frameworks.

Mowgli is tree implementation agnostic and currently supports Cortex, Baobab, Immstruct, React-Cursor and JSON.

Initialise the tree as a single piece of JSON to get started:
```javascript
const tree = {
	namespace: {
		text: 'Get ready for the show...',
		list: ['3', '2', '1', 'BOOM']
	}
};
```

Make sure the root component implements the RootMixin:
```javascript
import {RootMixin} from 'mowgli';

const App = React.createClass({
	mixins: [RootMixin],

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
```

Read the application state by declaratively defining paths through the tree in your components. The data will be added to the component state using the name you provide in the 'data' object:
```javascript
import {Mixin} from 'mowgli';

const Component = React.createClass({
	mixins: [Mixin],

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

Define actions that interact with the tree. Remember to trigger a rerender of the application by passing the updated tree into the root component:
```javascript
const actions = {
	setText: (val) => {
		tree.namespace.text.set = val;
		RootComponent.setProps({tree: tree});
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
import {Mixin} from 'mowgli';

const Component = React.createClass({
	mixins: [Mixin],

	actions: {
		'updateText': 'setText'
	},

	render: function() {
		return button({
			onClick: this.actions.updateText('I am jungle Jim')
		}, 'Update the text');
	}
});
```

Perform any server calls from within an action:
```javascript
const actions = {
  list: {
    get: () => {
      service.get()
        .then(res => {
          tree.namespace.list.value = res.body;
          tree.namespace.list.loading = false;
          RootComponent.setProps({tree: tree});
        });
    }
  }
};
```
