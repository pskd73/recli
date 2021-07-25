const states = [];
let idx = 0;
const idxToComp = {};
let currentRenderIdx = 0;

const render = (i, Comp) => {
  if (!Comp) {
    Comp = idxToComp[i];
  } else {
    idxToComp[i] = Comp; 
  }
  currentRenderIdx = i;
  idx = i;
  const c = Comp();
  c.render();
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

const mount = (Comp) => {
  return render(idx, Comp);
}

module.exports = {
  useState,
  mount
}
