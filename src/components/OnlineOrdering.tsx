import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const mockMenu: MenuItem[] = [
  {
    id: 1,
    name: 'Chicken Shawarma',
    description: 'Grilled chicken with special spices and garlic sauce',
    price: 8.99,
    category: 'Sandwiches',
  },
  {
    id: 2,
    name: 'Falafel Plate',
    description: 'Fresh falafel with hummus and tahini sauce',
    price: 10.99,
    category: 'Plates',
  },
];

export function OnlineOrdering() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Online Ordering</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockMenu.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <p className="text-sm font-medium mt-2">${item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
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
