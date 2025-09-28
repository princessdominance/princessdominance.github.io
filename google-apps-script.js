// Google Apps Script Code for Contact Form
// Save this code in Google Apps Script and deploy it as a web app
// Instructions:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Replace the existing code with this code
// 4. Update the SHEET_ID and SHEET_NAME variables below
// 5. Deploy the script as a web app (Execute as: Me, Who has access: Anyone)
// 6. Copy the deployment URL and replace YOUR_SCRIPT_ID in the contact.html file

function doPost(e) {
  try {
    // Open the Google Sheet (replace with your actual Sheet ID)
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
    const SHEET_NAME = 'Contact_Responses';

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);

      // Add headers
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Name', 'Email', 'Service']]);

      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#FF69B4');
      headerRange.setFontColor('white');
    }

    // Get the data from the POST request
    const data = JSON.parse(e.postData.contents);

    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.service
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error:', error);

    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script is working
function testScript() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    service: 'toes'
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
