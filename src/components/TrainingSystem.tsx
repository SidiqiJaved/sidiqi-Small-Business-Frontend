import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TrainingModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const mockTrainingModules: TrainingModule[] = [
  {
    id: 1,
    title: 'Food Safety Basics',
    description: 'Learn the fundamentals of food safety and handling',
    duration: '2 hours',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Customer Service Excellence',
    description: 'Master the art of exceptional customer service',
    duration: '1.5 hours',
    status: 'in-progress',
  },
];

interface TrainingSystemProps {
  userRole?: string;
}

export function TrainingSystem({ userRole }: TrainingSystemProps) {
  const getStatusColor = (status: TrainingModule['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'not-started':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Training System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTrainingModules.map((module) => (
              <Card key={module.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={getStatusColor(module.status)}>
                          {module.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {module.duration}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline">Start Module</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
