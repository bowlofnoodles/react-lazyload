/**
 * @fileOverview Find scroll parent
 */

// node为react-lazyload套的一个外壳的div
export default (node) => {
  // 防御性代码
  if (!(node instanceof HTMLElement)) {
    return document.documentElement;
  }

  const excludeStaticParent = node.style.position === 'absolute';
  const overflowRegex = /(scroll|auto)/;
  let parent = node;

  while (parent) {
    if (!parent.parentNode) { // 如果没有父节点则返回html根节点
      return node.ownerDocument || document.documentElement;
    }

    const style = window.getComputedStyle(parent);
    const position = style.position;
    const overflow = style.overflow;
    const overflowX = style['overflow-x'];
    const overflowY = style['overflow-y'];

    if (position === 'static' && excludeStaticParent) { // 父节点静态定位，子节点绝对定位
      parent = parent.parentNode;
      continue;
    }

    if (overflowRegex.test(overflow) && overflowRegex.test(overflowX) && overflowRegex.test(overflowY)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return node.ownerDocument || node.documentElement || document.documentElement;
};
