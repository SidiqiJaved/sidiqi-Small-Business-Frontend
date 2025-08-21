import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLocations } from '@/hooks/api';

export function LocationsSection() {
  const { data: locations, isLoading } = useLocations();

  if (isLoading) {
    return <div>Loading locations...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Our Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations?.map((location) => (
              <Card key={location.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{location.name}</h3>
                  <p className="text-muted-foreground">{location.address}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
