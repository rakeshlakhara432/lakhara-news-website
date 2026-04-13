/**
 * set-storage-cors.js
 * Run: node set-storage-cors.js
 * Sets CORS on Firebase Storage bucket so html2canvas can load signature images.
 */

const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage }          = require("firebase-admin/storage");
const path = require("path");

// ── Try to load service-account key if present ──────────────────────────────
// If no service account, we use Application Default Credentials (gcloud auth)
let appConfig = { storageBucket: "lakhara-news-website.appspot.com" };

try {
  const sa = require(path.join(__dirname, "serviceAccountKey.json"));
  appConfig.credential = cert(sa);
  console.log("✅ Using service account key.");
} catch {
  console.log("ℹ️  No serviceAccountKey.json found. Using Application Default Credentials.");
}

initializeApp(appConfig);

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
  console.log(`🔧 Setting CORS on bucket: ${bucket.name}`);
  await bucket.setCorsConfiguration(corsConfig);
  console.log("✅ CORS set successfully! Signature images will now load in PDF/ID Card.");
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
