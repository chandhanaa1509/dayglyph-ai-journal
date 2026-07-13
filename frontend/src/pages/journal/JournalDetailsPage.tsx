import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Background from "../../components/common/Background";
import Sidebar from "../../components/navigation/Sidebar";

import { getJournalById } from "../../services/journalService";
import type { Journal } from "../../types/journal";

function JournalDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [journal, setJournal] = useState<Journal | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJournal();
  }, []);

  async function loadJournal() {

    try {

      if (!id) return;

      const data = await getJournalById(id);

      setJournal(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <Background>

      <div className="flex min-h-screen">

        <Sidebar />

        <main className="flex-1 overflow-y-auto p-10">

          <button
            onClick={() => navigate("/")}
            className="mb-8 rounded-xl bg-purple-100 px-5 py-2 font-semibold text-purple-700 transition hover:bg-purple-200"
          >
            ← Back
          </button>

          {loading ? (

            <h2 className="text-2xl">
              Loading...
            </h2>

          ) : journal == null ? (

            <h2 className="text-2xl">
              Journal not found.
            </h2>

          ) : (

            <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple-500">
                ✨ Your DayGlyph

              </p>
              {/* ASCII */}

              <div className="mb-10 text-center">

                <pre
                  className="
                    inline-block
                    rounded-3xl
                    bg-purple-50
                    px-16
                    py-12
                    text-5xl
                    leading-[3.5rem]
                    text-purple-700
                    whitespace-pre
                  "
                >
                  {journal.asciiArt || "(^-^)"}
                </pre>

              </div>

              {/* Mood */}

              <div className="mb-8 flex flex-wrap items-center justify-center gap-4">

                <span className="rounded-full bg-purple-100 px-5 py-2 font-semibold text-purple-700">
                  🌸 {journal.mood}
                </span>

                <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
                  💚 {journal.sentiment}
                </span>

              </div>

              {/* Summary */}

              <div className="mb-10">

                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  ✨ AI Summary
                </h2>

                <div className="rounded-2xl bg-purple-50 p-6">

                  <p className="text-lg leading-8 text-gray-700">

                    {journal.summary}

                  </p>

                </div>

              </div>

              {/* Tags */}

              <div className="mb-10">

                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  🏷 Tags
                </h2>

                <div className="flex flex-wrap gap-3">

                  {journal.tags?.map(tag => (

                    <span
                      key={tag}
                      className="
                        rounded-full
                        bg-gray-100
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                      "
                    >
                      #{tag}
                    </span>

                  ))}

                </div>

              </div>

              {/* Journal */}

              <div>

                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  📖 Your Journal
                </h2>

                <div className="rounded-3xl bg-gray-50 p-8 leading-8 whitespace-pre-wrap text-gray-700">

                  {journal.content}

                </div>

              </div>

            </div>

          )}

        </main>

      </div>

    </Background>

  );

}

export default JournalDetailsPage;