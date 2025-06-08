# EmailJS Setup Instructions

## 📧 Setting Up EmailJS for Contact Form

Your contact form is now ready to send real emails using EmailJS! Follow these steps:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup wizard to connect your email
5. **Copy the SERVICE_ID** (e.g., "service_abc123")

### Step 3: Create Email Template
1. Go to "Email Templates" 
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Submission - {{service_type}}

**Body:**
```
You have a new contact form submission from East Cobb Carts website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service Type: {{service_type}}

Message:
{{message}}

---
This email was sent automatically from your website contact form.
```

4. **Copy the TEMPLATE_ID** (e.g., "template_xyz789")

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. **Copy your PUBLIC_KEY** (e.g., "user_123abc")

### Step 5: Update Your Website
1. Open `script.js` in your website files
2. Find this line:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
3. Replace `YOUR_PUBLIC_KEY` with your actual public key

4. Find this line:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
   ```
5. Replace:
   - `YOUR_SERVICE_ID` with your service ID
   - `YOUR_TEMPLATE_ID` with your template ID

### Step 6: Test the Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox for the test message

## 🚀 Example Configuration

Your final JavaScript should look like this:

```javascript
// Initialize EmailJS
emailjs.init("user_abc123xyz"); // Your actual public key

// In the form submission:
emailjs.send('service_gmail456', 'template_contact789', templateParams)
```

## 🔧 Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify all three IDs are correct
- Make sure you're testing on a web server (not file://)

**Emails not arriving?**
- Check spam folder
- Verify email service connection in EmailJS dashboard
- Test with a different email address

**Rate limits reached?**
- Free plan: 200 emails/month
- Upgrade to paid plan if needed

## 📞 Support

If you need help with setup:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Or contact me for additional assistance

---

**Your contact form will then send real emails to: wrench@eastcobbcarts.com** 