// Create the custom directive
export default {
  mounted(el, binding, vnode) {
    el.addEventListener('input', () => {
      // Remove any non-digit characters
      let value = el.querySelector("input").value.replace(/\D/g, '');

      // Enforce maxlength of 3
      if (binding.value?.maxlength && value.length > binding.value.maxlength) {
        value = value.slice(0, 3);
      }

      // Ensure value does not exceed the max constraint
      const max = binding.value?.max;

      
      if (max && parseInt(value) > max) {
        value = max;
      }

      // Update the input's value
      el.querySelector("input").value = value;

      // Trigger the v-model update
      el.querySelector("input").value = value;
      el.querySelector("input").dispatchEvent(new Event('input'));
    });
  }
}
