import { useState } from "react";
import { Search, MapPin, Menu, List, Map as MapIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { StoreCard } from "../components/StoreCard";
import { categories, stores } from "../../data/data";

interface DiscoverScreenProps {
  onOpenSidebar: () => void;
  onSelectStore: (id: string) => void;
  view: "list" | "map";
  setView: (v: "list" | "map") => void;
}

export function DiscoverScreen({ onOpenSidebar, onSelectStore, view, setView }: DiscoverScreenProps) {
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = activeCat === "All"
    ? stores
    : stores.filter((s) => s.category === activeCat);

  const sorted = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="space-y-3 border-b p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search stores..." className="pl-9" />
          </div>
          <div className="flex items-center gap-1 rounded-md border px-2 py-2 text-xs font-medium">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Near me
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-lg border p-0.5">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium ${
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <List className="h-4 w-4" /> List
            </button>
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium ${
                view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <MapIcon className="h-4 w-4" /> Map
            </button>
          </div>
        </div>

        {/* Categories */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-1">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  activeCat === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </header>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="space-y-3 p-4">
          {sorted.map((store) => (
            <StoreCard key={store.id} store={store} onClick={() => onSelectStore(store.id)} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}