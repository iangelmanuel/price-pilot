type Props = {
  link: string
  coupon: string
  price: number
  pounds: number
}

export const copyProductPrivData = ({ link, coupon, price, pounds }: Props) => {
  return `Link: ${link}\nPrecio: ${price} USD\n${coupon ? `Cupón: ${coupon}\n` : ""}${pounds ? `Libras: ${pounds} lbs\n` : ""}`
}
