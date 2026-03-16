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
      <header>
        <h1 className="text-[40px] font-extrabold leading-none tracking-[-0.03em] text-neutral-900">
          Resumen del Dashboard
        </h1>
        <p className="mt-2 text-[17px] text-neutral-500">
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
