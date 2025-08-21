import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { Badge } from './ui/badge';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  status: 'in-stock' | 'low' | 'out-of-stock';
}

// Mock data - replace with actual API call
const mockInventory: InventoryItem[] = [
  { id: 1, name: 'Chicken', quantity: 50, unit: 'kg', status: 'in-stock' },
  { id: 2, name: 'Rice', quantity: 100, unit: 'kg', status: 'in-stock' },
  { id: 3, name: 'Bread', quantity: 5, unit: 'kg', status: 'low' },
];

export function InventoryManagement() {
  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => mockInventory,
  });

  if (isLoading) {
    return <div>Loading inventory...</div>;
  }

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock':
        return 'default';
      case 'low':
        return 'secondary';
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Inventory Management</CardTitle>
            <Button>Add Item</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventory?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} {item.unit}
                  </p>
                </div>
                <Badge variant={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
