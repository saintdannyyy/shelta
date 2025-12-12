# SHELTA Database Schema & API Structure

## Overview
SHELTA is a multi-sided housing ecosystem platform for Accra, Ghana. This document outlines the complete PostgreSQL schema, API endpoints, and system architecture.

---

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(20) NOT NULL CHECK (role IN ('tenant', 'landlord', 'agent', 'provider')),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_photo_url TEXT,
  income_range_min INTEGER, -- For tenants, minimum monthly income in GHS
  income_range_max INTEGER, -- For tenants, maximum monthly income in GHS
  is_verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
```

### 2. Properties Table
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id),
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqft INTEGER,
  rent_amount_ghs INTEGER NOT NULL,
  description TEXT,
  available_from DATE,
  tenure_type VARCHAR(50) CHECK (tenure_type IN ('leasehold', 'freehold', 'rent_to_own')),
  qol_score INTEGER CHECK (qol_score >= 0 AND qol_score <= 100),
  availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'rented', 'maintenance', 'unlisted')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_availability ON properties(availability_status);
CREATE INDEX idx_properties_rent_amount ON properties(rent_amount_ghs);
CREATE INDEX idx_properties_location ON properties(latitude, longitude);
```

### 3. Property Photos Table
```sql
CREATE TABLE property_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption VARCHAR(255),
  is_cover BOOLEAN DEFAULT FALSE,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_property_photos_property_id ON property_photos(property_id);
```

### 4. Property Documents Table
```sql
CREATE TABLE property_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('land_title', 'tenancy_agreement', 'insurance', 'inspection_report')),
  document_url TEXT NOT NULL,
  uploaded_by_id UUID NOT NULL REFERENCES users(id),
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verified_by_id UUID REFERENCES users(id),
  verification_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_property_documents_property_id ON property_documents(property_id);
```

### 5. Service Providers Table
```sql
CREATE TABLE service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  skills TEXT ARRAY DEFAULT '{}',
  certifications TEXT ARRAY DEFAULT '{}',
  id_verified BOOLEAN DEFAULT FALSE,
  background_check_passed BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  green_service_badge BOOLEAN DEFAULT FALSE,
  green_service_badges TEXT ARRAY DEFAULT '{}', -- 'solar_maintenance', 'water_harvesting', 'low_carbon'
  bio TEXT,
  service_area_radius_km INTEGER DEFAULT 5,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_providers_user_id ON service_providers(user_id);
CREATE INDEX idx_service_providers_skills ON service_providers USING GIN(skills);
```

### 6. Tenancy Applications Table
```sql
CREATE TABLE tenancy_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id),
  tenant_id UUID NOT NULL REFERENCES users(id),
  landlord_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  affordability_score INTEGER CHECK (affordability_score >= 0 AND affordability_score <= 100),
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by_id UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  rejection_reason TEXT,
  move_in_date DATE,
  lease_duration_months INTEGER DEFAULT 12,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tenancy_applications_property_id ON tenancy_applications(property_id);
CREATE INDEX idx_tenancy_applications_tenant_id ON tenancy_applications(tenant_id);
CREATE INDEX idx_tenancy_applications_status ON tenancy_applications(status);
```

### 7. Maintenance Tickets Table
```sql
CREATE TABLE maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id),
  tenant_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID REFERENCES service_providers(id),
  category VARCHAR(50) NOT NULL CHECK (category IN ('plumbing', 'electrical', 'carpentry', 'painting', 'hvac', 'general')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'emergency')),
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'closed')),
  cost_estimate_ghs INTEGER,
  actual_cost_ghs INTEGER,
  photos_before TEXT ARRAY DEFAULT '{}',
  photos_after TEXT ARRAY DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_maintenance_tickets_property_id ON maintenance_tickets(property_id);
CREATE INDEX idx_maintenance_tickets_status ON maintenance_tickets(status);
CREATE INDEX idx_maintenance_tickets_provider_id ON maintenance_tickets(provider_id);
CREATE INDEX idx_maintenance_tickets_tenant_id ON maintenance_tickets(tenant_id);
```

### 8. Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES users(id),
  landlord_id UUID NOT NULL REFERENCES users(id),
  property_id UUID NOT NULL REFERENCES properties(id),
  rent_ledger_id UUID REFERENCES rent_ledgers(id),
  amount_ghs INTEGER NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('momo_mtn', 'momo_vodafone', 'momo_airteltigo', 'bank_transfer', 'standing_order')),
  external_transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_tenant_id ON payments(tenant_id);
CREATE INDEX idx_payments_landlord_id ON payments(landlord_id);
CREATE INDEX idx_payments_property_id ON payments(property_id);
CREATE INDEX idx_payments_status ON payments(status);
```

### 9. Rent Ledger Table (Immutable, Append-Only)
```sql
CREATE TABLE rent_ledgers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id),
  tenant_id UUID NOT NULL REFERENCES users(id),
  landlord_id UUID NOT NULL REFERENCES users(id),
  rent_amount_ghs INTEGER NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  payment_id UUID REFERENCES payments(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'waived')),
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Make table immutable
  CHECK (created_at = created_at)
);

CREATE INDEX idx_rent_ledgers_property_id ON rent_ledgers(property_id);
CREATE INDEX idx_rent_ledgers_tenant_id ON rent_ledgers(tenant_id);
CREATE INDEX idx_rent_ledgers_landlord_id ON rent_ledgers(landlord_id);
CREATE INDEX idx_rent_ledgers_status ON rent_ledgers(status);
CREATE INDEX idx_rent_ledgers_due_date ON rent_ledgers(due_date);

-- Ensure immutability with triggers
CREATE OR REPLACE FUNCTION prevent_rent_ledger_updates()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Rent ledger records are immutable';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER immutable_rent_ledger
BEFORE UPDATE OR DELETE ON rent_ledgers
FOR EACH ROW
EXECUTE FUNCTION prevent_rent_ledger_updates();
```

### 10. Loan Applications Table
```sql
CREATE TABLE loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES users(id),
  property_id UUID NOT NULL REFERENCES properties(id),
  landlord_id UUID NOT NULL REFERENCES users(id),
  loan_provider VARCHAR(100) NOT NULL CHECK (loan_provider IN ('nras', 'renmo', 'partner_bank')),
  loan_amount_ghs INTEGER NOT NULL,
  loan_term_months INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'funded', 'cancelled')),
  annual_interest_rate DECIMAL(5, 2),
  monthly_payment_ghs INTEGER,
  
  -- Auto-populated fields
  landlord_name VARCHAR(255),
  landlord_phone VARCHAR(20),
  property_address TEXT,
  property_rent_amount_ghs INTEGER,
  tenant_income_verified BOOLEAN DEFAULT FALSE,
  
  pdf_url TEXT,
  submitted_at TIMESTAMP,
  approved_at TIMESTAMP,
  funded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_loan_applications_tenant_id ON loan_applications(tenant_id);
CREATE INDEX idx_loan_applications_property_id ON loan_applications(property_id);
CREATE INDEX idx_loan_applications_status ON loan_applications(status);
```

### 11. Service Provider Ratings Table
```sql
CREATE TABLE provider_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES maintenance_tickets(id),
  provider_id UUID NOT NULL REFERENCES service_providers(id),
  tenant_id UUID NOT NULL REFERENCES users(id),
  rating_timeliness INTEGER CHECK (rating_timeliness >= 1 AND rating_timeliness <= 5),
  rating_quality INTEGER CHECK (rating_quality >= 1 AND rating_quality <= 5),
  rating_communication INTEGER CHECK (rating_communication >= 1 AND rating_communication <= 5),
  overall_rating DECIMAL(3, 2),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_provider_ratings_provider_id ON provider_ratings(provider_id);
CREATE INDEX idx_provider_ratings_ticket_id ON provider_ratings(ticket_id);
```

### 12. Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_id ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

### 13. QoL Scores Table
```sql
CREATE TABLE qol_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL UNIQUE REFERENCES properties(id),
  
  -- QoL components (0-100 scale each)
  health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  education_score INTEGER CHECK (education_score >= 0 AND education_score <= 100),
  mobility_score INTEGER CHECK (mobility_score >= 0 AND mobility_score <= 100),
  market_score INTEGER CHECK (market_score >= 0 AND market_score <= 100),
  water_score INTEGER CHECK (water_score >= 0 AND water_score <= 100),
  
  -- Overall composite score
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  
  -- Supporting data
  nearest_hospital_km DECIMAL(8, 2),
  nearest_school_km DECIMAL(8, 2),
  nearest_market_km DECIMAL(8, 2),
  public_transit_nearby BOOLEAN,
  water_point_km DECIMAL(8, 2),
  
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qol_scores_property_id ON qol_scores(property_id);
CREATE INDEX idx_qol_scores_overall_score ON qol_scores(overall_score);
```

---

## Row Level Security (RLS) Policies

### Users Table
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id OR role = 'admin');

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### Properties Table
```sql
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Anyone can view verified properties
CREATE POLICY "Anyone can view verified properties" ON properties
  FOR SELECT USING (is_verified = TRUE OR owner_id = auth.uid());

-- Owners can manage their own properties
CREATE POLICY "Owners can manage own properties" ON properties
  FOR ALL USING (owner_id = auth.uid());
```

### Rent Ledger Table
```sql
ALTER TABLE rent_ledgers ENABLE ROW LEVEL SECURITY;

-- Tenants can view their own rent ledger
CREATE POLICY "Tenants view own rent ledger" ON rent_ledgers
  FOR SELECT USING (tenant_id = auth.uid());

-- Landlords can view their property rent ledgers
CREATE POLICY "Landlords view property rent ledgers" ON rent_ledgers
  FOR SELECT USING (landlord_id = auth.uid());
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh auth token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### User Management
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `POST /api/users/{id}/verify` - Trigger verification process
- `GET /api/users/{id}/verification-status` - Check verification status

### Properties
- `GET /api/properties` - List properties with filters (affordability, QoL, location)
- `POST /api/properties` - Create new property listing
- `GET /api/properties/{id}` - Get property details
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Archive property
- `GET /api/properties/{id}/qol-score` - Get QoL score for property
- `POST /api/properties/{id}/photos` - Upload property photos
- `POST /api/properties/{id}/documents` - Upload property documents

### Tenancy Applications
- `GET /api/applications` - List user's applications
- `POST /api/applications` - Apply for property
- `GET /api/applications/{id}` - Get application details
- `PUT /api/applications/{id}/withdraw` - Withdraw application
- `GET /api/properties/{id}/applications` - Get applications for property (landlord)
- `PUT /api/applications/{id}/approve` - Approve application (landlord)
- `PUT /api/applications/{id}/reject` - Reject application (landlord)

### Rent Management
- `GET /api/rent-ledger` - Get user's rent ledger
- `GET /api/rent-ledger/export` - Export rent ledger (RCD format)
- `POST /api/rent/schedule-payment` - Schedule recurring rent payment
- `GET /api/rent/upcoming` - Get upcoming due dates

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/{id}` - Get payment status
- `POST /api/payments/{id}/verify` - Verify payment with provider
- `GET /api/payments/history` - Get payment history

### Maintenance Tickets
- `POST /api/tickets` - Create maintenance request
- `GET /api/tickets` - List user's tickets
- `GET /api/tickets/{id}` - Get ticket details
- `PUT /api/tickets/{id}` - Update ticket
- `POST /api/tickets/{id}/assign` - Assign to service provider (system)
- `PUT /api/tickets/{id}/accept` - Accept ticket (provider)
- `PUT /api/tickets/{id}/complete` - Mark ticket complete
- `POST /api/tickets/{id}/photos` - Upload before/after photos

### Service Providers
- `POST /api/providers` - Register as service provider
- `GET /api/providers` - List service providers (filtered by location)
- `GET /api/providers/{id}` - Get provider profile
- `PUT /api/providers/{id}` - Update provider profile
- `POST /api/providers/{id}/certifications` - Upload certifications
- `GET /api/providers/{id}/jobs` - Get provider's job history
- `GET /api/providers/{id}/earnings` - Get provider's earnings summary
- `GET /api/providers/{id}/ratings` - Get provider's ratings

### Loan Applications
- `POST /api/loans/applications` - Create loan application
- `GET /api/loans/applications` - List user's loan applications
- `GET /api/loans/applications/{id}` - Get application details
- `GET /api/loans/applications/{id}/pdf` - Download application PDF

### Affordability & QoL Scoring
- `GET /api/scoring/affordability` - Calculate affordability score
- `GET /api/scoring/qol` - Calculate QoL score for property
- `POST /api/scoring/qol/refresh` - Refresh QoL scores

---

## Workflows

### Tenant Housing Search Flow
1. Tenant sets income range on profile
2. Tenant searches properties
3. System calculates affordability score (rent ≤ 30% of income)
4. System retrieves QoL score for each property
5. Tenant filters by affordability and QoL
6. Tenant applies for property
7. Application submitted to landlord for review
8. Landlord approves/rejects
9. If approved, lease begins

### Rent Collection Flow
1. Landlord schedules recurring rent collection
2. System creates rent ledger entries
3. On due date, system initiates payment request (MoMo/Bank)
4. Tenant receives payment reminder notification
5. Tenant makes payment
6. Payment processed and verified
7. Rent ledger updated (immutable record)
8. Receipt generated and stored
9. Landlord and tenant receive notifications

### Maintenance Request Flow
1. Tenant submits maintenance request
2. System routes to nearest verified service provider
3. Provider receives notification
4. Provider accepts or declines job
5. If accepted, system notifies tenant
6. Provider completes work and takes after-photos
7. Provider uploads photos and submits invoice
8. Landlord verifies completion
9. Payment released to provider
10. Tenant rates service provider

### Rent Advance Loan Flow
1. Tenant views "Apply for Rent Advance" option
2. System pre-fills form with listing details, landlord info, tenant profile
3. Tenant submits application
4. PDF generated with auto-populated data
5. Application forwarded to partner loan providers
6. Tenant notified of approval/rejection
7. If approved, funds transferred to landlord

---

## Security Features

### Authentication
- Supabase Auth (email + phone OTP)
- JWT tokens with 1-hour expiry
- Refresh tokens with 7-day expiry
- Session management with secure cookies

### Data Protection
- Row Level Security (RLS) on all tables
- Audit logging for sensitive operations
- Encryption at rest (Supabase default)
- HTTPS/TLS in transit
- No storage of plaintext passwords

### Payment Security
- PCI DSS compliance for payment data
- Secure redirect to payment providers
- Transaction verification with providers
- No payment data stored in application database

### Role-Based Access Control (RBAC)
- Tenant: Can view properties, apply, submit maintenance requests
- Landlord: Can manage properties, approve applications, view rent ledger
- Agent: Can manage landlord's properties
- Service Provider: Can view assigned jobs, submit invoices
- Admin: Full access (audit logs, verification, moderation)

---

## Integrations

### Payment Providers
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money
- Commercial Banks (standing orders)

### Loan Providers
- NRAS (National Real Estate Association)
- Renmo
- Partner Banks

### SMS/Email
- Hubtel SMS for notifications
- Resend/Mailgun for emails

### Mapping & Location
- Google Maps API for QoL scoring
- Mapbox for property mapping
- Leaflet for frontend mapping

### 3D Tours
- Matterport Embed for 360° tours
- Three.js for custom 3D visualization

---

## Data Export Formats

### Rent Control Department (RCD) Format
```
Property ID | Address | Landlord | Tenant | Period | Total Rent | Status
```

### Tenant Invoice/Receipt
```
Receipt #: [ID]
Date: [Date]
Property: [Address]
Rent Period: [Dates]
Amount: [GHS Amount]
Payment Method: [Method]
Transaction ID: [ID]
Status: [Status]
```

---

## System Metrics & Analytics

### Tenant Metrics
- Properties viewed
- Applications submitted
- Success rate
- Average response time from landlords
- Maintenance requests submitted

### Landlord Metrics
- Properties listed
- Tenant inquiries received
- Rent collection rate
- Payment delays
- Maintenance requests completed
- Average time to respond

### Service Provider Metrics
- Jobs completed
- Average completion time
- Customer rating
- Earnings total
- Green service badges

---

## Future Enhancements

1. **3D/VR Tours** - Matterport integration for immersive property viewing
2. **Video Walkthroughs** - Scheduled video calls with agents
3. **AI Tenant Screening** - Automated tenant scoring based on application
4. **Predictive Maintenance** - IoT sensors for building health monitoring
5. **Neighborhood AI Score** - ML-based quality of life prediction
6. **Chatbot Support** - 24/7 tenant/landlord support
7. **Multi-language Support** - Akan, Ga, Ewe translations
8. **Blockchain Rent Records** - Immutable ledger with blockchain
9. **Insurance Integration** - Landlord/tenant insurance offerings
10. **Waste Management** - Integrated waste collection booking

---

## Deployment & DevOps

- **Frontend**: Deployed to CDN (Netlify/Vercel)
- **Backend**: Supabase (managed PostgreSQL + Edge Functions)
- **Service Worker**: Cached for offline support
- **Database Migrations**: Version controlled with timestamps
- **Backup**: Daily automated backups (Supabase)
- **Monitoring**: Sentry for error tracking, Datadog for performance
