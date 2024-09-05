// Clear all children from a given node
export const clearChildren = (node) => {
  while (node.firstChild) {
  node.removeChild(node.lastChild);
  };
};