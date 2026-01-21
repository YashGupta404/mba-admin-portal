import axios from 'axios';
import { API_URL } from '@/config/api';

// Types matching backend
export interface Program {
    _id: string;
    programId: string;
    name: string;
    shortName?: string;
    description: string;

    // ✅ ADDED — REQUIRED FOR PROGRAM OVERVIEW
    overviewText?: string;

    tagline?: string;
    duration: { value: string; unit: string };
    intake: { value: number; label: string };
    avgPackage: { value: string; label: string };
    features: string[];
    specializations: Array<{ name: string; description: string }>;
    eligibilityCriteria: string[];
    admissionProcess: Array<{ step: number; title: string; description: string }>;
    isActive: boolean;
    displayOrder?: number;
}

export interface Course {
    _id: string;
    courseCode: string;
    courseName: string;
    programId: string;
    department: string;
    level: 'Foundation' | 'Core' | 'Advanced' | 'Elective';
    credits: number;
    description: string;
    instructorName: string;
    semester: number;
    enrolledStudents: number;
    maxCapacity: number;
    status: 'Draft' | 'Under Review' | 'Published' | 'Archived';
    prerequisites: string[];
    learningOutcomes: string[];
    assessmentMethods: string[];
}

export interface CourseByDepartment {
    department: string;
    courses: Course[];
    totalCourses: number;
}

// Programs API
export const programsApi = {
    getAll: async (): Promise<Program[]> => {
        const response = await axios.get(`${API_URL}/programs`);
        return response.data.data;
    },

    getById: async (id: string): Promise<Program> => {
        const response = await axios.get(`${API_URL}/programs/${id}`);
        return response.data.data;
    },

    getByProgramId: async (programId: string): Promise<Program> => {
        const response = await axios.get(`${API_URL}/programs/program/${programId}`);
        return response.data.data;
    },

    create: async (data: Partial<Program>): Promise<Program> => {
        const response = await axios.post(`${API_URL}/programs`, data);
        return response.data.data;
    },

    update: async (id: string, data: Partial<Program>): Promise<Program> => {
        const response = await axios.put(`${API_URL}/programs/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/programs/${id}`);
    },
};

// Courses API
export const coursesApi = {
    getAll: async (params?: {
        programId?: string;
        department?: string;
        level?: string;
        status?: string;
        semester?: number;
    }): Promise<Course[]> => {
        const response = await axios.get(`${API_URL}/courses`, { params });
        return response.data.data;
    },

    getById: async (id: string): Promise<Course> => {
        const response = await axios.get(`${API_URL}/courses/${id}`);
        return response.data.data;
    },

    getByCourseCode: async (courseCode: string): Promise<Course> => {
        const response = await axios.get(`${API_URL}/courses/code/${courseCode}`);
        return response.data.data;
    },

    getByDepartment: async (programId: string): Promise<CourseByDepartment[]> => {
        const response = await axios.get(`${API_URL}/courses/by-department/${programId}`);
        return response.data.data;
    },

    create: async (data: Partial<Course>): Promise<Course> => {
        const response = await axios.post(`${API_URL}/courses`, data);
        return response.data.data;
    },

    update: async (id: string, data: Partial<Course>): Promise<Course> => {
        const response = await axios.put(`${API_URL}/courses/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/courses/${id}`);
    },

    bulkUpdateStatus: async (courseIds: string[], status: string): Promise<Course[]> => {
        const response = await axios.patch(`${API_URL}/courses/bulk-status`, {
            courseIds,
            status,
        });
        return response.data.data;
    },
};

// Department colors mapping
export const departmentColors: Record<string, string> = {
    'Finance & Strategy': 'blue',
    'Marketing & Analytics': 'pink',
    'Technology & Innovation': 'purple',
    'Operations & Supply Chain': 'orange',
    'Business Analytics': 'cyan',
    'Entrepreneurship': 'red',
    'Human Resources': 'teal',
    'General Management': 'indigo',
};

// Status colors mapping
export const statusColors: Record<string, string> = {
    'Draft': 'gray',
    'Under Review': 'orange',
    'Published': 'green',
    'Archived': 'slate',
};
