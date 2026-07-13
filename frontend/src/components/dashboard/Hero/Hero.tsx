import Card from "../../ui/Card";

function Hero() {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const userName =
    localStorage.getItem("userName") ?? "Friend";

  return (

    <Card className="mb-8 p-8">

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-medium text-[var(--text-secondary)]">

            ☀️ {today}

          </p>

          <h1 className="mt-2 text-5xl font-bold text-[var(--primary)]">

            {greeting}, {userName} 🌸

          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">

            Every memory you write becomes a unique
            <span className="font-semibold text-[var(--primary)]">
              {" "}DayGlyph{" "}
            </span>
            crafted by AI.

          </p>

        </div>

        <div className="rounded-3xl bg-[var(--primary-light)] px-8 py-6 text-center">

          <p className="text-5xl">

            ✨

          </p>

          <p className="mt-3 text-lg font-semibold text-[var(--primary)]">

            One memory.
            <br />
            One DayGlyph.

          </p>

        </div>

      </div>

    </Card>

  );

}

export default Hero;