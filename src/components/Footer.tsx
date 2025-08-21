export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-muted-foreground">
              Providing quality halal food and franchise opportunities since 2025.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: info@halalmunchies.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Main St, City, State</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Franchise Agreement</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Halal Munchies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
