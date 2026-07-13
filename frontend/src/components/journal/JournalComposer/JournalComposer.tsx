import { useState } from "react";

import Card from "../../ui/Card";
import Button from "../../ui/Button";

interface JournalComposerProps {
  onCreateJournal: (content: string) => Promise<void>;
}

function JournalComposer({
  onCreateJournal,
}: JournalComposerProps) {
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!journal.trim()) {
      return;
    }

    try {
      setLoading(true);

      await onCreateJournal(journal);

      setJournal("");
    } catch (error) {
      console.error(error);
      alert("🌸 Unable to save your journal. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-5xl p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
            📖 How was your day today?
          </h2>

          <p className="mt-2 text-[var(--text-secondary)]">
            🌸 Every little moment matters. Write freely.
          </p>
        </div>

        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Write your thoughts, feelings, little wins, memories, or anything on your heart today..."
          className="
            h-64
            w-full
            resize-none
            rounded-3xl
            border
            border-[var(--border)]
            bg-white/80
            p-6
            text-lg
            text-[var(--text-primary)]
            outline-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:border-[var(--primary)]
            focus:ring-4
            focus:ring-purple-100
          "
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4 text-lg">
            <button className="transition hover:scale-105">
              😊 Add Mood
            </button>

            <button
              className="cursor-not-allowed opacity-50"
              disabled
            >
              📷 Add Photo (Coming Soon)
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "🌸 Creating your beautiful story..."
              : "✨ Create Reflection"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default JournalComposer;