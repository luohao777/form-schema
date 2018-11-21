
const SchemaStore = function(ele, initialState = {}) {
  this.schema = ele

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

export default SchemaStore
