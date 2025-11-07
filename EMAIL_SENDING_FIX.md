# Debugging "Failed to Send Email" Error on Vercel

You're getting a 500 error with "failed to send email" message. This guide will help you fix it.

## Quick Diagnosis (Do This First!)

Visit this URL on your Vercel deployment:
```
https://saaskit-delta.vercel.app/api/test-email
```

This will tell you EXACTLY what's wrong with your email configuration.

---

## Common Causes & Solutions

### Issue 1: Missing Environment Variables (Most Common)

**Symptoms:**
- Error: "SMTP not configured"
- Error: "Missing SMTP environment variables"
- Test endpoint shows `missing: ["SMTP_HOST", "SMTP_USER", ...]`

**Solution:**

1. **Go to Vercel Dashboard**
   - https://vercel.com/your-project
   - Settings → Environment Variables

2. **Add these variables:**

```
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ed16a21a6a2ec0
SMTP_PASS=e25add19747511
SMTP_FROM=AI SaaS <noreply@aisaas.com>
ADMIN_EMAIL=ekram@gmail.com
```

3. **Important Settings:**
   - Environment: Select **Production** (and Preview if you want)
   - **Save each variable**

4. **Redeploy:**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - ✅ Wait for deployment to complete

5. **Test again:**
   - Visit: `https://saaskit-delta.vercel.app/api/test-email`
   - Should see: `"success": true`

---

### Issue 2: Mailtrap Blocking Vercel IPs

**Symptoms:**
- Test endpoint shows connection timeout or refused
- Error: "ETIMEDOUT" or "ECONNREFUSED"
- Works locally but not on Vercel

**Why:** Some SMTP providers block cloud hosting IPs to prevent spam.

**Solutions:**

#### Option A: Use Vercel-Friendly Email Service (Recommended)

Switch to an email service that works well with Vercel:

**1. Resend (Recommended - Made for Vercel)**
```bash
npm install resend
```

```env
# In Vercel environment variables
RESEND_API_KEY=re_your_api_key
```

Update `src/lib/email.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(options: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: options.from || 'onboarding@resend.dev',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    return { success: false, error };
  }
}
```

**2. SendGrid**
```env
SENDGRID_API_KEY=SG.your_api_key
```

**3. AWS SES**
```env
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY=your_access_key
AWS_SES_SECRET_KEY=your_secret_key
```

#### Option B: Whitelist Vercel IPs in Mailtrap

1. Contact Mailtrap support
2. Ask to whitelist Vercel's IP ranges
3. Provide your project URL

#### Option C: Use Mailtrap's Production Service

Mailtrap Sandbox is for testing only. Use their production service:

1. Go to https://mailtrap.io
2. Create a Production stream
3. Get production SMTP credentials
4. Update Vercel environment variables

---

### Issue 3: Authentication Failed

**Symptoms:**
- Error: "authentication failed"
- Error: "Invalid login"
- Test endpoint says auth error

**Solution:**

1. **Verify credentials are correct:**
   ```bash
   # Test locally first
   export SMTP_USER="your-user"
   export SMTP_PASS="your-pass"
   npm run dev
   # Visit: http://localhost:3000/api/test-email
   ```

2. **If local works but Vercel doesn't:**
   - Check for typos in Vercel environment variables
   - Make sure no extra spaces in values
   - Try copy-pasting credentials again

3. **Check Mailtrap:**
   - Login to Mailtrap
   - Go to your inbox → SMTP Settings
   - Copy credentials exactly as shown

---

### Issue 4: Port or Connection Issues

**Symptoms:**
- Error: "Connection timeout"
- Error: "ETIMEDOUT"
- Long wait then error

**Solution:**

Try different SMTP ports:

```env
# Try port 2525 instead of 587
SMTP_PORT=2525
SMTP_SECURE=false
```

Or try port 465 with SSL:
```env
SMTP_PORT=465
SMTP_SECURE=true
```

---

## Step-by-Step Debugging

### Step 1: Check Environment Variables

Visit:
```
https://saaskit-delta.vercel.app/api/test-email
```

**If it shows missing variables:**
- Add them in Vercel Dashboard
- Redeploy
- Test again

### Step 2: Check SMTP Connectivity

Look at the error details from test-email endpoint:

**Error: "ECONNREFUSED"**
→ SMTP server refusing connection
→ Check SMTP_HOST and SMTP_PORT

**Error: "ETIMEDOUT"**
→ Connection timeout
→ Try different port (2525 or 465)
→ Or switch email service

**Error: "auth"**
→ Authentication failed
→ Check SMTP_USER and SMTP_PASS

### Step 3: Check Vercel Logs

1. Go to Vercel Dashboard
2. Click on your deployment
3. Click "Logs" tab
4. Look for lines starting with:
   ```
   📧 Sending promotional email...
   ❌ Failed to send to...
   ```

### Step 4: Test Locally with Production Env

```bash
# Copy .env from Vercel
vercel env pull

# Start local server
npm run dev

# Test locally
curl http://localhost:3000/api/test-email
```

If it works locally but not on Vercel → IP blocking issue (see Issue 2)

---

## Recommended Fix for Vercel

The **easiest and most reliable solution** is to use Resend:

### Quick Setup with Resend (5 minutes)

1. **Sign up for Resend:**
   - Go to https://resend.com
   - Free tier: 100 emails/day
   - Sign up with your email

2. **Get API Key:**
   - Dashboard → API Keys
   - Create API Key
   - Copy it

3. **Install Resend:**
   ```bash
   npm install resend
   ```

4. **Update Vercel Environment Variables:**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Update src/lib/email.ts:**
   ```typescript
   // At the top
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   // Replace sendEmail function
   export async function sendEmail(options: SendEmailOptions) {
     try {
       const { data, error } = await resend.emails.send({
         from: options.from || 'onboarding@resend.dev',
         to: Array.isArray(options.to) ? options.to : [options.to],
         subject: options.subject,
         html: options.html,
       });

       if (error) {
         console.error('Resend error:', error);
         return { success: false, error };
       }

       console.log('✅ Email sent:', data?.id);
       return { success: true, messageId: data?.id };
     } catch (error) {
       console.error('Email error:', error);
       return { success: false, error };
     }
   }
   ```

6. **Deploy:**
   ```bash
   git add .
   git commit -m "Switch to Resend for email"
   git push
   ```

7. **Test:**
   ```
   https://saaskit-delta.vercel.app/api/test-email
   ```

**Done!** Resend works perfectly with Vercel and handles all the SMTP complexity.

---

## Environment Variables Checklist

Make sure ALL of these are set in Vercel:

### Required for SMTP (Mailtrap):
```
✅ SMTP_HOST
✅ SMTP_PORT
✅ SMTP_USER
✅ SMTP_PASS
✅ SMTP_FROM
✅ SMTP_SECURE
✅ ADMIN_EMAIL
```

### OR for Resend (Recommended):
```
✅ RESEND_API_KEY
✅ ADMIN_EMAIL
```

### Always Required:
```
✅ NEXT_PUBLIC_APP_URL
✅ APP_NAME
✅ DATABASE_URL
✅ NEXTAUTH_URL
✅ NEXTAUTH_SECRET
```

---

## Verify It's Working

### Test 1: SMTP Test
```
GET https://saaskit-delta.vercel.app/api/test-email
```

**Success:**
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "sentTo": "ekram@gmail.com"
}
```

### Test 2: Send Marketing Email
1. Login as Admin
2. Go to https://saaskit-delta.vercel.app/admin/marketing
3. Use "Custom" recipient with your email
4. Send test email
5. Check inbox (or Mailtrap)

### Test 3: Check Logs
1. Vercel Dashboard → Deployment → Logs
2. Look for:
   ```
   ✅ Email sent to your-email@example.com
   ```

---

## Quick Reference

### Test Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/test-email` | Test SMTP configuration |
| `/api/admin/marketing/check-setup` | Check database setup |
| `/admin/marketing` | Marketing email UI |

### Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| "SMTP not configured" | Env vars missing | Add SMTP_* to Vercel |
| "ETIMEDOUT" | Connection timeout | Change port or service |
| "ECONNREFUSED" | Server refusing | Check host/port |
| "auth failed" | Bad credentials | Verify user/pass |
| "Table doesn't exist" | DB not migrated | See VERCEL_DEPLOYMENT_FIX.md |

---

## Still Not Working?

### Get Detailed Error Info

1. **Visit test endpoint:**
   ```
   https://saaskit-delta.vercel.app/api/test-email
   ```

2. **Copy the full JSON response**

3. **Check Vercel logs:**
   - Dashboard → Logs
   - Copy any error messages

4. **Check if issue is:**
   - ❌ Missing env vars → Add them in Vercel
   - ❌ Wrong credentials → Verify in Mailtrap
   - ❌ IP blocking → Switch to Resend
   - ❌ Port issues → Try 2525 or 465

---

## Recommended Solution

**Switch to Resend** - it's built for Vercel, free tier is generous, and setup takes 5 minutes. No SMTP configuration headaches!

1. Sign up: https://resend.com
2. Get API key
3. `npm install resend`
4. Update `src/lib/email.ts`
5. Add `RESEND_API_KEY` to Vercel
6. Deploy and test

**Works perfectly every time! 🎉**

---

## Support Checklist

When asking for help, provide:

1. ✅ Test endpoint response: `/api/test-email`
2. ✅ Check setup response: `/api/admin/marketing/check-setup`
3. ✅ Vercel logs (last 20 lines with error)
4. ✅ Environment variables (names only, not values!)
5. ✅ Email service you're using (Mailtrap/Resend/Other)

---

**TL;DR: Visit `/api/test-email` on your domain. It will tell you exactly what's wrong and how to fix it!**
