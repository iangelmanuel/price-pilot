type StatCard = {
  title: string
  subtitle?: string
  value: string
  barClass: string
  barWidth: string
}

const cards: StatCard[] = [
  {
    title: "Productos publicados",
    value: "856",
    barClass: "bg-primary",
    barWidth: "62%"
  },
  {
    title: "Productos pendientes",
    value: "428",
    barClass: "bg-primary/45",
    barWidth: "28%"
  }
]

export function OverviewStats() {
  return (
    <section className="mt-7 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-input bg-card p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[16px] font-medium text-muted-foreground sm:text-[19px]">
                {card.title}
              </p>
              {card.subtitle ? (
                <p className="mt-1 text-[16px] text-muted-foreground sm:text-[19px]">
                  {card.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-[34px] font-bold leading-none tracking-[-0.03em] text-foreground sm:text-[47px]">
            {card.value}
          </p>

          <div className="mt-4 h-1 rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${card.barClass}`}
              style={{ width: card.barWidth }}
            />
          </div>
        </article>
      ))}
    </section>
  )
}
