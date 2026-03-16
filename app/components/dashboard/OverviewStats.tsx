type StatCard = {
  title: string
  subtitle?: string
  value: string
  barColor: string
  barWidth: string
}

const cards: StatCard[] = [
  {
    title: "Productos publicados",
    value: "856",
    barColor: "#23b44b",
    barWidth: "62%"
  },
  {
    title: "Productos pendientes",
    value: "428",
    barColor: "#94dc9f",
    barWidth: "28%"
  }
]

export function OverviewStats() {
  return (
    <section className="mt-7 grid grid-cols-4 gap-5">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[21px] font-medium text-neutral-600">
                {card.title}
              </p>
              {card.subtitle ? (
                <p className="mt-1 text-[21px] text-neutral-600">
                  {card.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-[47px] font-bold leading-none tracking-[-0.03em] text-neutral-900">
            {card.value}
          </p>

          <div className="mt-4 h-1 rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full"
              style={{ width: card.barWidth, backgroundColor: card.barColor }}
            />
          </div>
        </article>
      ))}
    </section>
  )
}
