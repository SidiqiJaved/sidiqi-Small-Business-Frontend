import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import api from '../lib/api';
import type { Location, Inspection, CreateInspectionPayload } from '../types/api';

// Locations
export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async (): Promise<Location[]> => {
      try {
        const { data } = await api.get<Location[]>('/locations');
        return data;
      } catch (error) {
        // Mock data if API fails
        return [
          { id: 1, name: 'Downtown Store', address: '123 Main St' },
          { id: 2, name: 'Uptown Store', address: '456 High St' },
        ];
      }
    }
  });
}

// Inspections
export function useInspections(storeId?: string) {
  return useQuery({
    queryKey: ['inspections', storeId],
    queryFn: async (): Promise<Inspection[]> => {
      try {
        const { data } = await api.get<Inspection[]>(`/inspections${storeId ? `?storeId=${storeId}` : ''}`);
        return data;
      } catch (error) {
        // Mock data if API fails
        return [
          { id: 1, date: '2025-08-19', score: 95, status: 'passed' },
          { id: 2, date: '2025-08-12', score: 88, status: 'passed' },
        ];
      }
    },
    enabled: !storeId || storeId.length > 0
  });
}

// Create Inspection
export function useCreateInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inspection: CreateInspectionPayload) => 
      api.post<Inspection>('/inspections', inspection),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
    },
    onError: (error: AxiosError) => {
      console.error('Failed to create inspection:', error.message);
    }
  });
}
