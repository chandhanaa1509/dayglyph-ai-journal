import { useEffect, useState } from "react";

import Background from "../../components/common/Background";
import Hero from "../../components/dashboard/Hero";
import JournalComposer from "../../components/journal/JournalComposer";
import StoryCard from "../../components/journal/StoryCard";

import Sidebar from "../../components/navigation/Sidebar";

import {
  createJournal,
  getAllJournals,
} from "../../services/journalService";

import type { Journal } from "../../types/journal";

function DashboardPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJournals();
  }, []);

  async function loadJournals() {
    try {
      const journals = await getAllJournals();

      setJournals(journals);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateJournal(content: string) {
    try {

      await createJournal(content);

      await loadJournals();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Background>
      <div className="flex min-h-screen">

        <Sidebar />

        <main className="flex-1 overflow-y-auto p-10">

          <Hero />

          <JournalComposer
            onCreateJournal={handleCreateJournal}
          />

          <section className="mt-12">

            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">
              📚 Your Stories
            </h2>

            {loading ? (

              <p className="text-lg text-[var(--text-secondary)]">
                🌸 Loading your memories...
              </p>

            ) : journals.length === 0 ? (

              <div className="rounded-3xl bg-white/70 p-16 text-center">
                <div className="text-6xl">
                  🌸
                </div>
                  
                  <h3 className="mt-6 text-3xl font-bold text-[var(--primary)]">
                    Your story begins here.
                  </h3>
                    
                  <p className="mt-4 text-lg text-[var(--text-secondary)]">
                      Write your first journal and let
                      DayGlyph transform it into a beautiful memory.
                  </p>
              </div>

            ) : (

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {journals.map((journal) => (

                  <StoryCard
                    key={journal.id}
                    journal={journal}
                  />

                ))}

              </div>

            )}

          </section>

        </main>

      </div>
    </Background>
  );
}

export default DashboardPage;