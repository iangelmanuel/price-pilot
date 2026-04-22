import Link from "next/link"
import { Button } from "@/app/components/ui/button"
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
    <section className="mt-7 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 border-b border-neutral-200 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[26px] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[30px] lg:text-[35px]">
          Productos recientes
        </h2>

        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row">
          <form
            action="/dashboard"
            method="get"
            className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center lg:w-auto"
          >
            <div className="relative w-full sm:w-auto">
              <FilterIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Buscar por código o nombre"
                className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-[14px] text-neutral-700 outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-300 focus:ring-2 focus:ring-primary-200 sm:w-62"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full rounded-xl bg-neutral-50 sm:w-auto"
            >
              Buscar
            </Button>

            {query ? (
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-[13px] font-medium text-neutral-500 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 sm:w-auto"
              >
                Limpiar
              </Link>
            ) : null}
          </form>

          <Button
            variant="secondary"
            className="w-full rounded-xl bg-neutral-50 sm:w-auto"
          >
            <DownloadIcon className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="md:hidden">
        {paginatedProducts.map((product) => (
          <article
            key={product.code}
            className="space-y-3 border-b border-neutral-100 px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold text-neutral-900">
                  {product.name}
                </p>
                <p className="text-[13px] text-neutral-400">
                  {product.category}
                </p>
              </div>

              <span className="inline-flex rounded-lg bg-neutral-100 px-2.5 py-1 text-[12px] font-medium text-neutral-500">
                {product.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="rounded-lg bg-neutral-50 px-3 py-2 text-neutral-700">
                USD: <strong>{product.usd}</strong>
              </div>
              <div className="rounded-lg bg-neutral-50 px-3 py-2 text-neutral-700">
                COP: <strong>{product.cop}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <ProductTypeBadge type={product.type} />
              <ProductStatusBadge status={product.status} />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[13px] text-neutral-500">{product.date}</p>
              <div className="flex items-center gap-2 text-neutral-500">
                <ActionIconButton label="Editar producto">
                  <PencilIcon className="h-4 w-4" />
                </ActionIconButton>

                <ActionIconButton label="Subir producto">
                  <CloudUploadIcon className="h-4 w-4" />
                </ActionIconButton>
              </div>
            </div>
          </article>
        ))}

        {paginatedProducts.length === 0 ? (
          <div className="px-4 py-10 text-center text-[15px] text-neutral-500">
            No encontramos productos que coincidan con tu búsqueda.
          </div>
        ) : null}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <div className="min-w-245">
          <div className="grid grid-cols-[1.15fr_2.45fr_1.1fr_0.9fr_1fr_0.95fr_0.8fr] border-b border-neutral-200 bg-neutral-50/90 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
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
                className="grid grid-cols-[1.15fr_2.45fr_1.1fr_0.9fr_1fr_0.95fr_0.8fr] items-center border-b border-neutral-100 px-5 py-4 transition-colors hover:bg-primary-50/40"
              >
                <div>
                  <span className="inline-flex rounded-lg bg-neutral-100 px-3 py-2 text-[13px] font-medium tracking-[0.02em] text-neutral-500">
                    {product.code}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-700 text-[12px] text-white">
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

                <div className="text-[14px] text-neutral-700">
                  {product.date}
                </div>

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
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        <p className="text-center text-[14px] text-neutral-500 md:text-left">
          Mostrando {showingFrom} a {showingTo} de {totalResults} resultados
        </p>

        <div className="flex items-center justify-center gap-2 md:justify-end">
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
