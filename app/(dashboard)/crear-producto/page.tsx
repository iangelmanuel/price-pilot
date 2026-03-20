import { CreateProduct } from "@/app/components/create-product/CreateProduct"

export default function CrearProductoPage() {
  return (
    <>
      <header className="rounded-2xl border border-primary-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-700">
          Flujo guiado
        </p>
        <h1 className="text-[30px] font-extrabold leading-none tracking-[-0.03em] text-neutral-900 sm:text-[36px] lg:text-[40px]">
          Crear nuevo producto
        </h1>
        <p className="mt-2 text-[15px] text-neutral-500 sm:text-[17px]">
          Completa los detalles paso a paso para obtener el precio final y el
          mensaje listo para WhatsApp.
        </p>
      </header>

      <CreateProduct />
    </>
  )
}
