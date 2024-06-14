const axios = require('axios');

const sendEmail = async (email, subject, html) => {
  const response = await axios.post('your_email_service_endpoint', {
    email,
    subject,
    html
  });

  return response.data;
};

module.exports = {
  sendEmail
};
