"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GridIcon, PlusSquareIcon } from "../dashboard/icons"

export function Navigation() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Tablero", icon: GridIcon },
    { href: "/crear-producto", label: "Nuevo producto", icon: PlusSquareIcon },
  ]

  return menuItems.map(({ href, label, icon: Icon }) => (
    <Link
      key={label}
      href={href}
      className={[
        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-all sm:px-4 sm:py-3 sm:text-[17px] lg:text-[19px]",
        pathname === href
          ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(167,139,250,0.25)]"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4.5 w-4.5",
          pathname === href ? "text-primary" : "text-muted-foreground",
        ].join(" ")}
      />
      {label}
    </Link>
  ))
}
