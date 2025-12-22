import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
    category: string;
    count: number;
    color: string;
    isActive: boolean;
    onClick: () => void;
}

const colorClasses: Record<string, string> = {
    gray: "bg-gray-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-emerald-500",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
};

const CategoryBadge = ({
    category,
    count,
    color,
    isActive,
    onClick,
}: CategoryBadgeProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:shadow-md",
                isActive ? "bg-muted ring-2 ring-primary" : "bg-card border border-border"
            )}
        >
            <div
                className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white",
                    colorClasses[color]
                )}
            >
                <span className="text-xl font-bold">{count}</span>
            </div>
            <div className="text-center">
                <div className="font-medium text-sm text-foreground">{category}</div>
                <div className="text-xs text-muted-foreground">
                    {count} {count === 1 ? "event" : "events"}
                </div>
            </div>
        </button>
    );
};

interface EventCategoriesProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categoryCounts: Record<string, number>;
}

const EventCategories = ({
    selectedCategory,
    onCategoryChange,
    categoryCounts,
}: EventCategoriesProps) => {
    const categories = [
        { id: "all", label: "All Events", color: "gray" },
        { id: "academic", label: "Academic", color: "blue" },
        { id: "cultural", label: "Cultural", color: "purple" },
        { id: "sports", label: "Sports", color: "green" },
        { id: "career", label: "Career", color: "orange" },
        { id: "networking", label: "Networking", color: "pink" },
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Event Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                    <CategoryBadge
                        key={cat.id}
                        category={cat.label}
                        count={categoryCounts[cat.id] || 0}
                        color={cat.color}
                        isActive={selectedCategory === cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventCategories;
