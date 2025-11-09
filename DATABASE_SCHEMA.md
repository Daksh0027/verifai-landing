# Database Schema Documentation

## Overview
This document describes the complete database schema for the VerifAI TruthChain application. The application uses **PostgreSQL** as its database management system.

---

## Quick Setup Guide

### Prerequisites
- PostgreSQL 12 or higher
- Java 17 or higher
- Maven 3.6+

### Database Setup Steps

1. **Install PostgreSQL**
   ```bash
   # macOS
   brew install postgresql@14
   brew services start postgresql@14
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```bash
   # Access PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE truthchain_db;
   
   # Exit psql
   \q
   ```

3. **Configure Application**
   - Copy `backend/api 2/src/main/resources/application.properties.template` to `application.properties`
   - Update the following properties:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/truthchain_db
   spring.datasource.username=postgres
   spring.datasource.password=YOUR_POSTGRES_PASSWORD_HERE
   ```

4. **Run Application**
   ```bash
   cd "backend/api 2"
   ./mvnw spring-boot:run
   ```
   
   The application will automatically create all tables on first run using JPA/Hibernate.

---

## Database Schema

### Database Name: `truthchain_db`

---

## Tables

### 1. `app_users`
Stores user account information for all users (reporters, reviewers, and admins).

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Auto-incrementing user ID |
| `username` | VARCHAR(255) | NOT NULL, UNIQUE | User's email address (used as username) |
| `password` | VARCHAR(255) | NOT NULL | Encrypted password hash |
| `role` | VARCHAR(50) | NOT NULL | User role enum: 'ROLE_REPORTER', 'ROLE_REVIEWER', 'ROLE_ADMIN' |

**Relationships:**
- One-to-One with `reviewer_profiles` (via `user_id`)
- One-to-Many with `reports` (as submitter)
- One-to-Many with `votes` (as reviewer)

**SQL Creation:**
```sql
CREATE TABLE app_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT chk_role CHECK (role IN ('ROLE_REPORTER', 'ROLE_REVIEWER', 'ROLE_ADMIN'))
);

CREATE INDEX idx_users_username ON app_users(username);
CREATE INDEX idx_users_role ON app_users(role);
```

---

### 2. `reviewer_profiles`
Stores additional profile information for users who have applied to become reviewers.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `user_id` | BIGINT | PRIMARY KEY, FOREIGN KEY | References `app_users.id` |
| `wallet_address` | VARCHAR(255) | UNIQUE | Blockchain wallet address for rewards |
| `credits` | NUMERIC(19,2) | NOT NULL, DEFAULT 0 | Reviewer earnings/credits |
| `application_status` | VARCHAR(50) | NOT NULL | Status: 'PENDING', 'APPROVED', 'REJECTED' |
| `education` | VARCHAR(255) | NOT NULL | Educational background |
| `qualification_details` | TEXT | | Detailed qualifications |
| `years_of_experience` | INTEGER | NOT NULL | Years of relevant experience |
| `expertise_area` | VARCHAR(255) | NOT NULL | Area of expertise (AI/ML, NLP, Blockchain, etc.) |
| `motivation` | TEXT | | Why they want to be a reviewer |
| `applied_at` | TIMESTAMP | NOT NULL | When application was submitted |
| `reviewed_by` | VARCHAR(255) | | Admin who reviewed the application |
| `reviewed_at` | TIMESTAMP | | When application was reviewed |
| `review_notes` | TEXT | | Admin's notes on the application |

**Relationships:**
- One-to-One with `app_users` (via `user_id`)

**SQL Creation:**
```sql
CREATE TABLE reviewer_profiles (
    user_id BIGINT PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE,
    credits NUMERIC(19,2) NOT NULL DEFAULT 0,
    application_status VARCHAR(50) NOT NULL,
    education VARCHAR(255) NOT NULL,
    qualification_details TEXT,
    years_of_experience INTEGER NOT NULL,
    expertise_area VARCHAR(255) NOT NULL,
    motivation TEXT,
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_by VARCHAR(255),
    reviewed_at TIMESTAMP,
    review_notes TEXT,
    CONSTRAINT fk_reviewer_user FOREIGN KEY (user_id) 
        REFERENCES app_users(id) ON DELETE CASCADE,
    CONSTRAINT chk_application_status CHECK (application_status IN ('PENDING', 'APPROVED', 'REJECTED'))
);

CREATE INDEX idx_reviewer_status ON reviewer_profiles(application_status);
CREATE INDEX idx_reviewer_wallet ON reviewer_profiles(wallet_address);
```

---

### 3. `reports`
Stores AI model output reports submitted by users for truth verification.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Auto-incrementing report ID |
| `model_name` | VARCHAR(255) | NOT NULL | Name of the AI model (e.g., GPT-4, Claude) |
| `prompt` | TEXT | NOT NULL | The input prompt given to the AI |
| `model_output` | TEXT | NOT NULL | The AI's response/output |
| `status` | VARCHAR(50) | NOT NULL | Status: 'PENDING', 'UNDER_REVIEW', 'FINALIZED' |
| `created_at` | TIMESTAMP | NOT NULL | When report was created (auto-generated) |
| `final_truth_score` | INTEGER | | Final calculated truth score (0-10) |
| `ipfs_hash` | VARCHAR(255) | | IPFS hash for decentralized storage |
| `transaction_hash` | VARCHAR(255) | | Blockchain transaction hash |
| `blockchain_published_at` | TIMESTAMP | | When published to blockchain |
| `user_id` | BIGINT | NOT NULL, FOREIGN KEY | References `app_users.id` (submitter) |

**Relationships:**
- Many-to-One with `app_users` (via `user_id`)
- One-to-Many with `votes`

**SQL Creation:**
```sql
CREATE TABLE reports (
    id BIGSERIAL PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    model_output TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    final_truth_score INTEGER,
    ipfs_hash VARCHAR(255),
    transaction_hash VARCHAR(255),
    blockchain_published_at TIMESTAMP,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_report_user FOREIGN KEY (user_id) 
        REFERENCES app_users(id) ON DELETE CASCADE,
    CONSTRAINT chk_report_status CHECK (status IN ('PENDING', 'UNDER_REVIEW', 'FINALIZED')),
    CONSTRAINT chk_truth_score CHECK (final_truth_score >= 0 AND final_truth_score <= 10)
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_reports_created ON reports(created_at);
CREATE INDEX idx_reports_ipfs ON reports(ipfs_hash);
CREATE INDEX idx_reports_tx_hash ON reports(transaction_hash);
```

---

### 4. `votes`
Stores individual reviewer votes/scores for reports, including detailed breakdowns.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | BIGSERIAL | PRIMARY KEY | Auto-incrementing vote ID |
| `score` | INTEGER | NOT NULL | Overall score given (0-10) |
| `signature` | VARCHAR(255) | NOT NULL | Digital signature for verification |
| `explanation` | TEXT | NOT NULL | Reviewer's explanation for their score |
| `score_breakdown` | JSONB | | JSON object with detailed score metrics |
| `voted_at` | TIMESTAMP | NOT NULL | When vote was submitted (auto-generated) |
| `report_id` | BIGINT | NOT NULL, FOREIGN KEY | References `reports.id` |
| `reviewer_id` | BIGINT | NOT NULL, FOREIGN KEY | References `app_users.id` (reviewer) |

**Relationships:**
- Many-to-One with `reports` (via `report_id`)
- Many-to-One with `app_users` (via `reviewer_id`)

**SQL Creation:**
```sql
CREATE TABLE votes (
    id BIGSERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    signature VARCHAR(255) NOT NULL,
    explanation TEXT NOT NULL,
    score_breakdown JSONB,
    voted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    report_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    CONSTRAINT fk_vote_report FOREIGN KEY (report_id) 
        REFERENCES reports(id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_reviewer FOREIGN KEY (reviewer_id) 
        REFERENCES app_users(id) ON DELETE CASCADE,
    CONSTRAINT chk_vote_score CHECK (score >= 0 AND score <= 10),
    CONSTRAINT unique_vote_per_reviewer UNIQUE (report_id, reviewer_id)
);

CREATE INDEX idx_votes_report ON votes(report_id);
CREATE INDEX idx_votes_reviewer ON votes(reviewer_id);
CREATE INDEX idx_votes_voted_at ON votes(voted_at);
```

**Note:** The `score_breakdown` JSONB column stores structured data like:
```json
{
  "accuracy": 9,
  "relevance": 8,
  "bias": 7,
  "completeness": 9,
  "factuality": 8
}
```

---

## Entity Relationships Diagram (ERD)

```
┌─────────────────┐
│   app_users     │
│─────────────────│
│ id (PK)         │◄─────────────┐
│ username        │              │
│ password        │              │
│ role            │              │
└─────────────────┘              │
        │                        │
        │ 1:1                    │
        │                        │
        ▼                        │
┌─────────────────────────┐     │
│  reviewer_profiles      │     │
│─────────────────────────│     │
│ user_id (PK, FK)        │     │
│ wallet_address          │     │
│ credits                 │     │
│ application_status      │     │
│ education               │     │
│ qualification_details   │     │
│ years_of_experience     │     │
│ expertise_area          │     │
│ motivation              │     │
│ applied_at              │     │
│ reviewed_by             │     │
│ reviewed_at             │     │
│ review_notes            │     │
└─────────────────────────┘     │
                                │
                                │ 1:N
                                │
        ┌───────────────────────┼──────────────────────┐
        │                       │                      │
        ▼                       ▼                      ▼
┌─────────────────┐     ┌─────────────────┐   ┌─────────────────┐
│     reports     │     │      votes      │   │      votes      │
│─────────────────│     │─────────────────│   │─────────────────│
│ id (PK)         │◄────│ id (PK)         │   │ (reviewer_id FK)│
│ model_name      │ 1:N │ score           │   └─────────────────┘
│ prompt          │     │ signature       │
│ model_output    │     │ explanation     │
│ status          │     │ score_breakdown │
│ created_at      │     │ voted_at        │
│ final_truth_score│    │ report_id (FK)  │
│ ipfs_hash       │     │ reviewer_id (FK)│
│ transaction_hash│     └─────────────────┘
│ blockchain_...  │
│ user_id (FK)    │
└─────────────────┘
```

---

## Enumerations

### UserRole
```java
ROLE_REPORTER  // Regular user who submits reports
ROLE_REVIEWER  // Approved reviewer who can vote on reports
ROLE_ADMIN     // Administrator with full access
```

### ReportStatus
```java
PENDING       // Report submitted, awaiting reviewers
UNDER_REVIEW  // Currently being reviewed by reviewers
FINALIZED     // Review complete, final score calculated
```

### ApplicationStatus
```java
PENDING   // Application submitted, awaiting admin review
APPROVED  // Application approved, user is now a reviewer
REJECTED  // Application rejected
```

---

## Sample Data

### Sample User (Reporter)
```sql
INSERT INTO app_users (username, password, role) 
VALUES ('user@example.com', '$2a$10$...hashed_password...', 'ROLE_REPORTER');
```

### Sample User (Reviewer)
```sql
-- Insert user
INSERT INTO app_users (username, password, role) 
VALUES ('reviewer@example.com', '$2a$10$...hashed_password...', 'ROLE_REVIEWER');

-- Insert reviewer profile
INSERT INTO reviewer_profiles (
    user_id, wallet_address, credits, application_status,
    education, years_of_experience, expertise_area, motivation, applied_at
) VALUES (
    1, '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 1250.00, 'APPROVED',
    'PhD in Computer Science', 5, 'AI/ML & NLP',
    'Passionate about AI truth verification', CURRENT_TIMESTAMP
);
```

### Sample Report
```sql
INSERT INTO reports (
    model_name, prompt, model_output, status, user_id
) VALUES (
    'GPT-4',
    'What is the impact of climate change on polar ice caps?',
    'Climate change has significantly accelerated the melting of polar ice caps...',
    'PENDING',
    1
);
```

### Sample Vote
```sql
INSERT INTO votes (
    score, signature, explanation, score_breakdown, report_id, reviewer_id
) VALUES (
    9,
    'sig_abc123...',
    'Well-researched response with accurate scientific data',
    '{"accuracy": 9, "relevance": 9, "bias": 8, "completeness": 9}',
    1,
    2
);
```

---

## Database Maintenance

### Backup Database
```bash
pg_dump -U postgres truthchain_db > truthchain_backup.sql
```

### Restore Database
```bash
psql -U postgres truthchain_db < truthchain_backup.sql
```

### Reset Database (Development Only)
```bash
psql -U postgres -c "DROP DATABASE IF EXISTS truthchain_db;"
psql -U postgres -c "CREATE DATABASE truthchain_db;"
```

---

## Performance Optimization

### Recommended Indexes
All necessary indexes are created in the SQL statements above. Key indexes include:

1. **Users**: username, role
2. **Reviewer Profiles**: application_status, wallet_address
3. **Reports**: status, user_id, created_at, ipfs_hash, transaction_hash
4. **Votes**: report_id, reviewer_id, voted_at

### Query Optimization Tips

1. **Use EXPLAIN ANALYZE** to check query performance
   ```sql
   EXPLAIN ANALYZE SELECT * FROM reports WHERE status = 'PENDING';
   ```

2. **Pagination for large result sets**
   ```sql
   SELECT * FROM reports 
   ORDER BY created_at DESC 
   LIMIT 20 OFFSET 0;
   ```

3. **Use JOIN efficiently**
   ```sql
   SELECT r.*, u.username 
   FROM reports r 
   JOIN app_users u ON r.user_id = u.id 
   WHERE r.status = 'FINALIZED';
   ```

---

## Security Considerations

1. **Password Storage**: All passwords are hashed using BCrypt (strength 10)
2. **SQL Injection Prevention**: Use JPA/Hibernate parameterized queries
3. **Database Credentials**: Store in environment variables or secure config
4. **JSONB Validation**: Validate JSON structure before insertion
5. **Regular Backups**: Schedule automated daily backups
6. **Access Control**: Limit database user permissions to minimum required

---

## Migration Notes

### If you're migrating from a different setup:

1. **Export existing data** using `pg_dump`
2. **Create new database** with proper schema
3. **Import data** using `psql` or data migration scripts
4. **Verify constraints** and foreign keys
5. **Update application.properties** with new connection details
6. **Run integration tests** to verify functionality

---

## Troubleshooting

### Common Issues

**Issue 1: Connection Refused**
```
Solution: Ensure PostgreSQL is running
brew services start postgresql@14  # macOS
sudo systemctl start postgresql    # Linux
```

**Issue 2: Authentication Failed**
```
Solution: Update pg_hba.conf to allow local connections
Location: /etc/postgresql/[version]/main/pg_hba.conf
Change: peer → md5 for local connections
```

**Issue 3: Table Already Exists**
```
Solution: Check spring.jpa.hibernate.ddl-auto setting
- validate: Only validate schema (recommended for production)
- update: Update schema automatically
- create: Create new schema (drops existing)
- create-drop: Create and drop on shutdown
```

**Issue 4: JSONB Type Not Supported**
```
Solution: Ensure PostgreSQL 9.4+ is installed
PostgreSQL JSONB requires version 9.4 or higher
```

---

## Additional Resources

- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Spring Data JPA**: https://spring.io/projects/spring-data-jpa
- **Hibernate ORM**: https://hibernate.org/orm/documentation/
- **Database Design Best Practices**: https://www.postgresql.org/docs/current/ddl-basics.html

---

## Support

For issues or questions about the database schema:
1. Check this documentation first
2. Review the Java entity models in `/backend/api 2/src/main/java/com/truthchain/api/model/`
3. Check application logs for SQL errors
4. Open an issue on GitHub with relevant error messages

---

**Last Updated**: November 2025  
**Schema Version**: 1.0  
**Compatible with**: PostgreSQL 12+, Java 17+, Spring Boot 3.x
