
'use strict';

import React from 'react/addons';
import request from 'blueagent';
import {State} from 'mowgli';

const App = React.createFactory(require('./app/App'));

// define initial data
const tree = new State({
  title: {
    text: 'Have some fruit!'
  },
  list: {
    value: [],
    loading: false
  }
});

// define actions on data
const actions = {
  list: {
    get: () => {
      tree.list.loading.set('true');
      request.get('http://localhost:3000/api/list')
        .then(res => {
          tree.list.value.set(res.body);
          tree.list.loading.set('false');
        })
        .catch(err => console.log('get failed', err));
    },
    create: (item) => {
      request.post('http://localhost:3000/api/list')
        .send(item)
        .withCredentials()
        .then(res => tree.list.value.push(res.body))
        .catch(err => console.log('post failed', err));
    }
  }
};

// render application passing in initial data and actions
const RootComponent = React.render(
  App({tree: tree, actions: actions}),
  document.body
);

// watch for changes to the state and rerender the root component
tree.on('update', function(newTree) {
  RootComponent.setProps({tree: newTree});
});
