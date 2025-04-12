# Week 1 - Orientation Class \[2 Aug 2024]

> **Syllabus** - [Notion – The all-in-one workspace for your notes, tasks, wikis, and databases. (100xdevs.com)](https://blog.100xdevs.com/Cohort-3-0-322ac9e00cb248f090fffe05047de99f) Harkirat Background - [https://www.youtube.com/watch?v=gYK8azCYjnU](https://www.youtube.com/watch?v=gYK8azCYjnU)





![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb4566ea-3499-40d2-868e-56036b453147%2F454ef635-5594-4a0a-b696-72ad58343815%2FUntitled.png?table=block&id=db973247-1a07-42af-88cd-3e672b3ba709&cache=v2)

### [Why Blockchains?](#00024a1cb964410bae2616d83747721f "Why Blockchains?")Why Blockchains?

- **Inflating Currencies**: Central banks can print more money, leading to inflation.

<!--THE END-->

- **Inflation Issues**: Printing money and distributing it to everyone causes inflation, reducing the value of money.

<!--THE END-->

- **Random Bailouts**: Governments bail out failing institutions, creating unfair economic conditions.

<!--THE END-->

- **Need for Better Currency**: A currency that is open, transparent, and immune to arbitrary printing is essential.

<!--THE END-->

- **Fractional Reserve Banking**: Banks only keep a fraction of depositors' money on hand, which can lead to financial instability.

<!--THE END-->

- **Currency Depreciation**: Traditional currencies lose value over time due to inflation.

<!--THE END-->

- **Lack of Backing**: Modern currencies are not backed by tangible assets like gold or silver.

<!--THE END-->

- **Recommended Watching**: *The Big Short* (film) provides insight into financial crises and the need for better financial systems.

 

### [What is Blockchain?](#a5ac07b9777849b9afa97896a5c6ba0a "What is Blockchain?")What is Blockchain?

Blockchain is a decentralized and distributed digital ledger that records transactions across many computers, ensuring data security and transparency. It operates without a central authority, using cryptographic techniques to verify and add new transactions.

#### [Main Characteristics of Blockchain:](#63e7affba73043948d4cca83baf62848 "Main Characteristics of Blockchain:")Main Characteristics of Blockchain:

1. **Decentralization**: Blockchain is managed across multiple nodes (machines), ensuring no single entity controls the data. Each node stores the entire blockchain, providing access to all data on the blockchain.

<!--THE END-->

2. **Immutability**: Once data is recorded on a blockchain, it cannot be easily altered or deleted, ensuring the integrity of the records.

<!--THE END-->

3. **Transparency**: All transactions recorded on a blockchain are visible to all participants, promoting openness and trust.

<!--THE END-->

4. **Consensus Mechanisms**: Nodes in the network follow consensus mechanisms (e.g., Proof of Work, Proof of Stake) to validate transactions and add them to the blockchain.

#### [Purpose of Blockchain:](#43a65ec2ec05435582d307210fc6d3b7 "Purpose of Blockchain:")Purpose of Blockchain:

The purpose of blockchain is to create a **network of computers that agree upon a common state of data**. This ensures that:

- Any person or organization can participate in the process.

<!--THE END-->

- No single person or organization can control the process.

Blockchain enables secure, transparent, and tamper-proof transactions without the need for a central authority.

#### [How to Create a New Currency with Blockchain](#edfbadb539df488f80ed5f917dd9c251 "How to Create a New Currency with Blockchain")How to Create a New Currency with Blockchain

There is a need for **trustless**, **anonymized**, and **decentralized** form of money, blockchain solves it for us.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb4566ea-3499-40d2-868e-56036b453147%2Fd86d7133-e62b-480f-a7b2-8e36a8bedc1e%2FDesigner_%281%29.png?table=block&id=8674130f-0b85-4c07-88ab-75546e46b2f6&cache=v2)

Key points:

1. **Avoiding Central Ownership**:
   
   1. Centralized control over currency can lead to misuse of power and lack of transparency.
   2. Blockchain technology eliminates the need for a central authority, distributing control among multiple nodes.

<!--THE END-->

2. **Trustless System**:
   
   1. Blockchain enables the creation of currency without needing to trust a central authority.
   2. Transactions are verified by consensus mechanisms, ensuring security and integrity.

<!--THE END-->

3. **Anonymization**:
   
   1. Blockchain technology supports anonymized transactions, protecting the privacy of users while maintaining transparency of the overall system.

<!--THE END-->

4. **Decentralization**:
   
   1. Decentralized money operates on a network of nodes, preventing any single entity from having control and reducing the risk of manipulation or failure.

By leveraging these principles, blockchain technology allows for the creation of new currencies that are secure, transparent, and free from centralized control.

💡

Bitcoin - [But how does bitcoin actually work? (youtube.com)](https://www.youtube.com/watch?v=bBC-nXj3Ng4) 
Bitcoin whitepaper - [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/en/bitcoin-paper)

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb4566ea-3499-40d2-868e-56036b453147%2F46518d2c-48f4-498e-b03d-a227812ebaef%2FUntitled.png?table=block&id=24df4718-b11c-426b-8e49-d8bf426ae555&cache=v2)

### Hashing

Transforms input data of any size into a fixed-size string of characters.

- **Properties**:
  
  - **Deterministic**: Same input always produces the same output.
  - **Fast Computation**: Hash value can be quickly verified for any data.
  - **Pre-image Resistance**: Difficult to reverse the hash function to find the original input.
  - **Small Changes in Input Produce Large Changes in Output**: Tiny input changes drastically alter the hash output.
  - **Collision Resistance**: Difficult to find two different inputs that produce the same hash output.

<!--THE END-->

- **Example - SHA-256**:
  
  - **Secure Hash Algorithm 256-bit**: Produces a 256-bit (32-byte) hash value from any input.
    
    **Code Example**:
    
    ```js
    const crypto = require('crypto');
    
    const input = "100xdevs";
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    
    console.log(hash)
    ```
    
    💡
    
    [SHA256 - Online Tools (emn178.github.io)](https://emn178.github.io/online-tools/sha256.html)

### Hashing vs. Encryption

- **Hashing**:
  
  - Converts data into a fixed-size string.
  - Irreversible (one-way function).
  - Used for data integrity verification (e.g., password storage, file verification).

<!--THE END-->

- **Encryption**:
  
  - Converts data into a different format.
  - Reversible (two-way function) using a key.
  - Used for data confidentiality (e.g., securing communication, data storage).

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb4566ea-3499-40d2-868e-56036b453147%2F879a44f1-9b52-4e80-aae8-919e3b9f61aa%2FUntitled.png?table=block&id=557f0c3a-6282-44af-bb47-72179131e388&cache=v2)

### [How Does Blockchain Work?](#f3943270aa8143d691c377dc07a9c15e "How Does Blockchain Work?")How Does Blockchain Work?

- **Blocks**:
  
  - Data is stored in "blocks."
  - Each block contains:
    
    - A list of transactions.
    - A timestamp.
    - A cryptographic hash of the previous block.

<!--THE END-->

- **Chain**:
  
  - Blocks are linked together in a chronological order.
  - This creates a "chain" of blocks, hence the name "blockchain."

💡

Infographic - [How Crypto-currency Works - Animagraffs](https://animagraffs.com/how-cryptocurrency-works) 
Blochain Demo - [Blockchain Demo (andersbrownworth.com)](https://andersbrownworth.com/blockchain/)

### Important Terms

- **Nonce**
  
  - A **unique number** that miners must find to produce a valid hash.
  - Used only once, it ensures the resulting hash satisfies the blockchain's difficulty conditions.

<!--THE END-->

- Finding Nonce
  
  - **Miners and Compute Power**
    
    - Miners produce blocks in the blockchain.
    - The probability of producing the next block and earning the reward increases with more compute power.
    - Compute power is needed to calculate the correct nonce.
  - **Nonce and Proof of Work (PoW)**
    
    - The nonce is a number that, when added to the block data and hashed, produces a hash meeting the network's difficulty criteria.
    - The process of finding this nonce is known as **Proof of Work (PoW)**.

<!--THE END-->

- **Consensus Mechanism**
  
  - A method ensuring all participants agree on the blockchain's state and the validity of transactions.
  - Acts as a rulebook for validating transactions and blocks.

<!--THE END-->

- **Proof of Work (PoW)**
  
  - A **consensus mechanism** used in blockchain networks.
  - Requires solving complex mathematical problems to find the correct nonce.
  - Ensures the security and integrity of the blockchain by validating transactions and adding new blocks.