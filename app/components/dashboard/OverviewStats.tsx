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
    barColor: "#8b5cf6",
    barWidth: "62%"
  },
  {
    title: "Productos pendientes",
    value: "428",
    barColor: "#c4b5fd",
    barWidth: "28%"
  }
]

export function OverviewStats() {
  return (
    <section className="mt-7 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[16px] font-medium text-neutral-600 sm:text-[19px]">
                {card.title}
              </p>
              {card.subtitle ? (
                <p className="mt-1 text-[16px] text-neutral-600 sm:text-[19px]">
                  {card.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-[34px] font-bold leading-none tracking-[-0.03em] text-neutral-900 sm:text-[47px]">
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
