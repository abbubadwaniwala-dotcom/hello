import shops from "../../data/shops.json";
import { Star, CheckCircle2 } from "lucide-react";

interface ShopListProps {
  onSelect: (shopId: number) => void;
  selectedId: number | null;
}

export function ShopList({ onSelect, selectedId }: ShopListProps) {
  return (
    <div className="h-full overflow-y-auto border-r bg-background">
      <div className="p-3 border-b">
        <h2 className="font-semibold text-sm">Nearby Photocopy Shops</h2>
        <p className="text-xs text-muted-foreground">{shops.length} found</p>
      </div>
      <div className="divide-y">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => onSelect(shop.id)}
            className={`w-full text-left p-3 hover:bg-accent transition-colors ${
              selectedId === shop.id ? "bg-amber-200" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate flex items-center gap-1">
                  {shop.name}
                  {shop.verified && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  )}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {shop.address}
                </p>
              </div>
              <span className="text-xs font-semibold flex items-center gap-0.5 shrink-0 bg-muted px-1.5 py-0.5 rounded">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                {shop.rating}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}