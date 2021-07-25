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
  let _props = undefined;
  let pos = undefined;
  if (compProps[i]) {
    _props = compProps[i];
    const {x, y, w, h} = _props;
    pos = {x, y, w, h};
  }
  const c = Comp(compProps[i]);
  renderComp(c, mount, pos);
  return c;
}

const useState = (initValue) => {
  let state = states[idx] === undefined ? initValue : states[idx];
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
  let changed = true;
  if (oldDeps) {
    changed = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
  }
  states[idx] = deps;
  if (changed) fn();
  idx++;
}

const useJsonState = (initValue) => {
  const [json, setRawJson] = useState(JSON.stringify(initValue));

  const setJson = (json) => {
    setRawJson(JSON.stringify(json));
  }

  return [JSON.parse(json), json, setJson];
}

const mount = (Comp, props) => {
  return render(idx, Comp, props);
}

module.exports = {
  useState,
  useEffect,
  useJsonState,
  mount
}
