const Row = (cells, x, y) => {
  let prevX = x;
  return cells.map((cell) => {
    const {component, w, h, props} = cell;
    const ret = {
      component,
      props: {
        ...props,
        x: prevX,
        y, w, h
      }
    }
    prevX += w;
    return ret;
  });
};

module.exports = {
  Row
};
