"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GridIcon, PlusSquareIcon } from "../dashboard/icons"

export function Navigation() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Tablero", icon: GridIcon },
    { href: "/crear-producto", label: "Nuevo producto", icon: PlusSquareIcon }
    // { href: "/producto", label: "Productos", icon: BoxIcon },
    // { href: "/publicado", label: "Publicados", icon: CogIcon }
  ]

  return menuItems.map(({ href, label, icon: Icon }) => (
    <Link
      key={label}
      href={href}
      className={[
        "flex w-full items-center gap-3 rounded-full px-4 py-3 text-[21px] font-medium transition-colors",
        pathname === href
          ? "bg-primary-200 text-primary-900"
          : "text-neutral-700 hover:bg-neutral-100"
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4.5 w-4.5",
          pathname === href ? "text-primary-900" : "text-neutral-500"
        ].join(" ")}
      />
      {label}
    </Link>
  ))
}
