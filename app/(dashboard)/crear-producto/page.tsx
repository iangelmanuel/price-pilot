import { CreateProduct } from "@/app/components/create-product/CreateProduct"

export default function CrearProductoPage() {
  return (
    <>
      <header>
        <h1 className="text-[40px] font-extrabold leading-none tracking-[-0.03em] text-neutral-900">
          Crear nuevo producto
        </h1>
        <p className="mt-2 text-[17px] text-neutral-500">
          Completa los detalles. Atajos de teclado habilitados para carga
          rápida.
        </p>
      </header>

      <CreateProduct />
    </>
  )
}
