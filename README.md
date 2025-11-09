# VerifAI - TruthChain

## Problem Statement

In an era of rapidly advancing AI technologies, distinguishing between accurate and misleading AI-generated content has become increasingly challenging. Users lack reliable mechanisms to verify the truthfulness of AI model outputs, leading to potential misinformation spread and erosion of trust in AI systems. There is a critical need for a decentralized, community-driven platform that can assess and validate AI-generated content through expert review and blockchain-verified transparency.

## Description

VerifAI is a decentralized truth verification platform that empowers users to submit AI model outputs for expert review and validation. The platform combines blockchain technology with a qualified reviewer network to provide transparent, immutable truth scores for AI-generated content. By leveraging IPFS for decentralized storage and Polygon blockchain for permanent record-keeping, VerifAI ensures that all reviews are tamper-proof and publicly verifiable.

The platform enables regular users to submit AI outputs for verification, while approved reviewers analyze submissions and provide detailed truth scores. All finalized reports are published to the blockchain, creating an immutable audit trail of AI content verification.

## Team - FLOWSTATE2

**Team Leader & Presenter:** [Daksh Shastri](https://github.com/Daksh0027) - Project Lead & Researcher  
**Backend Developer:** Parth Singh - Spring Boot API & Blockchain Integration  
**Frontend Developer & UI/UX Designer:** Anagad Bajaj - React Development & User Interface  
**UI/UX Designer:** Nilesh Rajan - Design System & User Experience

## Presentation

[View Project Presentation](https://www.figma.com/slides/3Sefcs4VmeLfaYVdKVl7T0/Untitled?node-id=1-171&t=aKnA9nn251wxBXVI-1)

## Tech Stack

**Frontend:** React 18, Vite, CSS3  
**Backend:** Spring Boot 3, Java 17, Maven  
**Database:** PostgreSQL 14+  
**Blockchain:** Polygon Amoy Testnet, Solidity, Web3j  
**Storage:** IPFS (Pinata)  
**Authentication:** JWT, Google OAuth2  
**Security:** Spring Security, BCrypt

## Features

- **AI Output Submission:** Users submit AI model outputs with prompts for verification
- **Expert Review System:** Qualified reviewers provide detailed truth scores (0-10)
- **Blockchain Publication:** Finalized reports are published to Polygon blockchain with IPFS storage
- **Reviewer Qualification:** Multi-step application process for becoming a verified reviewer
- **Credit System:** Reviewers earn credits for their contributions
- **Leaderboard:** Track top reviewers and reports with performance metrics
- **Google OAuth:** Seamless authentication with Google accounts
- **Decentralized Storage:** All reports stored on IPFS with blockchain references

## Prerequisites

- Node.js 16+ and npm
- Java 17+
- Maven 3.6+
- PostgreSQL 14+
- Git

## Quick Start

### Database Setup

```bash
psql -U postgres
CREATE DATABASE truthchain_db;
\q
```

### Backend Setup

```bash
cd "backend/api 2"
cp src/main/resources/application.properties.template src/main/resources/application.properties
```

Edit `application.properties` with your configuration:
- PostgreSQL credentials
- JWT secret key
- Google OAuth2 credentials
- Blockchain node URL and private key
- IPFS Pinata JWT token

```bash
./mvnw clean install
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Project Structure

```
verifai-landing/
├── backend/api 2/           # Spring Boot backend
│   ├── src/main/java/       # Java source files
│   ├── src/main/resources/  # Configuration files
│   └── pom.xml              # Maven dependencies
├── frontend/                # React frontend
│   ├── src/                 # React components
│   └── package.json         # npm dependencies
├── DATABASE_SCHEMA.md       # Complete database documentation
└── README.md                # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /login/oauth2/code/google` - Google OAuth callback

### Reports
- `POST /api/reports/create` - Submit new report
- `GET /api/reports/user` - Get user's reports
- `GET /api/reports/pending` - Get pending reports for review

### Reviewer
- `POST /api/reviewer/apply` - Apply to become reviewer
- `GET /api/reviewer/profile` - Get reviewer profile
- `POST /api/votes/submit` - Submit vote for report

### Blockchain
- `POST /api/blockchain/publish/{reportId}` - Publish report to blockchain
- `GET /api/blockchain/verify/{transactionHash}` - Verify blockchain transaction

## Database Schema

Refer to [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete database structure, including:
- `app_users` - User accounts and roles
- `reviewer_profiles` - Reviewer qualifications and status
- `reports` - AI output submissions
- `votes` - Reviewer truth scores and evaluations

## Smart Contract

The TruthChain smart contract is deployed on Polygon Amoy Testnet. It stores:
- Report IPFS hashes
- Final truth scores
- Submission timestamps
- Immutable verification records

Contract location: `backend/api 2/TruthChain.sol`

## Environment Variables

Required configuration in `application.properties`:
- Database: `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`
- JWT: `app.jwt.secret`, `app.jwt.expiration-ms`
- OAuth: `spring.security.oauth2.client.registration.google.client-id`, `client-secret`
- Blockchain: `app.blockchain.node-url`, `app.blockchain.witness-private-key`, `app.blockchain.contract-address`
- IPFS: `app.ipfs.pinata-jwt`

## Contributing

This project was developed as part of a hackathon. For contributions or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to all team members of FLOWSTATE2 for their dedication and innovative contributions to building a decentralized truth verification platform for AI-generated content.
