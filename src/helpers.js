'use strict';

export default {
	getCursorFns: cursor => {
		switch(cursor.constructor.name) {
			case 'Cortex':
				return cursorFns.cortex;
			case 'Baobab':
				return cursorFns.baobab;
			default:
				return cursorFns.default;
		}
	},

	reducePaths: function(paths, tree, desc, getFn) {
		// dont get rekt
		if (!paths) return {};
		if (!tree) throw new Error(`No ${desc}s have been passed to your root component`);

		// return a map of each path through the tree
		return this.mapObj(paths, val => this.navigatePath(val, tree, desc, getFn));
	},

	navigatePath: (path, tree, desc, getFn) => {
		return pathAsArray(path).reduce((obj, key) => {
			// if we have been given a getter then use it, otherwise treat as an object
			const value = obj && (getFn ? getFn(obj, key) : obj[key]);

			if (value === undefined) console.warn(`${desc} '${path}' (key: '${key}') cannot be found`);

			// return null if not found
			return !obj || value === undefined ? null : value;
		}, tree);
	},

	mapObj: (obj, fn) => {
		return Object.keys(obj).reduce((acc, key) => {
			acc[key] = fn(obj[key], key);
			return acc;
		}, {});
	},

	callIfFunction: (obj, ...args) => typeof obj === 'function' ? obj(...args) : obj
};

const pathAsArray = (path) => path.constructor === Array ? path : path.split('.');

// define api for different tree implementations
const cursorFns = {
	cortex: {
		get: (x, key) => x[key],
		value: x => x.val()
	},
	baobab: {
		get: (x, key) => x.select(key),
		value: x => x.get(),
		on: (x, cb) => x.on('update', cb),
		off: (x, cb) => x.off('update', cb)
	},
	immstruct: {
		get: (x, key) => x.cursor(key),
		value: x => x.deref(),
		on: (x, cb) => x.on('swap', cb),
		off: (x, cb) => x.off('swap', cb)
	},
	reactCursor: {
		get: (x, key) => x.refine(key),
		value: x => x.value
	},
	default: {
		get: (x, key) => x[key],
		value: x => x
	}
};
