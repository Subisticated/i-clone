# Encryption key instructions

This project now encrypts passwords with AES-256-GCM before storing them in MongoDB. The key is expected to be set in an environment variable so it is not committed to source control.

Required environment variables (set these before running the dev server):

- `ENCRYPTION_KEY` — Base64-encoded 32-byte key (required).
  - Generate a key locally with Node:
    ```powershell
    node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
    ```

- `DECRYPT_API_KEY` — a short secret used to authorize decryption requests (required to call GET /api/login/:id/decrypt).
  - Example (PowerShell):
    ```powershell
    $env:ENCRYPTION_KEY = '...'
    $env:DECRYPT_API_KEY = 'my-demo-secret'
    npm run dev
    ```

Notes & security:
- Keep `ENCRYPTION_KEY` and `DECRYPT_API_KEY` secret and never commit them to Git.
- The MongoDB URI is currently embedded per project preference; consider moving it to `MONGODB_URI` as well.
- This reversible encryption is suitable for demo/learning purposes but requires careful key management in production.
