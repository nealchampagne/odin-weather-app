export const clearChildren = (node) => {
  while (node.firstChild) {
  node.removeChild(node.lastChild);
  };
};