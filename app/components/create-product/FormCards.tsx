"use client"

import { useProduct } from "@/app/hook/useProduct"
import {
  ClipboardIcon,
  ConversionIcon,
  ExternalLinkIcon
} from "../dashboard/icons"
import { formatCop } from "@/app/utils/formatCurrency"
import { SectionCard, SectionCardHeader } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { InlineLoader } from "@/app/components/ui/loader"
import {
  DecimalFieldInput,
  FieldInput,
  FieldLabel,
  IconActionButton
} from "@/app/components/ui/form"
import { parseDecimalInput } from "@/app/utils/parseDecimalInput"
import {
  BreakdownTile,
  ConfigCard,
  SelectionPillGroup,
  ToggleOptionRow
} from "@/app/components/create-product/primitives"

const COMMISSION_OPTIONS = [
  { label: "+0", value: 0 },
  { label: "+150", value: 150 },
  { label: "+200", value: 200 },
  { label: "+300", value: 300 }
]

const POUND_OPTIONS = [
  { label: "Libra +0", value: 0 },
  { label: "+18.000", value: 18000 },
  { label: "+30.000", value: 30000 }
]

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
      <SectionCardHeader
        title="Conversión automática a COP"
        icon={
          <span className="grid h-4 w-4 place-items-center rounded-sm bg-primary-500 text-[10px] font-bold text-white">
            <ConversionIcon className="h-3 w-3" />
          </span>
        }
        rightSlot={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clearData()}
            className="active:scale-95"
          >
            Limpiar datos
          </Button>
        }
      />

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary-200 bg-[linear-gradient(180deg,#eaf2ff_0%,#dbeafe_100%)] px-4 py-3 shadow-[0_8px_20px_rgba(37,99,235,0.16)]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-700">
              Precio final COP
            </p>
            <p className="mt-1 text-[24px] font-extrabold leading-none tracking-[-0.02em] text-primary-900 sm:text-[30px]">
              {loading ? (
                <InlineLoader
                  className="text-primary-800"
                  textClassName="text-primary-800"
                />
              ) : (
                formatCop(finalPrice)
              )}
            </p>
          </div>

          <IconActionButton
            disabled={!finalPrice}
            onClick={() =>
              navigator.clipboard.writeText(
                Math.ceil(finalPrice).toString() || ""
              )
            }
            className="h-10 w-10 bg-white/70 text-primary-900 transition-all hover:bg-primary-500 hover:text-white"
          >
            <ClipboardIcon className="h-4.5 w-4.5" />
          </IconActionButton>
        </div>

        <div className="space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
            Desglose
          </p>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <BreakdownTile
              label="Base"
              value={formatCop(businessPrice * priceWithCompanyCommission)}
            />
            <BreakdownTile
              label="Envío"
              value={formatCop(deliveryCost)}
            />
            <BreakdownTile
              label="Libra"
              value={formatCop(priceSetByPound)}
            />
            <BreakdownTile
              label="Total"
              value={
                loading ? (
                  <InlineLoader
                    className="text-primary-800"
                    textClassName="text-primary-800"
                  />
                ) : (
                  formatCop(finalPrice)
                )
              }
              tone="highlight"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <ConfigCard title="Tasa y comisión">
            <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-[14px] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-neutral-700">1 USD =</span>
                {loading ? (
                  <InlineLoader />
                ) : (
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    disabled={!isTrmChanging}
                    value={trm || ""}
                    onChange={(e) => setTrm(parseDecimalInput(e.target.value))}
                    placeholder="0.00"
                    className="w-full max-w-30 rounded-md border border-transparent bg-transparent px-2 py-1 text-neutral-800 outline-none transition-colors focus:border-primary-200 focus:bg-white disabled:pointer-events-none disabled:text-neutral-600/80"
                  />
                )}
              </div>

              <ToggleOptionRow
                id="changeTRM"
                label="Manual"
                checked={isTrmChanging}
                onChange={() => setIsTrmChanging(!isTrmChanging)}
                variant="inline"
              />
            </div>

            <SelectionPillGroup
              options={COMMISSION_OPTIONS}
              activeValue={companyCommission}
              onSelect={setCompanyCommission}
            />

            <p className="rounded-lg bg-primary-50 px-3 py-2 text-[13px] text-primary-800">
              Tasa efectiva:{" "}
              <strong>{formatCop(priceWithCompanyCommission)}</strong>
            </p>
          </ConfigCard>

          <ConfigCard title="Ajustes rápidos">
            <ToggleOptionRow
              id="changeDeliveryCost"
              label="Envío +10.000"
              checked={deliveryCost > 0}
              onChange={() =>
                deliveryCost > 0 ? setDeliveryCost(0) : setDeliveryCost(10000)
              }
            />

            <ToggleOptionRow
              id="changePorcentageIncrease"
              label="Incremento +15%"
              checked={porcentageIncrease > 1}
              onChange={() =>
                porcentageIncrease > 1
                  ? setPorcentageIncrease(1)
                  : setPorcentageIncrease(1.15)
              }
            />

            <SelectionPillGroup
              options={POUND_OPTIONS}
              activeValue={costByPound}
              onSelect={setCostByPound}
            />
          </ConfigCard>
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
              className="h-11 flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-[14px] text-neutral-700 placeholder:text-neutral-400 outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-200"
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
          <DecimalFieldInput
            value={businessPrice ? businessPrice.toString() : ""}
            onChange={(e) =>
              setBusinessPrice(parseDecimalInput(e.target.value))
            }
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Código de cupón (opcional)</FieldLabel>
            <div className="flex items-center">
              <FieldInput
                value={couponCode || ""}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="SAVE20OFF"
              />

              <IconActionButton
                disabled={!couponCode}
                onClick={() => navigator.clipboard.writeText(couponCode || "")}
                className="ml-2"
              >
                <ClipboardIcon className="h-4.5 w-4.5" />
              </IconActionButton>
            </div>
          </div>
          <div>
            <FieldLabel>Libras (opcional)</FieldLabel>
            <DecimalFieldInput
              value={pounds ? pounds.toString() : ""}
              onChange={(e) => setPounds(parseDecimalInput(e.target.value))}
              placeholder="1lb"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
