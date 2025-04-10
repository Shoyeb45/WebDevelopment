# 📘 Blockchain Notes

---

## Why Blockchains?

- **Inflating Currencies**: Central banks can print more money, leading to inflation.
- **Inflation Issues**: Distributing newly printed money causes reduction in currency value.
- **Random Bailouts**: Bailouts to failing institutions result in unfair economic situations.
- **Need for Better Currency**: A system that is open, transparent, and immune to arbitrary printing is essential.
- **Fractional Reserve Banking**: Banks keep only a fraction of deposited money, risking financial instability.
- **Currency Depreciation**: Traditional fiat currencies lose value over time.
- **Lack of Backing**: Most modern currencies are not backed by gold or other tangible assets.
- **🎥 Recommended**: _The Big Short_ - a film that explains financial crises and the need for better systems.

---

## 💡 What is Blockchain?

> A decentralized and distributed digital ledger that records transactions across many computers, ensuring **security** and **transparency**, without needing a central authority.

### ✨ Main Characteristics:
- **Decentralization**: Managed across multiple nodes, each storing the entire blockchain.
- **Immutability**: Once data is added, it cannot be easily altered or deleted.
- **Transparency**: All transactions are visible to all participants.
- **Consensus Mechanisms**: Algorithms (e.g., PoW, PoS) ensure only valid transactions are recorded.

---

## 🎯 Purpose of Blockchain

- Ensure a common, agreed-upon state of data across all network nodes.
- Enable:
  - Open participation
  - No single point of control
  - Secure and transparent transactions
  - Tamper-proof systems

---

## 🪙 How to Create a New Currency with Blockchain

### 🔑 Key Principles:

- **Avoiding Central Ownership**: Prevent misuse by distributing control.
- **Trustless System**: No need to trust any single entity; security via consensus.
- **Anonymization**: Protect user identity while maintaining system transparency.
- **Decentralization**: Nodes share power; reduces risk of manipulation or failure.

> Blockchain allows the creation of secure, anonymous, decentralized digital currencies.

---

## 🔐 Hashing

> Transforms input data of any size into a fixed-size string.

### 🧬 Properties of Hash Functions:
- **Deterministic**: Same input = same output.
- **Fast Computation**: Quick to compute.
- **Pre-image Resistance**: Hard to reverse.
- **Avalanche Effect**: Small input change = big output change.
- **Collision Resistance**: Hard to find two inputs with same hash.

### 🧪 Example - SHA-256
- Secure Hash Algorithm that produces a 256-bit (32-byte) hash.
- 🔗 [Try Online SHA-256 Tool](https://emn178.github.io/online-tools/sha256.html)

---

## 🔐 Hashing vs Encryption

| Feature       | Hashing                            | Encryption                          |
|---------------|-------------------------------------|-------------------------------------|
| Purpose       | Data Integrity                      | Data Confidentiality                |
| Direction     | One-way (irreversible)              | Two-way (reversible with key)       |
| Use Cases     | Passwords, file verification        | Secure communications, data storage|

---

## 🧱 How Does Blockchain Work?

### 📦 Blocks
Each block contains:
- List of transactions
- Timestamp
- Hash of the previous block

### 🔗 Chain
- Blocks are linked chronologically.
- Ensures history cannot be tampered.

> 📊 [Blockchain Demo](https://andersbrownworth.com/blockchain)

---

## 📘 Important Terms

### 🔢 Nonce
- A unique number miners find to produce a valid hash.
- Changes with each new block.
- Ensures hash meets difficulty criteria.

### ⚙️ Miners and Compute Power
- More compute power = higher chance of mining the next block.
- Miners use compute power to find correct nonce.

### 🛠 Nonce and Proof of Work (PoW)
- The process of finding the right nonce is called **Proof of Work**.
- Ensures blocks are valid and secure.

### 🧾 Consensus Mechanism
- Ensures agreement across all nodes on data validity.
- Examples:
  - **PoW (Proof of Work)**: Solve mathematical puzzles.
  - **PoS (Proof of Stake)**: Validate based on ownership.

---

## 📌 Summary

Blockchain provides a **transparent**, **secure**, **immutable**, and **decentralized** way of recording transactions. By using consensus mechanisms and cryptographic hashing, it enables trustless cooperation without relying on a central authority.
