const { TextBox } = require("./textbox");

const renderComp = (comp) => {
  if (comp.render) {
    comp.render();
    return;
  }
  if (comp.textbox) {
    t = TextBox(comp.textbox);
    t.render();
  }
}

module.exports = {
  renderComp
};
