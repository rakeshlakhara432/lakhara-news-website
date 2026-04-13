/**
 * set-storage-cors.cjs
 * Run: node set-storage-cors.cjs
 * Sets CORS on Firebase Storage bucket so html2canvas can load signature images.
 */

const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getStorage }                    = require("firebase-admin/storage");
const path = require("path");
const fs   = require("fs");

// ── Try to load service-account key if present ──────────────────────────────
let appConfig = { storageBucket: "lakhara-news-website.appspot.com" };

const saPath = path.join(__dirname, "serviceAccountKey.json");
if (fs.existsSync(saPath)) {
  appConfig.credential = cert(require(saPath));
  console.log("✅ Using serviceAccountKey.json");
} else {
  console.log("ℹ️  No serviceAccountKey.json — using gcloud Application Default Credentials");
}

if (!getApps().length) initializeApp(appConfig);

const corsConfig = [
  {
    origin: ["*"],
    method: ["GET", "HEAD"],
    responseHeader: ["Content-Type", "Access-Control-Allow-Origin"],
    maxAgeSeconds: 3600,
  },
];

async function main() {
  const bucket = getStorage().bucket();
  console.log(`🔧 Setting CORS on: ${bucket.name}`);
  await bucket.setCorsConfiguration(corsConfig);
  console.log("✅ Done! Firebase Storage CORS set successfully.");
  console.log("   Signature images will now load correctly in PDF and ID Card.");
}

main().catch((err) => {
  console.error("❌ Error:", err.message || err);
  process.exit(1);
});
