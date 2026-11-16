import * as Lucide from "lucide-react";
import { shopIcons, type ShopIconKey } from "../assets/svg";
import { Store } from "lucide-react";

interface CategoryIconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
}

export function CategoryIcon({ icon, ...props }: CategoryIconProps) {
  // 1. Try custom sector SVG first
  if (icon in shopIcons) {
    const Icon = shopIcons[icon as ShopIconKey];
    return <Icon {...props} />;
  }

  // 2. Fall back to Lucide (handles PascalCase names like "ShoppingBasket")
  const LucideIcon = (Lucide as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[icon];

  if (LucideIcon) {
    return <LucideIcon {...props} />;
  }

  // 3. Final fallback
  return <Store {...props} />;
}