const forgotPasswordRequests = {}; // Store request timestamps

document.getElementById('resetPassword').addEventListener('click', () => {
    const identifier = document.getElementById('identifier').value;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (forgotPasswordRequests[identifier] && (now - forgotPasswordRequests[identifier]) < oneDay) {
        document.getElementById('message').textContent = 'You can only request a password reset once a day.';
        return;
    }

    forgotPasswordRequests[identifier] = now;

    // Simulate sending reset instructions (replace with your actual backend logic)
    console.log(`Reset instructions sent to: ${identifier}`);
    document.getElementById('message').textContent = 'Reset instructions sent. Please check your email or phone.';
});

document.getElementById('generatePassword').addEventListener('click', () => {
    const password = generateRandomPassword();
    document.getElementById('identifier').value = password;
});

function generateRandomPassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let password = '';

    for (let i = 0; i < 6; i++) {
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    }

    // Shuffle the password to mix uppercase and lowercase
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password.substring(0, 12); //return 12 char password.
}