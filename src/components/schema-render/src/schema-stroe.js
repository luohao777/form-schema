import Vue from 'vue'
const SchemaStore = function(ele, initialState = {}) {
  this.body = ele

  this.states = {
		api: '',
    sortOrder: null,
    data: null,
		schema: null,
		batch: false,
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

export default SchemaStore
