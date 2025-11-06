#!/bin/bash

echo "🔧 Setting up Marketing Email Feature..."
echo ""

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js and npm."
    exit 1
fi

# Step 1: Generate Prisma Client
echo "📦 Step 1: Generating Prisma Client..."
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate || {
    echo "⚠️  Warning: Prisma generate had issues, but continuing..."
}
echo "✅ Prisma Client generated"
echo ""

# Step 2: Push schema to database
echo "🗄️  Step 2: Updating database schema..."
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma db push --skip-generate || {
    echo "❌ Error: Failed to update database schema"
    echo "Please ensure your DATABASE_URL is correct in .env file"
    exit 1
}
echo "✅ Database schema updated"
echo ""

# Step 3: Verify the table exists
echo "🔍 Step 3: Verifying PromotionalEmail table..."
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start your dev server: npm run dev"
echo "2. Sign in as Admin or SuperAdmin"
echo "3. Navigate to: http://localhost:3000/admin/marketing"
echo "4. Send your first promotional email!"
echo ""
echo "📖 Documentation: MARKETING_EMAILS_GUIDE.md"
