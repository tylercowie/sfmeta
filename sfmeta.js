const button = document.getElementById('get-metadata-button');
const display = document.getElementById('metadata-display');

var YOUR_CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET
var YOUR_CLIENT_ID = process.env.YOUR_CLIENT_ID
var REDIRECT_URI = process.env.REDIRECT_URI

button.addEventListener('click', async () => {
  // Authenticate and authorize your app to access Salesforce data using the OAuth 2.0 Web Server Flow.
  // Replace YOUR_CLIENT_ID and YOUR_CLIENT_SECRET with your actual client ID and client secret.
  const response = await fetch('https://login.salesforce.com/services/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=authorization_code&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&code=${code}&redirect_uri=REDIRECT_URI`,
  });
  const { access_token } = await response.json();

  // Use the access token to retrieve flow metadata from Salesforce.
  const metadataResponse = await fetch('https://login.salesforce.com/services/data/v50.0/tooling/flows', {
    headers: { 'Authorization': `Bearer ${access_token}` },
  });
  const metadata = await metadataResponse.json();

  // Display the flow metadata in XML format on the page.
  display.innerText = metadata.map(flow => `<Flow>${flow.DeveloperName}</Flow>`).join('\n');
});
