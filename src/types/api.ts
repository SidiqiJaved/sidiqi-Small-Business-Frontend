// Types for our API responses
export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface Inspection {
  id: number;
  date: string;
  score: number;
  status: 'passed' | 'failed' | 'pending';
  storeId?: number;
}

export interface CreateInspectionPayload {
  date: string;
  score: number;
  storeId: number;
  notes?: string;
}
