import { useState } from "react";
import {
  HomeIcon,
} from "../assets/icons/icons";

import {SearchOutlined, CategoryOutlined,  LocationOnOutlined} from '@mui/icons-material'
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { locate: '/', id: "home", label: "discover", icon: HomeIcon },
  { locate: '/search', id: "search", label: "search", icon: SearchOutlined },
  { locate: '/categories', id: "categories", label: "categories", icon: CategoryOutlined },
  { locate: '/stores', id: "stores", label: "Stores", icon: LocationOnOutlined },
];

export default function Sidebar() {
  const [collapsed] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const navigate = useNavigate()

  return (
    <aside
      className={[
        "py-4 h-full flex flex-col border-r border-divider",
        "w-sidebar",
      ].join(" ")}
    >
      

      {/* Nav */}
      <nav className="flex-1 p-1.5 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon, locate }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  onClick={() => {
                    setActiveId(id)
                    navigate(locate)
                  }}
                  title={collapsed ? label : undefined}
                  className={[
                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer capitalize",
                    "transition-colors duration-150 ease-material",
                    isActive
                      ? "bg-primary-main text-primary-contrast hover:bg-primary-dark"
                      : "bg-transparent text-text-secondary hover:bg-action-hover hover:text-text-primary",
                  ].join(" ")}
                >
                  <Icon className="shrink-0" width={24} height={24} />
                  <span
                    className={[
                      "whitespace-nowrap text-sm font-medium",
                      "transition-opacity duration-200",
                      collapsed ? "opacity-0 pointer-events-none" : "opacity-100",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}