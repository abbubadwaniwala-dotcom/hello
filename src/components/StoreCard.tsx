import { Star, MapPin } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import type { Store } from "../../data/data";

export function StoreCard({ store, onClick }: { store: Store; onClick?: () => void }) {
  return (
    <Card
      onClick={onClick}
      className="flex cursor-pointer gap-3 overflow-hidden p-3 transition-shadow hover:shadow-md"
    >
      <img
        src={store.image}
        alt={store.name}
        className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-semibold">{store.name}</h3>
            <Badge
              variant={store.open ? "default" : "secondary"}
              className={store.open ? "bg-green-600 text-white" : ""}
            >
              {store.open ? "Open" : "Closed"}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{store.rating}</span>
            <span className="text-muted-foreground">({store.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded bg-muted px-1.5 py-0.5">{store.category}</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {store.distance}
          </span>
        </div>
      </div>
    </Card>
  );
}