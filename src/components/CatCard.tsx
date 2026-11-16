import { useNavigate } from 'react-router-dom';
import type { Category } from '../../data/cat';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../../data/cat';
import './CatCard.css';

interface CategoryCardProps {
  category: Category;
  index: number;
  onSelectSubcategory: (sub: string) => void;
}

export function CategoryCard({
  category,
  onSelectSubcategory,
}: CategoryCardProps) {
  const icon = CATEGORY_ICONS[category.name] ?? '🏪';
  const color = CATEGORY_COLORS[category.name] ?? '#6b7280';
  const navigate = useNavigate()

  return (
    <article
      className="my-2 mr-4"
      style={{ '--accent': color } as React.CSSProperties}
    >
      <header className="flex items-center gap-4">
        <div className="category-card__icon" aria-hidden="true">
          {icon}
        </div>
        <div className="category-card__title-wrap">
          <h3
            className=""
            role="button"
            tabIndex={0}
          >
            {category.name}
          </h3>
        </div>
      </header>

      <div className="flex gap-2 my-2">
        {category.sub.map((sub) => (
          <button
            key={sub}
            type="button"
            className="sub-pill"
            onClick={
              () => {onSelectSubcategory(sub.trim().toLowerCase())
              navigate('/')
              }
            }
          >
            {sub}
          </button>
        ))}
      </div>
    </article>
  );
}