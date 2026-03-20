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
        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] sm:px-4 sm:py-3 sm:text-[17px] lg:text-[19px] font-medium transition-all",
        pathname === href
          ? "bg-primary-100 text-primary-900 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.25)]"
          : "text-neutral-700 hover:bg-primary-50 hover:text-primary-900"
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4.5 w-4.5",
          pathname === href ? "text-primary-700" : "text-neutral-500"
        ].join(" ")}
      />
      {label}
    </Link>
  ))
}
