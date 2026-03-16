import Link from "next/link"
import { products } from "../../data/product"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudUploadIcon,
  DownloadIcon,
  FilterIcon,
  HeadphonesIcon,
  HomeIcon,
  PencilIcon,
  WatchIcon
} from "./icons"
import {
  ActionIconButton,
  PaginationLink,
  ProductStatusBadge,
  ProductTypeBadge
} from "./TablePrimitives"

type Props = {
  query: string
  page: number
}

const PAGE_SIZE = 5

export function RecentProductsTable({ query, page }: Props) {
  // Filtro para la busqueda
  const filteredProducts = products.filter((product) => {
    if (!query) {
      return true
    }

    return (
      product.code.toLowerCase().includes(query) ||
      product.name.toLowerCase().includes(query)
    )
  })

  // Estádisticas de paginación
  const totalResults = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  )

  const showingFrom = totalResults === 0 ? 0 : startIndex + 1
  const showingTo = Math.min(startIndex + PAGE_SIZE, totalResults)

  const createPageHref = (targetPage: number) => {
    const params = new URLSearchParams()

    if (query) {
      params.set("q", query)
    }

    if (targetPage > 1) {
      params.set("page", String(targetPage))
    }

    const queryString = params.toString()
    return queryString ? `/dashboard?${queryString}` : "/dashboard"
  }

  return (
    <section className="mt-7 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
        <h2 className="text-[35px] font-bold tracking-[-0.02em] text-neutral-900">
          Productos recientes
        </h2>

        <div className="flex gap-2">
          <form
            action="/dashboard"
            method="get"
            className="flex items-center gap-2"
          >
            <div className="relative">
              <FilterIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Buscar por código o nombre"
                className="h-10 w-62 rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-[14px] text-neutral-700 outline-none placeholder:text-neutral-400"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-[14px] font-medium text-neutral-700"
            >
              Buscar
            </button>

            {query ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-[13px] font-medium text-neutral-500"
              >
                Limpiar
              </Link>
            ) : null}
          </form>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-[14px] font-medium text-neutral-700"
          >
            <DownloadIcon className="h-4 w-4" />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1.15fr_2.45fr_1.1fr_0.9fr_1fr_0.95fr_0.8fr] border-b border-neutral-200 bg-neutral-50 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
        <div>Código de producto</div>
        <div>Información del producto</div>
        <div>Precio (USD/COP)</div>
        <div>Tipo</div>
        <div>Fecha de creación</div>
        <div>Estado</div>
        <div>Acciones</div>
      </div>

      <div>
        {paginatedProducts.map((product) => (
          <div
            key={product.code}
            className="grid grid-cols-[1.15fr_2.45fr_1.1fr_0.9fr_1fr_0.95fr_0.8fr] items-center border-b border-neutral-100 px-5 py-4"
          >
            <div>
              <span className="inline-flex rounded-lg bg-neutral-100 px-3 py-2 text-[13px] font-medium tracking-[0.02em] text-neutral-500">
                {product.code}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-800 text-[12px] text-white">
                {product.theme === "sand" ? (
                  <WatchIcon className="h-4 w-4" />
                ) : product.theme === "teal" ? (
                  <HeadphonesIcon className="h-4 w-4" />
                ) : (
                  <HomeIcon className="h-4 w-4" />
                )}
              </div>

              <div>
                <p className="text-[15px] font-semibold text-neutral-900">
                  {product.name}
                </p>
                <p className="text-[13px] text-neutral-400">
                  {product.category}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[16px] font-semibold text-neutral-900">
                {product.usd}
              </p>
              <p className="mt-0.5 text-[13px] text-neutral-400">
                {product.cop}
              </p>
            </div>

            <div>
              <ProductTypeBadge type={product.type} />
            </div>

            <div className="text-[14px] text-neutral-700">{product.date}</div>

            <div>
              <ProductStatusBadge status={product.status} />
            </div>

            <div className="flex items-center gap-3 text-neutral-500">
              <ActionIconButton label="Editar producto">
                <PencilIcon className="h-4 w-4" />
              </ActionIconButton>

              <ActionIconButton label="Subir producto">
                <CloudUploadIcon className="h-4 w-4" />
              </ActionIconButton>
            </div>
          </div>
        ))}

        {paginatedProducts.length === 0 ? (
          <div className="px-5 py-10 text-center text-[15px] text-neutral-500">
            No encontramos productos que coincidan con tu búsqueda.
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-[14px] text-neutral-500">
          Mostrando {showingFrom} a {showingTo} de {totalResults} resultados
        </p>

        <div className="flex items-center gap-2">
          <PaginationLink
            href={createPageHref(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </PaginationLink>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <PaginationLink
                key={pageNumber}
                href={createPageHref(pageNumber)}
                active={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            )
          )}

          <PaginationLink
            href={createPageHref(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </PaginationLink>
        </div>
      </div>
    </section>
  )
}
