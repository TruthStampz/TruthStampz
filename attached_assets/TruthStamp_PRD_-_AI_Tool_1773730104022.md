# Product Requirements Document
## TruthStamp — AI Proof-of-Content Platform
### Hedera Grant Application (Up to 500,000 HBAR)

**Version:** 1.0  
**Date:** March 2026  
**Program:** Hedera Ecosystem Grant — AI Vertical  
**Target Funding:** 500,000 HBAR  

---

## 1. Executive Summary

TruthStamp is an AI-powered content authenticity platform built natively on Hedera. It enables creators — journalists, photographers, YouTubers, researchers — to prove the originality and provenance of their content using AI-driven analysis, cryptographic hashing, and on-chain verification via Hedera Consensus Service (HCS) and Hedera Token Service (HTS).

In a world drowning in AI-generated misinformation, TruthStamp provides an unforgeable digital certificate that says: *"This content is real, created by this person, at this moment."*

**One-line pitch:** Notarize your content on Hedera. Prove it's yours. Forever.

---

## 2. Problem Statement

AI-generated images, videos, and articles are flooding the internet. The volume of synthetic media doubled in 2024 alone. The consequences are severe:

- Journalists' photos are dismissed as AI fakes.
- Photographers lose licensing revenue because buyers can't verify originality.
- Researchers face peer review rejection when provenance is questioned.
- Brands face legal exposure from unverifiable content origins.
- Democracy erodes when citizens can't distinguish real news from deepfakes.

**There is no trusted, open, decentralized standard for content authenticity verification today.** Existing solutions (Adobe Content Credentials, watermarking tools) are proprietary, centralized, and easily stripped from files.

**TruthStamp solves this with an open, blockchain-backed, AI-augmented standard on Hedera.**

---

## 3. Product Vision

TruthStamp will be the world's first AI-native content provenance protocol on Hedera. Any creator can mint a verifiable, tamper-proof "TruthStamp Certificate" for their content in under 60 seconds. Any person — anywhere on the internet — can verify that certificate without needing an account.

**Core User Promise:**
- **Creators:** Prove your content is real, original, and yours.
- **Publishers:** Accept only verified content into your pipeline.
- **Consumers/Viewers:** Know before you share — is this real?

---

## 4. Target Users & Adoption Potential

| User Segment | Pain Point | TruthStamp Value |
|---|---|---|
| Journalists | Photos labeled "AI fake" | Immutable proof of capture time/location |
| Photographers | Copyright theft, AI imitation | On-chain ownership certificate + NFT |
| YouTubers | Demonetization for AI content | Real-content badge for platform trust |
| Researchers | Fabricated data allegations | Peer-verifiable data provenance hash |
| News agencies | Fake news lawsuits | Chain-of-custody documentation |
| Stock photo platforms | AI-generated flooding market | Verified-human badge for listings |

**Addressable market:** 50M+ professional content creators globally. Even a 0.1% adoption equals 50,000 users.

---

## 5. Product Architecture & Workflow

### 5.1 End-to-End User Workflow

**Step 1 — Upload**  
Creator uploads content (image, video, article text, PDF, audio) via the TruthStamp web app or API.

**Step 2 — AI Analysis**  
The AI engine performs:
- AI-generation probability score (is this synthetic media?)
- Originality fingerprint (similarity scan vs. known synthetic datasets)
- Metadata extraction (EXIF data, creation timestamps, device signatures)
- Content classification (photo, video, article, research data)

**Step 3 — Hash Generation**  
A SHA-256 cryptographic hash of the original file is generated client-side (the file never leaves the user's control).

**Step 4 — On-Chain Anchoring via HCS**  
The AI analysis report + file hash is submitted to Hedera Consensus Service as an ordered, timestamped, immutable message. This creates the permanent provenance record.

**Step 5 — Certificate NFT via HTS**  
A non-fungible "TruthStamp Certificate" is minted via Hedera Token Service and issued to the creator's wallet. The NFT metadata contains: file hash, HCS topic ID, timestamp, AI analysis score, creator public key.

**Step 6 — Verification**  
Anyone with the content can go to verify.truthstamp.io, upload the file (or paste the hash), and receive instant verification: real or tampered, original timestamp, creator identity, full chain-of-custody.

### 5.2 Technical Architecture

**Frontend:** React web app + mobile-responsive PWA  
**Backend:** Node.js API layer  
**AI Engine:** Multimodal model (image + text + video) for AI-generation detection  
**Blockchain Layer:** Hedera SDK (JavaScript)  
**Smart Contract (Optional):** Solidity via Hedera EVM for advanced licensing logic  

**Hedera Services Used:**
- **HCS (Hedera Consensus Service):** Timestamped, ordered proof anchoring. Every provenance record is an HCS topic message — immutable, cheap, fast (3-5 second finality).
- **HTS (Hedera Token Service):** Certificate NFT minting. Each verified content piece gets a unique, non-transferable (soulbound) authenticity token.
- **Mirror Nodes:** Public verification queries — anyone can look up a hash without an account.
- **Hedera EVM (Phase 2):** Smart contracts for licensing, royalty splits, and publisher API access.

---

## 6. Feature Requirements

### 6.1 MVP Features (Milestone 1 & 2)

**Content Upload & Analysis**
- Drag-and-drop upload interface supporting: JPG, PNG, WebP, MP4, MOV, PDF, TXT, DOCX
- Max file size: 500MB (video), 50MB (image/document)
- Client-side SHA-256 hashing before upload (privacy-first)
- AI authenticity analysis: returns score 0–100 (0 = clearly AI, 100 = clearly human-made)
- Processing time target: under 15 seconds for images, under 60 seconds for video

**On-Chain Anchoring**
- HCS topic creation per creator account (one topic = one creator's provenance ledger)
- HCS message submission containing: file hash, AI score, content type, timestamp, creator ID
- HTS NFT minting with custom metadata schema (ERC-721 compatible)
- Transaction hash displayed to user with Hashscan explorer link

**Creator Dashboard**
- List of all stamped content with verification status
- One-click copy of verification link
- Download certificate (PDF with QR code linking to on-chain record)
- HBAR balance display for transaction fee transparency

**Public Verification Portal**
- Open URL: verify.truthstamp.io
- Upload a file OR paste a SHA-256 hash to verify
- Returns: Original stamp date, creator wallet, AI analysis score, full HCS topic message
- No account required for verification
- Embeddable verification badge (HTML snippet) for websites

### 6.2 Phase 2 Features (Milestone 3 & 4)

**Team & Organization Accounts**
- Multi-user workspaces for newsrooms and agencies
- Role-based access (Admin, Editor, Contributor)
- Bulk upload API for high-volume publishers

**Licensing Smart Contracts**
- Creator can attach licensing terms to Certificate NFT
- Automated royalty tracking when licensed content is used
- Hedera EVM smart contract handles payment splits

**Browser Extension**
- Right-click any image on the web → "Verify with TruthStamp"
- Instant popup showing authenticity status

**Publisher API**
- REST API for media platforms to auto-verify uploaded content
- Webhook support for real-time verification events
- SDK packages (JavaScript, Python)

**TruthStamp Token (STAMP)**
- Utility token launched via HTS
- Staking for reduced verification fees
- Governance voting for protocol parameters
- Bonding curve mechanism for initial distribution

---

## 7. AI Agent Architecture

The AI agent is the core intelligence of TruthStamp. It performs on-chain actions autonomously and is not just a UI element.

### 7.1 AI Agent Responsibilities

**Analysis Agent**
- Runs multimodal AI detection on uploaded content
- Generates a structured JSON analysis report
- Assigns confidence score and supporting evidence flags

**Anchoring Agent**
- Signs and submits HCS messages autonomously
- Handles retry logic on network failure
- Reports HCS consensus timestamp back to user

**Minting Agent**
- Prepares NFT metadata JSON
- Calls HTS mint transaction
- Returns token ID and Hashscan explorer link to user

**Verification Agent**
- Queries Mirror Node for a given file hash
- Reconstructs provenance history from HCS topic messages
- Returns structured verification response (real/tampered/not found)

### 7.2 On-Chain Agent Actions

Every certificate issued involves exactly two on-chain Hedera transactions:

1. `ConsensusService.submitMessage(topicId, analysisPayload)` — anchors the proof
2. `TokenService.mintToken(tokenId, metadata)` — issues the certificate NFT

Both transactions are executed by the AI agent on behalf of the creator (with explicit user confirmation in the UI).

---

## 8. Data Model

### Certificate NFT Metadata Schema (HTS)
```json
{
  "name": "TruthStamp Certificate #[ID]",
  "creator": "[Hedera Account ID]",
  "content_hash": "[SHA-256]",
  "content_type": "image/jpeg",
  "ai_score": 94,
  "hcs_topic_id": "[Topic ID]",
  "hcs_sequence_number": 42,
  "timestamp": "2026-03-15T14:32:00Z",
  "analysis_flags": ["exif_present", "no_gan_artifacts", "natural_noise_pattern"],
  "certificate_version": "1.0"
}
```

### HCS Message Payload
```json
{
  "type": "TRUTHSTAMP_PROOF",
  "version": "1.0",
  "file_hash": "[SHA-256]",
  "ai_analysis": {
    "score": 94,
    "model_version": "ts-detector-v1",
    "flags": ["exif_present", "natural_noise"]
  },
  "creator_id": "[Hedera Account]",
  "content_type": "image/jpeg",
  "file_size_bytes": 2048576
}
```

---

## 9. Milestones & Grant Disbursement Plan

### Project Acceptance (10% — 50,000 HBAR)
Deliverables:
- This PRD submitted and accepted
- GitHub repository initialized with project structure
- Technical architecture diagram
- Team background and capability summary

### Milestone 1: TestNet Deployment (10% — 50,000 HBAR)
Target: 6 weeks from acceptance

Deliverables:
- Live TruthStamp app deployed on Hedera TestNet
- HCS topic creation and message submission working on TestNet
- HTS NFT minting working on TestNet
- AI analysis engine returning scores for image and text content
- Smart contract addresses (TestNet)
- GitHub repository with full codebase
- Loom demo video showing end-to-end stamp + verify workflow

### Milestone 2: MainNet Launch (20% — 100,000 HBAR)
Target: 10 weeks from acceptance

Deliverables:
- Full deployment on Hedera MainNet
- HCS and HTS integration live in production
- Public verification portal (verify.truthstamp.io) operational
- Initial 50 beta users onboarded
- Smart contract addresses (MainNet)
- Updated GitHub with MainNet config
- Demo video showing live MainNet transactions
- Beta user feedback report

### Milestone 3: Traction (30% — 150,000 HBAR)
Target: 22 weeks from acceptance

Success criteria (achieve at least one):
- 400+ Monthly Active Users stamping content
- 50,000+ monthly HCS transactions (each stamp = 1 transaction)
- $40,000+ TVL in staking/liquidity mechanisms (Phase 2)

Deliverables:
- Public analytics dashboard (Dune Analytics or custom)
- Hashscan explorer links proving transaction volume
- On-chain verification of user activity
- Case studies from 3+ journalist/photographer users
- Demo video showing growth metrics

### Milestone 4: Token Launch (30% — 150,000 HBAR)
Target: 30 weeks from acceptance

Deliverables:
- STAMP token deployed on Hedera MainNet via HTS
- Bonding curve smart contract deployed and verified
- Token distribution report (holders, volume, liquidity)
- Publisher API launched with 2+ integration partners
- Public dashboard showing token adoption metrics
- Demo video explaining STAMP utility and on-chain activity

---

## 10. Business Model & Sustainability

**Revenue Streams:**

**Freemium SaaS**
- Free tier: 10 stamps/month (subsidized by grant HBAR)
- Pro tier ($19/mo): 500 stamps/month + bulk API access
- Team tier ($99/mo): Unlimited stamps + 5 seats + publisher API

**API Access**
- Pay-per-verification for publishers and platforms
- $0.01 per verification call after 10,000 free calls/month

**STAMP Token Utility**
- Staking for fee discounts (stake 1,000 STAMP = 50% fee reduction)
- Protocol governance participation
- Premium feature access

**Projections:**
- Month 6: 500 paid users → ~$9,500 MRR
- Month 12: 2,000 paid users → ~$38,000 MRR
- Month 18: Break-even without grant dependency

---

## 11. Competitive Landscape

| Solution | Approach | Weakness vs. TruthStamp |
|---|---|---|
| Adobe Content Credentials | Proprietary, Adobe-only | Centralized, requires Adobe products |
| Truepic | Enterprise-focused | Expensive, closed API, not blockchain |
| Numbers Protocol | NFT-based | Not AI-native, high gas fees (Ethereum) |
| C2PA Standard | Technical standard only | No user product, no verification UX |
| TruthStamp | AI + Hedera native | Fast, cheap, open, AI-powered |

**TruthStamp's edge:** Hedera's $0.001 transaction fees make per-stamp costs 100x cheaper than Ethereum-based alternatives. 3–5 second finality means verification is instant. The AI layer adds intelligence that pure hash-anchoring solutions lack.

---

## 12. Team Requirements

**To build this product, the team requires:**

- 1 Full-stack engineer (React, Node.js, Hedera SDK)
- 1 AI/ML engineer (multimodal detection models, inference API)
- 1 Smart contract developer (Solidity/Hedera EVM, HTS)
- 1 Product designer (UX, verification portal)
- 1 BD/partnerships lead (journalist/newsroom outreach)

---

## 13. Risk & Mitigation

| Risk | Likelihood | Mitigation |
|---|---|---|
| AI detection accuracy below 90% | Medium | Ensemble models + continuous retraining; score shown with confidence interval |
| Low creator adoption | Medium | Free tier + journalist partnership program from day 1 |
| HBAR price volatility affecting fees | High | Fee abstraction layer — charge in USD, convert to HBAR at payment time |
| Competitor launches similar product | Low | First-mover on Hedera + open protocol standard creates network effects |
| Smart contract exploit | Low | Third-party audit before MainNet launch; multisig admin keys |

---

## 14. Success Metrics

| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Total Stamps Issued | 1,000 | 10,000 | 100,000 |
| Monthly Active Users | 100 | 400 | 2,000 |
| Monthly HCS Transactions | 5,000 | 50,000 | 300,000 |
| Paid Subscribers | 50 | 200 | 1,000 |
| Publisher API Partners | 1 | 3 | 10 |
| STAMP Token Holders | — | 500 | 5,000 |

---

*TruthStamp — Because truth needs a timestamp.*

*GitHub: github.com/truthstamp | Contact: [team@truthstamp.io]*
