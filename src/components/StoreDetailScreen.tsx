import { ArrowLeft, MapPin, Clock, Navigation, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";


const reviews = [
  { name: "Aarav S.", rating: 5, text: "Best coffee in the neighborhood. Friendly staff!" },
  { name: "Priya M.", rating: 4, text: "Great ambiance, slightly pricey but worth it." },
  { name: "Rahul K.", rating: 5, text: "Quick service and fresh products every time." },
];

export function StoreDetailScreen({store = {
  image: '',
  name: 'kirana shop',
  open: true,
  rating: 8,
  reviews: 7,
  address: 'ABC street',
  distance: 24,
  category: 'kirana'
}}) {


  return (
    <ScrollArea className="h-full">
      {/* Photo header */}
      <div className="relative">
        <img src={store?.image} alt={store.name} className="h-56 w-full object-cover" />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 rounded-full shadow-md"
          onClick={()=>{}}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-5 p-4">
        {/* Title + rating */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-2xl font-bold">{store.name}</h1>
            <Badge className={store.open ? "bg-green-600" : ""}>
              {store.open ? "Open now" : "Closed"}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{store.rating}</span>
            <span className="text-muted-foreground">
              ({store.reviews.toLocaleString()} reviews)
            </span>
            <span className="rounded bg-muted px-2 py-0.5 text-xs">{store.category}</span>
          </div>
        </div>

        {/* Info */}
        <Card className="space-y-3 p-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{store.address}</span>
            <span className="text-muted-foreground">· {store.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Open until 9:00 PM</span>
          </div>
          <Button className="w-full gap-2">
            <Navigation className="h-4 w-4" /> Get directions
          </Button>
        </Card>

        {/* Rating breakdown */}
        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Rating breakdown</h3>
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 6 : star === 2 ? 3 : 1;
            return (
              <div key={star} className="mb-1.5 flex items-center gap-2 text-xs">
                <span className="w-8">{star} ★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{pct}%</span>
              </div>
            );
          })}
        </Card>

        {/* Reviews */}
        <div>
          <h3 className="mb-3 font-semibold">Recent reviews</h3>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <Card key={i} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{r.name}</span>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}