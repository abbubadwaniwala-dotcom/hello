import { useState } from 'react';
import { Separator } from './ui/separator';
import { useShopStore } from '../store';

export default function FilterPanel() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Notify parent of filter changes

  const {filters:{maxDistance, status}, setFilters,resetFilters} = useShopStore()


  return (
    <div className="w-full max-w-[30vw] lg:max-w-[20vw] mx-auto bg-white shadow-xl shadow-slate-200/70 p-7">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 mb-7">
        <span>⚙️</span> Filters
      </h2>
      <Separator className="border border-divider" />
      {/* 1. Radius */}
      <section className="my-7">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 font-medium text-slate-800 text-sm">
            <span>📍</span> Radius
          </label>
          <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
            {maxDistance} km
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={maxDistance}
          onChange={(e)=> setFilters({maxDistance: Number(e.target.value) || 0})}
          aria-label="Radius in kilometers"
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer
                     accent-slate-800
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-slate-800
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-white
                     [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110"
        />
        <div className="flex justify-between text-xs text-slate-500 font-medium mt-2 px-0.5">
          <span>0 km</span>
          <span>50 km</span>
        </div>
      </section>

      <Separator className="border border-divider" />


      {/* 2. Star Rating */}
      <section className="my-7">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 font-medium text-slate-800 text-sm">
            <span>⭐</span> Rating
          </label>
          <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
            {rating}★
          </span>
        </div>
        <div className="flex flex-row-reverse justify-end gap-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const filled = star <= (hoverRating || rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => {}}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                className={`text-3xl leading-none transition-transform hover:scale-110 ${
                  filled ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                ★
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {rating} {rating === 1 ? 'star' : 'stars'} or more
        </p>
      </section>

      <Separator className="border border-divider" />


      {/* 3. Open / Closed */}
      <section className="my-7">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 font-medium text-slate-800 text-sm">
            <span>🕒</span> Status
          </label>
          <span className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'All'}
          </span>
        </div>
        <div className="flex bg-slate-100 rounded-full p-1">
          {[
            { key: 'open', label: 'Open', icon: '🟢' },
            { key: 'closed', label: 'Closed', icon: '🔴' },
          ].map(({ key, label, icon }) => {
            const active = status === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilters({status: key})}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <span>{icon}</span> {label}
              </button>
            );
          })}
        </div>
      </section>

      <Separator className="border border-divider mb-7" />

      <button
        type="button"
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-colors active:scale-[0.98]"
      >
        <span>↻</span> Reset filters
      </button>
    </div>
  );
}