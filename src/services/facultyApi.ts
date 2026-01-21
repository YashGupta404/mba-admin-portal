// Faculty API Service - Calls backend API
import { API_URL } from '@/config/api';

const API_BASE_URL = API_URL;

// Faculty interface matching your backend schema
export interface Faculty {
    id: number;
    name: string;
    title: string;
    specialization: string;
    email: string;
    slug?: string;
    image?: string;
    bio?: string;
    achievements?: string;
    linkedin?: string;
    publications?: number;
    students?: number;
    qualifications?: string[];
    researchAreas?: string[];
    currentProjects?: { name: string; status: string }[];
}

// Type for creating/updating faculty (without slug as it's auto-generated)
export type FacultyInput = Omit<Faculty, 'slug'>;

// Fetch all faculty from the database
export async function fetchAllFaculty(): Promise<Faculty[]> {
    const response = await fetch(`${API_BASE_URL}/faculty`);
    if (!response.ok) {
        throw new Error('Failed to fetch faculty');
    }
    return response.json();
}

// Get a single faculty by ID
export async function getFacultyById(id: number): Promise<Faculty> {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch faculty');
    }
    return response.json();
}

// Create a new faculty member
export async function createFaculty(data: FacultyInput): Promise<Faculty> {
    const response = await fetch(`${API_BASE_URL}/faculty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create faculty');
    }
    return response.json();
}

// Update an existing faculty member
export async function updateFaculty(id: number, data: Partial<FacultyInput>): Promise<Faculty> {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update faculty');
    }
    return response.json();
}

// Delete a faculty member
export async function deleteFaculty(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete faculty');
    }
}

// Helper: Get next available ID by finding max ID and adding 1
export async function getNextFacultyId(): Promise<number> {
    const allFaculty = await fetchAllFaculty();
    if (allFaculty.length === 0) return 1;
    const maxId = Math.max(...allFaculty.map(f => f.id));
    return maxId + 1;
}
