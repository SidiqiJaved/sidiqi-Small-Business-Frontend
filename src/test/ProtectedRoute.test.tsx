import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { useAuthStore } from '../stores/useAuthStore';

// Mock the auth store
vi.mock('../stores/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('ProtectedRoute', () => {
  it('renders children when authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      role: 'owner',
    } as any);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: false,
      role: null,
    } as any);

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(container).not.toHaveTextContent('Protected Content');
  });
});
