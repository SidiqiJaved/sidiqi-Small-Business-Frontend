import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useInspections } from '@/hooks/api';
import { Badge } from './ui/badge';

interface InspectionManagementProps {
  userRole?: string;
}

export function InspectionManagement({ userRole }: InspectionManagementProps) {
  const { data: inspections, isLoading } = useInspections();
  const [selectedLocation] = useState<string | null>(null);

  if (isLoading) {
    return <div>Loading inspections...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Quality Inspections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inspections?.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">Date: {inspection.date}</p>
                  <p>Score: {inspection.score}</p>
                </div>
                <Badge variant={inspection.status === 'passed' ? 'default' : 'destructive'}>
                  {inspection.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Schedule New Inspection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
