#!/bin/bash

# HTTPS Proxy Configuration
SOURCE_PORT=3010
TARGET_PORT=3000
CERT_PATH="generated/localhost.pem"
KEY_PATH="generated/localhost-key.pem"

# Start the local SSL proxy
local-ssl-proxy \
  --source $SOURCE_PORT \
  --target $TARGET_PORT \
  --cert $CERT_PATH \
  --key $KEY_PATH