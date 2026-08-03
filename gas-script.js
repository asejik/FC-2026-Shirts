// ==============================================================================
// GOOGLE APPS SCRIPT FOR FC2026 T-SHIRT SHOWCASE WEBHOOK
// ==============================================================================
// Instructions:
// 1. Open your Google Sheet where orders should be logged.
// 2. Click "Extensions" -> "Apps Script" (or go to script.google.com).
// 3. Replace all default code with this entire script.
// 4. Update SHEET_ID below with your Google Sheet ID (from the sheet URL).
// 5. Click "Deploy" -> "New deployment".
// 6. Choose type: "Web app".
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 7. Click "Deploy", authorize permissions, and copy the generated Web App URL.
// 8. Add `NEXT_PUBLIC_GAS_URL=your_web_app_url` to your `.env.local` file.
// ==============================================================================

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; 
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, date, itemsString, totalItems, totalPrice } = data;

    // 1. Log order to Google Sheet
    const ss = SHEET_ID && SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID_HERE' 
      ? SpreadsheetApp.openById(SHEET_ID) 
      : SpreadsheetApp.getActiveSpreadsheet();
      
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Create column headers if the sheet is brand new/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Date',
        'Full Name',
        'Email Address',
        'Order Items Breakdown',
        'Total Units',
        'Total Price (₦)',
        'Payment Status'
      ]);
      
      // Format Header Row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground('#c8102e')
                 .setFontColor('#ffffff')
                 .setFontWeight('bold')
                 .setHorizontalAlignment('center');
      sheet.setRowHeight(1, 35);
    }

    // Append submission row
    sheet.appendRow([
      new Date(),
      date || new Date().toISOString().split('T')[0],
      name,
      email,
      itemsString,
      totalItems,
      totalPrice,
      'Pending Verification'
    ]);

    // Auto-fit column widths for neat logging
    sheet.autoResizeColumns(1, 8);

    // 2. Build Responsive HTML Email Body
    const itemsListHtml = itemsString
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-size: 14px; color: #1e293b; font-family: sans-serif;">
            ${escapeHtml(line)}
          </td>
        </tr>
      `).join('');

    const formattedTotalPrice = Number(totalPrice).toLocaleString();
    const encodedName = encodeURIComponent(name);
    const whatsappUrl = `https://wa.me/2348132191839?text=Hello%2C%20I%20have%20completed%20the%20payment%20for%20my%20FC2026%20T-Shirt%20order%20(${encodedName}).%20Here%20is%20my%20receipt:`;

    const htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FC2026 T-Shirt Order Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 20px 10px;">
          <tr>
            <td align="center">
              
              <!-- Main Email Wrapper -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #c8102e 100%); padding: 32px 24px; text-align: center;">
                    <div style="display: inline-block; width: 44px; h-44px; background-color: #c8102e; color: #ffffff; font-weight: 900; font-size: 18px; line-height: 44px; border-radius: 10px; margin-bottom: 12px; border: 2px solid rgba(255,255,255,0.3);">FC</div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; tracking-tight: -0.02em;">FC2026 T-SHIRT SHOWCASE</h1>
                    <p style="margin: 6px 0 0 0; color: #f87171; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Order Intent Confirmation</p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px 24px;">
                    
                    <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 18px; font-weight: 700;">Hello ${escapeHtml(name)},</h2>
                    <p style="margin: 0 0 24px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                      Thank you for selecting your FC2026 T-shirts! We have successfully recorded your order intent. Below is a summary of your chosen options and instructions to complete your payment.
                    </p>

                    <!-- Order Summary Card -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <h3 style="margin: 0 0 14px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</h3>
                      
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;">
                        ${itemsListHtml}
                      </table>

                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="font-size: 14px; color: #64748b; font-weight: 500;">Total Quantity:</td>
                          <td align="right" style="font-size: 14px; color: #0f172a; font-weight: 700;">${totalItems} unit(s)</td>
                        </tr>
                        <tr>
                          <td style="font-size: 16px; color: #0f172a; font-weight: 700; padding-top: 8px;">Total Amount:</td>
                          <td align="right" style="font-size: 20px; color: #c8102e; font-weight: 800; padding-top: 8px;">₦${formattedTotalPrice}</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Payment Details Card -->
                    <div style="background-color: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <h3 style="margin: 0 0 12px 0; color: #9f1239; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; items-center: center;">
                        💳 Direct Bank Transfer Instructions
                      </h3>
                      
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #334155; line-height: 1.8;">
                        <tr>
                          <td style="color: #64748b; width: 130px;">Bank Name:</td>
                          <td style="font-weight: 700; color: #0f172a;">Access Bank</td>
                        </tr>
                        <tr>
                          <td style="color: #64748b;">Account Number:</td>
                          <td style="font-weight: 800; color: #c8102e; font-size: 16px;">1219660247</td>
                        </tr>
                        <tr>
                          <td style="color: #64748b;">Account Name:</td>
                          <td style="font-weight: 700; color: #0f172a;">David Boluwatife Ipinyomi</td>
                        </tr>
                      </table>
                    </div>

                    <!-- WhatsApp CTA Card -->
                    <div style="text-align: center; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px;">
                      <h4 style="margin: 0 0 6px 0; color: #166534; font-size: 15px; font-weight: 700;">Final Step: Verification</h4>
                      <p style="margin: 0 0 16px 0; color: #15803d; font-size: 13px; line-height: 1.5;">
                        Once payment is made, please send your transfer receipt screenshot to us on WhatsApp to confirm your order.
                      </p>
                      
                      <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 10px; text-decoration: none; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                        📲 Send Receipt on WhatsApp (+2348132191839)
                      </a>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.5;">
                      FC2026 T-Shirt Showcase Platform<br>
                      If you have any questions, feel free to reply directly to this email.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send HTML Email using GmailApp / MailApp
    MailApp.sendEmail({
      to: email,
      subject: `FC2026 T-Shirt Order Confirmation - ${name}`,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to prevent HTML injection in emails
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Handle CORS Preflight Options
function doOptions(e) {
  return ContentService.createTextOutput("OK")
    .setMimeType(ContentService.MimeType.TEXT);
}
