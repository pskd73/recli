const { TextBox } = require("./textbox");

const renderComp = (comp, mount) => {
  if (comp.render) {
    comp.render();
    return;
  }
  if (comp.textbox) {
    t = TextBox(comp.textbox);
    t.render();
  }
  if (comp.children) {
    comp.children.forEach((children) => {
      const {component, props} = children;
      mount(component, props);
    });
  }
}

module.exports = {
  renderComp
};
