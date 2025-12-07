import { ProductList } from "./components/ProductList";
import { CartSection } from "./components/CartSection";

interface ShopPageProps {
  searchTerm: string;
}

export function ShopPage({ searchTerm }: ShopPageProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <ProductList debouncedSearchTerm={searchTerm} />
      </div>

      <div className="lg:col-span-1">
        <CartSection />
      </div>
    </div>
  );
}
