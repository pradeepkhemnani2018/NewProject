const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkeyisnpdreamzwebapp9'; // Replace with your actual secret key

// Function to generate activation token
const generateActivationToken = (email) => {
    // Create a payload with the user's email
    const payload = {
        user: {
            email: email,
        },
    };

    // Sign the token with a secret key and set the expiration time
    const token = jwt.sign(payload, secretKey, { expiresIn: '1000h' });

    return token;
};



module.exports = {
    generateActivationToken,
    secretKey, // Export the secret key for use in other files
};
