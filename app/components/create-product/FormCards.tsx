"use client"

import { useProduct } from "@/app/hook/useProduct"
import {
  ArrowRightIcon,
  ClipboardIcon,
  ConversionIcon,
  ExternalLinkIcon
} from "../dashboard/icons"
import { formatCop } from "@/app/utils/formatCurrency"
import { SectionCard, SectionCardHeader } from "@/app/components/ui/card"
import {
  FieldInput,
  FieldLabel,
  IconActionButton,
  SelectionPill
} from "@/app/components/ui/form"

export function ConversionCard() {
  const {
    businessPrice,
    trm,
    companyCommission,
    deliveryCost,
    pounds,
    costByPound,
    loading,
    isTrmChanging,
    porcentageIncrease,
    setTrm,
    setCompanyCommission,
    setDeliveryCost,
    setIsTrmChanging,
    setCostByPound,
    setPorcentageIncrease,

    clearData
  } = useProduct()

  const priceWithCompanyCommission = trm + companyCommission
  const priceSetByPound = costByPound * pounds
  const finalPrice =
    businessPrice * priceWithCompanyCommission * porcentageIncrease +
    deliveryCost +
    priceSetByPound

  return (
    <SectionCard tone="success">
      <div className="flex items-center justify-between bg-white">
        <SectionCardHeader
          title="Conversión automática a COP"
          icon={
            <span className="grid h-4 w-4 place-items-center rounded-sm bg-primary-500 text-[10px] font-bold text-white">
              <ConversionIcon className="h-3 w-3" />
            </span>
          }
        />

        <div>
          <button
            type="button"
            onClick={() => clearData()}
            className="mr-4 grid cursor-pointer place-items-center rounded-lg p-2 text-neutral-500 transition-all hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Limpiar datos
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Tasa de cambio
            </p>

            <div className="mt-2 h-12 rounded-lg border border-neutral-200 bg-white px-3 text-[14px] leading-12 text-neutral-700">
              {loading ? (
                <span>Obteniendo TRM...</span>
              ) : (
                <div
                  className={
                    "flex items-center gap-2" +
                    (isTrmChanging ? " opacity-100" : " opacity-70")
                  }
                >
                  <div>
                    <span className="font-bold">$ 1 USD =</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      disabled={!isTrmChanging}
                      value={trm ? formatCop(trm) : "Cargando..."}
                      onChange={(e) => setTrm(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-auto text-neutral-700 focus:outline-none disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-700/70"
                    />
                  </div>

                  <div className={isTrmChanging ? "opacity-100" : "opacity-50"}>
                    <p>{formatCop(priceWithCompanyCommission)}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-5">
              <div className="mt-2 flex items-center gap-1 px-2 text-[14px] text-neutral-700">
                <input
                  id="changeTRM"
                  type="checkbox"
                  checked={isTrmChanging}
                  onChange={(e) => setIsTrmChanging(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-200 bg-neutral-100 text-neutral-600 focus:ring-primary-500"
                />
                <label htmlFor="changeTRM">Actualizar manualmente</label>
              </div>

              <div className="mt-2 flex items-center justify-between gap-1 px-2 text-[14px] text-neutral-700">
                <SelectionPill
                  active={companyCommission === 0}
                  onClick={() => setCompanyCommission(0)}
                >
                  0
                </SelectionPill>

                <SelectionPill
                  active={companyCommission === 150}
                  onClick={() => setCompanyCommission(150)}
                >
                  +150
                </SelectionPill>

                <SelectionPill
                  active={companyCommission === 200}
                  onClick={() => setCompanyCommission(200)}
                >
                  +200
                </SelectionPill>

                <SelectionPill
                  active={companyCommission === 300}
                  onClick={() => setCompanyCommission(300)}
                >
                  +300
                </SelectionPill>
              </div>
            </div>
          </div>

          <ArrowRightIcon className="mb-3 h-5 w-5 text-neutral-500" />

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Precio final calculado
            </p>

            <div className="mt-2 flex justify-between items-center rounded-lg border border-primary-300 bg-primary-400 px-3 text-[14px] font-semibold leading-12 text-primary-900 shadow-[0_10px_24px_rgba(35,180,75,0.3)]">
              {loading ? <span>Calculando...</span> : formatCop(finalPrice)}

              <IconActionButton
                disabled={!finalPrice}
                onClick={() =>
                  navigator.clipboard.writeText(
                    Math.ceil(finalPrice).toString() || ""
                  )
                }
                className="bg-transparent hover:bg-primary-500 hover:text-white text-primary-900 transition-all"
              >
                <ClipboardIcon className="h-4.5 w-4.5" />
              </IconActionButton>
            </div>

            <div className="flex justify-between gap-5">
              <div className="mt-2 flex items-center gap-1 px-2 text-[14px] text-neutral-700">
                <input
                  id="changeDeliveryCost"
                  type="checkbox"
                  checked={deliveryCost > 0}
                  onChange={() =>
                    deliveryCost > 0
                      ? setDeliveryCost(0)
                      : setDeliveryCost(10000)
                  }
                  className="h-4 w-4 rounded border-neutral-200 bg-neutral-100 text-neutral-600 focus:ring-primary-500"
                />
                <label htmlFor="changeDeliveryCost">¿Sumar 10000 envío?</label>
              </div>

              <div className="mt-2 flex items-center gap-1 px-2 text-[14px] text-neutral-700">
                <input
                  id="changePorcentageIncrease"
                  type="checkbox"
                  checked={porcentageIncrease > 1}
                  onChange={() =>
                    porcentageIncrease > 1
                      ? setPorcentageIncrease(1)
                      : setPorcentageIncrease(1.15)
                  }
                  className="h-4 w-4 rounded border-neutral-200 bg-neutral-100 text-neutral-600 focus:ring-primary-500"
                />
                <label htmlFor="changePorcentageIncrease">+15%</label>
              </div>

              <div className="mt-2 flex items-center justify-between gap-1 px-2 text-[14px] text-neutral-700">
                <SelectionPill
                  active={costByPound === 0}
                  onClick={() => setCostByPound(0)}
                >
                  0
                </SelectionPill>

                <SelectionPill
                  active={costByPound === 18000}
                  onClick={() => setCostByPound(18000)}
                >
                  +18000
                </SelectionPill>

                <SelectionPill
                  active={costByPound === 30000}
                  onClick={() => setCostByPound(30000)}
                >
                  +30000
                </SelectionPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export function ProductSourceCard() {
  const {
    productLink,
    couponCode,
    pounds,
    businessPrice,
    setProductLink,
    setCouponCode,
    setPounds,
    setBusinessPrice
  } = useProduct()

  return (
    <SectionCard>
      <SectionCardHeader title="Fuente del producto" />

      <div className="space-y-4 p-4">
        <div>
          <FieldLabel>Enlace de producto</FieldLabel>
          <div className="mt-2 flex gap-2">
            <input
              value={productLink || ""}
              onChange={(e) => setProductLink(e.target.value)}
              type="text"
              placeholder="https://amazon.com/dp/..."
              className="h-11 flex-1 rounded-lg border border-neutral-200 bg-neutral-100 px-3 text-[14px] text-neutral-600 placeholder:text-neutral-400"
            />

            <div className="flex items-center gap-2 text-neutral-500">
              <IconActionButton
                disabled={!productLink?.trim()}
                onClick={() => navigator.clipboard.writeText(productLink || "")}
              >
                <ClipboardIcon className="h-4.5 w-4.5" />
              </IconActionButton>

              <IconActionButton
                disabled={!productLink?.trim()}
                onClick={() =>
                  window.open(productLink ? productLink.trim() : "", "_blank")
                }
              >
                <ExternalLinkIcon className="h-4.5 w-4.5" />
              </IconActionButton>
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>Precio del producto (USD)</FieldLabel>
          <FieldInput
            value={businessPrice.toString()}
            onChange={(e) => setBusinessPrice(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Código de cupón (opcional)</FieldLabel>
            <div className="flex items-center justify-center">
              <FieldInput
                value={couponCode || ""}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="SAVE20OFF"
              />

              <button
                type="button"
                disabled={!couponCode}
                onClick={() => navigator.clipboard.writeText(couponCode || "")}
                className="ml-2 grid cursor-pointer place-items-center rounded-lg p-2 text-neutral-500 transition-all hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ClipboardIcon className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
          <div>
            <FieldLabel>Libras (opcional)</FieldLabel>
            <FieldInput
              value={pounds.toString()}
              onChange={(e) => setPounds(Number(e.target.value) || 0)}
              placeholder="1lb"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
