import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
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
    <section className="mt-7 overflow-hidden rounded-2xl border border-input bg-card shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col gap-3 border-b border-input px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[26px] font-bold tracking-[-0.02em] text-foreground sm:text-[30px] lg:text-[35px]">
          Productos recientes
        </h2>

        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row">
          <form
            action="/dashboard"
            method="get"
            className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center lg:w-auto"
          >
            <div className="relative w-full sm:w-auto">
              <FilterIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Buscar por código o nombre"
                className="w-full pl-9 text-[14px] sm:w-62"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full rounded-xl sm:w-auto"
            >
              Buscar
            </Button>

            {query ? (
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-input bg-card px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary/35 hover:bg-accent hover:text-foreground sm:w-auto"
              >
                Limpiar
              </Link>
            ) : null}
          </form>

          <Button
            variant="secondary"
            className="w-full rounded-xl sm:w-auto"
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
            className="space-y-3 border-b border-border px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-semibold text-foreground">
                  {product.name}
                </p>
                <p className="text-[13px] text-muted-foreground">
                  {product.category}
                </p>
              </div>

              <span className="inline-flex rounded-lg border border-input bg-muted px-2.5 py-1 text-[12px] font-medium text-muted-foreground">
                {product.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="rounded-lg border border-border bg-background px-3 py-2 text-foreground">
                USD: <strong>{product.usd}</strong>
              </div>
              <div className="rounded-lg border border-border bg-background px-3 py-2 text-foreground">
                COP: <strong>{product.cop}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <ProductTypeBadge type={product.type} />
              <ProductStatusBadge status={product.status} />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[13px] text-muted-foreground">
                {product.date}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
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
          <div className="px-4 py-10 text-center text-[15px] text-muted-foreground">
            No encontramos productos que coincidan con tu búsqueda.
          </div>
        ) : null}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <div className="min-w-245">
          <div className="grid grid-cols-[1.15fr_2.45fr_1.1fr_0.9fr_1fr_0.95fr_0.8fr] border-b border-input bg-muted px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
                className="grid grid-cols-[1.15fr_2.45fr_1.1fr_0.9fr_1fr_0.95fr_0.8fr] items-center border-b border-border px-5 py-4 transition-colors hover:bg-accent/60"
              >
                <div>
                  <span className="inline-flex rounded-lg border border-input bg-muted px-3 py-2 text-[13px] font-medium tracking-[0.02em] text-muted-foreground">
                    {product.code}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-[12px] text-primary-foreground">
                    {product.theme === "sand" ? (
                      <WatchIcon className="h-4 w-4" />
                    ) : product.theme === "teal" ? (
                      <HeadphonesIcon className="h-4 w-4" />
                    ) : (
                      <HomeIcon className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[16px] font-semibold text-foreground">
                    {product.usd}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">
                    {product.cop}
                  </p>
                </div>

                <div>
                  <ProductTypeBadge type={product.type} />
                </div>

                <div className="text-[14px] text-foreground">
                  {product.date}
                </div>

                <div>
                  <ProductStatusBadge status={product.status} />
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
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
              <div className="px-5 py-10 text-center text-[15px] text-muted-foreground">
                No encontramos productos que coincidan con tu búsqueda.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
        <p className="text-center text-[14px] text-muted-foreground md:text-left">
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
