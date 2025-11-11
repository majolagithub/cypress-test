// Programmatic login (bypass UI & OTP)
Cypress.Commands.add('programmaticLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://app.mybadisa.org/api/auth/callback/credentials', // Auth API endpoint
    form: true,
    body: {
      email,
      password
    }
  }).then((response) => {
    // Look for session cookie returned by NextAuth
    const cookies = response.headers['set-cookie'];

    if (!cookies) {
      throw new Error('No cookies found. Login may have failed.');
    }

    // Find the session cookie name
    const sessionCookie = cookies.find(c => 
      c.includes('next-auth.session-token') || c.includes('__Secure-next-auth.session-token')
    );

    if (!sessionCookie) {
      throw new Error('Session token not found in cookies');
    }

    // Extract token value
    const token = sessionCookie.split(';')[0].split('=')[1];

    // Set cookie in browser
    cy.setCookie(
      sessionCookie.includes('__Secure-') ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      token
    );
  });
});
