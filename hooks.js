const { renderComp } = require("./render");

const states = [];
const compProps = [];
let idx = 0;
const idxToComp = {};
let currentRenderIdx = 0;

const render = (i, Comp, props) => {
  if (!Comp) {
    Comp = idxToComp[i];
  } else {
    idxToComp[i] = Comp; 
  }
  if (props) {
    compProps[i] = props;
  }
  currentRenderIdx = i;
  idx = i;
  const c = Comp(compProps[i]);
  renderComp(c);
  return c;
}

const useState = (initValue) => {
  let state = states[idx] || initValue;
  let _idx = idx;
  const compIdx = currentRenderIdx;

  const setState = (value) => {
    states[_idx] = value;
    render(compIdx);
  }

  idx++;
  return [
    state,
    setState
  ]
}

const useEffect = (fn, deps) => {
  const oldDeps = states[idx];
  if (deps && JSON.stringify(deps) === JSON.stringify(oldDeps)) {
    return;
  }
  states[idx] = deps;
  fn();
  idx++;
}

const mount = (Comp, props) => {
  return render(idx, Comp, props);
}

module.exports = {
  useState,
  useEffect,
  mount
}
