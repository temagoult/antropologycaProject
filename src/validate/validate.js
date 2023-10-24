const MOBILEREG=  /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
// eslint-disable-next-line no-unused-vars
const phone=  {
 methode:{
 
    // eslint-disable-next-line no-unused-vars
    getMessage(field, args) {
        return `The ${field} must be either a valid phone number `;
      },

   
    // eslint-disable-next-line no-unused-vars
    validate(value, args) {
  
  
      // Check for either of these to return true
     return MOBILEREG.test(value);
    }
  }};