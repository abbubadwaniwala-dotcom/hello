import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES } from '../../data/cat';
import { CategoryCard } from '../components/CatCard';
import './CatPage.css';
import { useShopStore } from '../store';
import { useCategories } from '../store/selectors';




export function CategoriesPage() {
  const [query, setQuery] = useState('');
  const {setFilters} = useShopStore()

  // Filter categories + subcats by search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;

    return CATEGORIES.map((cat) => {
      const catMatch = cat.name.toLowerCase().includes(q);
      const matchedSubs = cat.sub.filter((s) => s.toLowerCase().includes(q));
      if (catMatch) return cat;
      if (matchedSubs.length === 0) return null;
      return { ...cat, sub: matchedSubs };
    }).filter((c): c is NonNullable<typeof c> => c !== null);
  }, [query]);

  return (
    <div className='h-screen p-6 w-full'>
    <div className="overflow-auto flex items-center justify-between">
      <header className="my-4">
        <h1 className="text-2xl">🛍️ All Categories</h1>
        <p className="text-[#6b7280]">
          {CATEGORIES.length} categories ·{' '}
          {CATEGORIES.reduce((n, c) => n + c.sub.length, 0)} subcategories
        </p>
        </header>

        <div className="border border-divider py-2 px-6 rounded-full">
          <input
            type="search"
            placeholder={'Search'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search categories"
          />
          {query && (
            <button
              type="button"
              className="categories-page__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        </div>
      {filtered.length === 0 ? (
        <div className="categories-page__empty">
          No categories match “{query}”.
        </div>
      ) : (
        <div className="grid ">
          {filtered.map((category, i) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={i}
              onSelectSubcategory={(value)=>{
                setFilters({category: value})
              }}
            />
          ))}
        </div>
      )}
    </div>

  )
}