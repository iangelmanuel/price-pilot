import { OverviewStats } from "@/app/components/dashboard/OverviewStats"
import { RecentProductsTable } from "@/app/components/dashboard/RecentProductsTable"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: Props) {
  const filters = await searchParams

  // searchParams para filtros
  const qParam = filters.q
  const pageParam = filters.page

  // Busqueda
  const query = (Array.isArray(qParam) ? qParam[0] : (qParam ?? ""))
    .trim()
    .toLocaleLowerCase()

  // Paginación
  const pageValue = Array.isArray(pageParam) ? pageParam[0] : pageParam
  const requestedPage = Number(pageValue ?? "1")
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  return (
    <>
      <header className="rounded-2xl border border-primary-100 bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-700">
          Métricas y control
        </p>
        <h1 className="text-[30px] font-extrabold leading-none tracking-[-0.03em] text-neutral-900 sm:text-[36px] lg:text-[40px]">
          Resumen del Dashboard
        </h1>
        <p className="mt-2 text-[15px] text-neutral-500 sm:text-[17px]">
          Estado en tiempo real de tu catálogo de productos y eficiencia
          operativa.
        </p>
      </header>

      <OverviewStats />
      <RecentProductsTable
        query={query}
        page={page}
      />
    </>
  )
}
