import Vue from 'vue'
const SchemaStore = function(ele, initialState = {}) {
  this.body = ele

  this.states = {
    tree: [],
    sortOrder: null,
    data: null,
    schema: null,
    filters: {},
    map: null
  }

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop]
    }
  }
}

SchemaStore.prototype.getNodeName = function (node) {
  const { map } = this.states
  if (!map.hasOwnProperty(node)) {
    throw new Error(`${node} is undefined, please checkd your map config`)
  }
  const nodeInfo = map[node]
  return nodeInfo.name ? nodeInfo.name : nodeInfo
}

SchemaStore.prototype.openModal = function (data = {}, states = {}) {
  const { body } = this
  Vue.nextTick(() => body.openModal('schema', 'schema', data, states))
}

// SchemaStore.prototype.commit = function(name, ...args) {
//   const mutations = this.mutations;
//   if (mutations[name]) {
//     mutations[name].apply(this, [this.states].concat(args));
//   } else {
//     throw new Error(`Action not found: ${name}`);
//   }
// }

export default SchemaStore
