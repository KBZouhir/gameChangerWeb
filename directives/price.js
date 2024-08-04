// directives/price.js
export default {
    mounted(el) {
      el.addEventListener('input', () => {
        let value = el.value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
  
        if (parts[1] && parts[1].length > 2) {
          value = `${parts[0]}.${parts[1].slice(0, 2)}`;
        }
  
        el.value = value;
        el.dispatchEvent(new Event('input'));
      });
    }
  };
  