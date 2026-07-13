import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    emoji: "📖",
    label: "AI Journal",
  },
  {
    emoji: "🧠",
    label: "Mood Analysis",
  },
  {
    emoji: "✨",
    label: "ASCII Glyphs",
  },
  {
    emoji: "📚",
    label: "Story History",
  },
];

function Sidebar() {

  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") ?? "Friend";

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");

  }

  return (

    <aside
      className="
        flex
        h-screen
        w-[280px]
        flex-col
        border-r
        border-white/40
        bg-white/50
        p-6
        backdrop-blur-xl
      "
    >

      <div>

        <h1 className="text-3xl font-bold text-[var(--primary)]">
          🌸 DayGlyph
        </h1>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          AI Powered Visual Journal
        </p>

      </div>

      <div className="mt-10 rounded-3xl bg-white/70 p-5">

        <p className="text-sm text-gray-500">
          Welcome back
        </p>

        <h2 className="mt-1 text-2xl font-bold text-purple-700">
          {userName}👋
        </h2>

      </div>

      <div className="mt-10 space-y-4">

        {sections.map((section) => (

          <div
            key={section.label}
            className={clsx(
              "rounded-2xl bg-white/60 px-5 py-4"
            )}
          >

            <span className="mr-3 text-xl">
              {section.emoji}
            </span>

            {section.label}

          </div>

        ))}

      </div>

      <div className="mt-auto">

        <button
          onClick={handleLogout}
          className="
            w-full
            rounded-2xl
            bg-red-100
            py-3
            font-semibold
            text-red-600
            transition
            hover:bg-red-200
          "
        >
          🚪 Logout
        </button>

        <p className="mt-5 text-center text-xs text-gray-400">
          DayGlyph v1.0
        </p>

      </div>

    </aside>

  );

}

export default Sidebar;