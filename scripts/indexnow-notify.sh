#!/bin/bash
# IndexNow notification script — pings IndexNow API with all sitemap URLs after deploy
# Usage: bash scripts/indexnow-notify.sh

set -euo pipefail

HOST="palmares-digital-auto.vercel.app"
KEY="a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
KEY_LOCATION="https://${HOST}/indexnow-key.txt"

# Fetch sitemap and extract all URLs
URLS=$(curl -s "https://${HOST}/sitemap.xml" | grep -oP '<loc>\K[^<]+')

if [ -z "$URLS" ]; then
  echo "ERROR: No URLs found in sitemap"
  exit 1
fi

# Build JSON payload
URL_ARRAY=$(echo "$URLS" | jq -R . | jq -s .)

PAYLOAD=$(jq -n \
  --arg host "$HOST" \
  --arg key "$KEY" \
  --arg keyLocation "$KEY_LOCATION" \
  --argjson urlList "$URL_ARRAY" \
  '{host: $host, key: $key, keyLocation: $keyLocation, urlList: $urlList}')

echo "Submitting $(echo "$URLS" | wc -l) URLs to IndexNow..."

# Submit to IndexNow (Bing endpoint, which federates to others)
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "SUCCESS: IndexNow accepted (HTTP $HTTP_CODE)"
else
  echo "WARNING: IndexNow returned HTTP $HTTP_CODE"
  echo "$BODY"
fi
