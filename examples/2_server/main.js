'use strict';

import React from 'react/addons';
import request from 'blueagent';

const App = React.createFactory(require('./app/App'));

// define initial data
let tree = {
  title: {
    text: 'Have some fruit!'
  },
  list: {
    value: [],
    loading: true
  }
};

// define actions on data
const actions = {
  list: {
    get: () => {
      request.get('http://localhost:3000/api/list')
        .then(res => {
          tree.list.value = res.body;
          tree.list.loading = false;
          reRender();
        })
        .catch(err => console.log('get failed', err));
    },
    create: (item) => {
      request.post('http://localhost:3000/api/list')
        .send(item)
        .withCredentials()
        .then(res => {
          tree.list.value.push(res.body);
          reRender();
        })
        .catch(err => console.log('post failed', err));
    }
  }
};

// render application passing in initial data and actions
const RootComponent = React.render(
  App({tree: tree, actions: actions}),
  document.body
);

function reRender() {
  RootComponent.setProps({tree: tree});
}
