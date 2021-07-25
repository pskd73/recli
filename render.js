const { terminal } = require("terminal-kit");
const { TextBox } = require("./textbox");

const renderComp = (comp, mount, position) => {
  if (comp.render) {
    comp.render();
    return;
  }
  if (comp.textbox) {
    if (Object.values(position).some((x) => x === undefined || x === null)) {
      throw new Error(`{x, y, w, h} need to be there in the props of every component`);
    }
    t = TextBox({...comp.textbox, ...position});
    t.render();
  }
  if (comp.children) {
    comp.children.forEach((children) => {
      const {component, props} = children;
      mount(component, props);
    });
  }
  terminal.moveTo(terminal.width - 1, terminal.height - 1);
}

module.exports = {
  renderComp
};
