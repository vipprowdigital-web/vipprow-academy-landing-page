import { HoverCard } from "../ui/HoverCard";

export interface CardData {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface InsightsSectionProps {
  cards: CardData[];
  cols?: 2 | 3 | 4;
}

export default function InsightsSection({ cards, cols = 4 }: InsightsSectionProps) {
  const lgCols =
    cols === 2 ? "lg:grid-cols-2" : cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <div className={`grid sm:grid-cols-2 ${lgCols} gap-6`}>
      {cards.map((card, idx) => (
        <HoverCard key={idx} {...card} />
      ))}
    </div>
  );
}
