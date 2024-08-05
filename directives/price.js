// directives/price.js
export default {
    mounted(el) {
      el.addEventListener('input', () => {
        let value = el.querySelector('input').value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
  
        if (parts[1] && parts[1].length > 2) {
          value = `${parts[0]}.${parts[1].slice(0, 2)}`;
        }
        
        el.querySelector('input').value = (value == "") ? 0 : value;
        el.querySelector('input').dispatchEvent(new Event('input'));
      });
    }
  };
  