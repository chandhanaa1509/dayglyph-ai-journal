import { useNavigate } from "react-router-dom";

import Card from "../../ui/Card";
import type { Journal } from "../../../types/journal";

interface StoryCardProps {
  journal: Journal;
}

function StoryCard({ journal }: StoryCardProps) {

  const navigate = useNavigate();

  function getRelativeDate(dateString: string) {

    const today = new Date();
    const date = new Date(dateString);

    const diff = Math.floor(
      (today.getTime() - date.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Today";

    if (diff === 1) return "Yesterday";

    if (diff < 7) return `${diff} days ago`;

    return date.toLocaleDateString();

  }

  return (

    <Card
      onClick={() => navigate(`/journal/${journal.id}`)}
      className="
        cursor-pointer
        p-7
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
            🌸 {journal.mood}
          </span>

          <span className="text-xs text-gray-500">
            {getRelativeDate(journal.createdAt)}
          </span>

        </div>

        {/* DayGlyph */}

        <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-7 text-center">

          <p className="mb-3 text-sm font-semibold tracking-wide text-purple-500 uppercase">

            ✨ DayGlyph

          </p>

          <pre
            className="
              overflow-hidden
              whitespace-pre
              text-3xl
              leading-8
              font-bold
              text-purple-700
            "
          >
            {journal.asciiArt || "(^_^)"}
          </pre>

          <p className="mt-3 text-xs text-gray-400">

            AI generated mood glyph

          </p>

        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800">

          {journal.summary}

        </h2>

        <p className="line-clamp-3 text-center leading-7 text-gray-600">

          {journal.content}

        </p>

        <div className="flex justify-center">

          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">

            💚 {journal.sentiment}

          </span>

        </div>

        <div className="flex flex-wrap justify-center gap-2">

          {journal.tags?.map(tag => (

            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
            >
              #{tag}
            </span>

          ))}

        </div>

      </div>

    </Card>

  );

}

export default StoryCard;