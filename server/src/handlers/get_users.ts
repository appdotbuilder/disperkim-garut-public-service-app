import { type User, type OptionalSearchInput } from '../schema';

export async function getUsers(input?: OptionalSearchInput): Promise<{ users: User[], total: number }> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching users with pagination, search, and filtering capabilities.
    // Should exclude soft-deleted users unless specifically requested.
    // Should support searching by name, email, NIK, and filtering by role, active status.
    return Promise.resolve({
        users: [],
        total: 0
    });
}

export async function getUserById(id: number): Promise<User | null> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching a single user by ID with role information.
    // Should return null if user doesn't exist or is soft-deleted.
    return Promise.resolve(null);
}