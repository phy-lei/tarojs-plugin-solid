import { createRenderEffect } from "solid-js";

export default () => {
  function model (el, value) {
    const [field, setField] = value();
    createRenderEffect(() => (el.value = field()));
    el.addEventListener("input", (e) => {
      setField(e.detail.value);
    });
  }

  return {
    model
  }
}
