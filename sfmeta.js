const button = document.getElementById('get-metadata-button');
const display = document.getElementById('metadata-display');

button.addEventListener('click', async () => {
  // Authenticate and authorize your app to access Salesforce data using the OAut>
  // Replace YOUR_CLIENT_ID and YOUR_CLIENT_SECRET with your actual client ID and>
  const response = await fetch('https://login.salesforce.com/services/oauth2/toke>
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=authorization_code&client_id=YOUR_CLIENT_ID&client_secret=Y>
  });
  const { access_token } = await response.json();

  // Use the access token to retrieve flow metadata from Salesforce.
  const metadataResponse = await fetch('https://login.salesforce.com/services/dat>
    headers: { 'Authorization': `Bearer ${access_token}` },
  });
  const metadata = await metadataResponse.json();

  // Display the flow metadata in XML format on the page.
  display.innerText = metadata.map(flow => `<Flow>${flow.DeveloperName}</Flow>`).>
});
