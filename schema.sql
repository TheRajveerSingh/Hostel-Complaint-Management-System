-- Hostel Complaint Management System - Supabase Schema
-- Run this in the Supabase SQL Editor

-- 1. Create Tables

-- Users unified table (stores all user types with registration info)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('student', 'staff', 'warden', 'supervisor')),
    name TEXT,
    phone_number TEXT,
    registration_number TEXT, -- For students
    staff_id TEXT, -- For maintenance staff
    warden_id TEXT, -- For wardens
    supervisor_id TEXT, -- For supervisors
    hostel_id UUID, -- For students/wardens
    category TEXT[], -- For maintenance staff (array of categories)
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_users_auth FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE hostels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    college_email TEXT NOT NULL UNIQUE,
    hostel_id UUID REFERENCES hostels(id) ON DELETE CASCADE NOT NULL,
    room_number TEXT NOT NULL,
    registration_number TEXT NOT NULL UNIQUE,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE wardens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    hostel_id UUID REFERENCES hostels(id) ON DELETE CASCADE NOT NULL,
    staff_id TEXT NOT NULL UNIQUE,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE maintenance_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    staff_id TEXT NOT NULL UNIQUE,
    categories TEXT[] NOT NULL, -- e.g. ['Electrician', 'Plumber']
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_busy BOOLEAN DEFAULT false,
    current_location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE supervisor_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    hostel_id UUID REFERENCES hostels(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('mild','normal','extreme')),
    photos TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','resolved','escalated')),
    priority TEXT,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    is_emergency BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE NOT NULL UNIQUE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Basic Setup (RLS & Triggers)
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE wardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE supervisor_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Note: Proper RLS policies and Supabase auth sync triggers will be implemented depending on final user choice.
-- For now, supervisor_credentials contains manual login info.
-- Example seeding:
-- INSERT INTO supervisor_credentials(username, password_hash) VALUES ('admin', 'hashed_pass_here');
