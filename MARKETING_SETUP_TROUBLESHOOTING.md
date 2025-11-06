# Marketing Email Feature - Setup & Troubleshooting

## Error: 500 - "Failed to send promotional email"

This error typically occurs when the database hasn't been updated with the new `PromotionalEmail` table.

## Quick Fix (Recommended)

Run the automated setup script:

```bash
chmod +x setup-marketing.sh
./setup-marketing.sh
```

This will:
1. Generate Prisma client
2. Update database schema
3. Verify the setup

## Manual Setup Steps

If the automated script doesn't work, follow these manual steps:

### Step 1: Update Prisma Client

```bash
npx prisma generate
```

**Expected output:**
```
✔ Generated Prisma Client
```

### Step 2: Push Schema to Database

```bash
npx prisma db push
```

**Expected output:**
```
Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

**Important:** If you see warnings about data loss, make sure you have backups before proceeding.

### Step 3: Verify Setup

Visit this endpoint to check if everything is configured:

```
http://localhost:3000/api/admin/marketing/check-setup
```

**Expected response (success):**
```json
{
  "success": true,
  "checks": {
    "database": true,
    "promotionalEmailTable": true,
    "canQuery": true,
    "smtpConfigured": true
  },
  "message": "✅ Marketing email feature is properly set up!"
}
```

## Common Issues & Solutions

### Issue 1: "Table 'promotional_emails' doesn't exist"

**Error in logs:**
```
PrismaClientKnownRequestError: Table 'saaskit.promotional_emails' doesn't exist
```

**Solution:**
```bash
npx prisma db push
```

This creates the missing table.

---

### Issue 2: "Prisma Client validation failed"

**Error:**
```
Invalid `prisma.promotionalEmail.create()` invocation
```

**Solution:**
Regenerate Prisma Client:

```bash
npx prisma generate
npm run dev  # Restart server
```

---

### Issue 3: Database connection error

**Error:**
```
Can't reach database server at `localhost:5432`
```

**Solution:**
1. Check your `.env` file has correct `DATABASE_URL`
2. Ensure PostgreSQL is running
3. Test connection:
   ```bash
   npx prisma db pull
   ```

---

### Issue 4: SMTP not configured

**Error:**
```
smtpConfigured: false
```

**Solution:**
Add to `.env` file:
```env
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="587"
SMTP_USER="your-mailtrap-user"
SMTP_PASS="your-mailtrap-pass"
SMTP_FROM="AI SaaS <noreply@aisaas.com>"
```

---

### Issue 5: "Admin access required"

**Error:**
```json
{
  "error": "Forbidden. Admin access required."
}
```

**Solution:**
Make sure you're signed in with an account that has ADMIN or SUPER_ADMIN role.

Check your user's roles:
```bash
npx prisma studio
```

Navigate to `users` table → Find your user → Check associated `userRoles`.

---

## Verify Database Schema

Check if the table exists in your database:

### Option 1: Using Prisma Studio
```bash
npx prisma studio
```

Look for `promotional_emails` table in the left sidebar.

### Option 2: Using SQL
```sql
-- PostgreSQL
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'promotional_emails';
```

**Expected result:** One row showing `promotional_emails`.

---

## Check Server Logs

When sending an email, check your server console for detailed error messages:

```bash
npm run dev
```

Look for:
- `📧 Sending promotional email to X recipients...`
- `✅ Email sent to user@example.com`
- `❌ Failed to send to...`
- Any error stack traces

---

## Test Endpoints

### 1. Check Setup
```bash
curl http://localhost:3000/api/admin/marketing/check-setup
```

### 2. Test SMTP
```bash
curl http://localhost:3000/api/test-email
```

### 3. Get Campaigns (should return empty array if new)
```bash
curl http://localhost:3000/api/admin/marketing/send-email
```

---

## Database Migration (Alternative Method)

If `prisma db push` doesn't work, try creating a migration:

```bash
# Create migration
npx prisma migrate dev --name add_promotional_emails

# Apply migration
npx prisma migrate deploy
```

---

## Reset Database (CAUTION - Development Only)

If nothing else works and you're in development with no important data:

```bash
# WARNING: This deletes ALL data
npx prisma migrate reset

# Then push the schema
npx prisma db push

# Restart server
npm run dev
```

**⚠️ WARNING:** This will delete all data in your database!

---

## Environment Variables Checklist

Ensure your `.env` file has:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saaskit"

# SMTP
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-user"
SMTP_PASS="your-pass"
SMTP_FROM="AI SaaS <noreply@example.com>"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_NAME="AI SaaS"
```

---

## Still Not Working?

### 1. Check Detailed Error

The error response in development mode includes details:

```json
{
  "error": "Failed to send promotional email. Please try again.",
  "details": "Actual error message here"
}
```

Check the `details` field for the specific error.

### 2. Enable Debug Logging

Add to your `.env`:
```env
DEBUG="prisma:*"
```

Restart server and check logs.

### 3. Verify Prisma Schema

Check `prisma/schema.prisma` includes:

```prisma
model PromotionalEmail {
  id          String   @id @default(cuid())
  subject     String
  content     String   @db.Text
  sentBy      String
  sentByUser  User     @relation("SentBy", fields: [sentBy], references: [id])
  recipientType String
  recipientEmails String[]
  totalRecipients Int    @default(0)
  successCount    Int    @default(0)
  failureCount    Int    @default(0)
  status      String   @default("draft")
  scheduledFor DateTime?
  sentAt       DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("promotional_emails")
}
```

And in the `User` model:
```prisma
model User {
  // ... other fields
  sentPromotionalEmails PromotionalEmail[] @relation("SentBy")
  // ...
}
```

### 4. Clean Install

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma
npx prisma generate

# Push schema
npx prisma db push

# Restart
npm run dev
```

---

## Success Indicators

You'll know it's working when:

1. ✅ Check setup returns all `true`
2. ✅ Marketing page loads without errors
3. ✅ Campaign history shows (even if empty)
4. ✅ Can select recipient types
5. ✅ Send email shows success toast
6. ✅ Email appears in Mailtrap inbox

---

## Getting Help

If you're still stuck:

1. **Check logs:** Look at both browser console (F12) and server terminal
2. **Error details:** Copy the full error message from `details` field
3. **Database status:** Share output from check-setup endpoint
4. **Schema version:** Confirm Prisma schema has PromotionalEmail model

---

## Quick Diagnostic Command

Run all checks at once:

```bash
echo "=== Checking Database ==="
npx prisma db pull --print 2>&1 | grep -i "promotional_emails" && echo "✅ Table exists" || echo "❌ Table missing"

echo ""
echo "=== Checking Prisma Client ==="
cat node_modules/.prisma/client/index.d.ts | grep -i "PromotionalEmail" && echo "✅ Client has model" || echo "❌ Client missing model"

echo ""
echo "=== Checking SMTP Config ==="
grep -E "SMTP_HOST|SMTP_USER|SMTP_PASS" .env && echo "✅ SMTP configured" || echo "❌ SMTP missing"
```

---

**Remember:** After any schema changes, always:
1. Run `npx prisma generate`
2. Run `npx prisma db push`
3. Restart your dev server

Good luck! 🚀
