export type Product = {
  code: string
  name: string
  category: string
  usd: string
  cop: string
  type: "Physical" | "Digital"
  date: string
  status: "Published" | "Pending"
  theme: "sand" | "teal" | "mint"
}

export const products: Product[] = [
  {
    code: "PRD-8821",
    name: "Arctic Minimalist Watch",
    category: "Accessories / Men",
    usd: "$120.00",
    cop: "$480,000 COP",
    type: "Physical",
    date: "Oct 24, 2023",
    status: "Published",
    theme: "sand"
  },
  {
    code: "PRD-9912",
    name: "SonicFlow Headphones",
    category: "Electronics / Audio",
    usd: "$249.00",
    cop: "$996,000 COP",
    type: "Physical",
    date: "Oct 22, 2023",
    status: "Pending",
    theme: "teal"
  },
  {
    code: "PRD-7742",
    name: "Nexus Hub Gen 2",
    category: "Smart Home / Control",
    usd: "$89.99",
    cop: "$360,000 COP",
    type: "Digital",
    date: "Oct 21, 2023",
    status: "Published",
    theme: "mint"
  },
  {
    code: "PRD-6630",
    name: "Vertex Studio Mic",
    category: "Electronics / Audio",
    usd: "$139.00",
    cop: "$556,000 COP",
    type: "Physical",
    date: "Oct 18, 2023",
    status: "Published",
    theme: "teal"
  },
  {
    code: "PRD-4320",
    name: "Lumen Desk Lamp",
    category: "Home / Office",
    usd: "$54.90",
    cop: "$220,000 COP",
    type: "Physical",
    date: "Oct 17, 2023",
    status: "Pending",
    theme: "sand"
  },
  {
    code: "PRD-2840",
    name: "Flux Mechanical Keyboard",
    category: "Electronics / Peripherals",
    usd: "$109.00",
    cop: "$436,000 COP",
    type: "Physical",
    date: "Oct 16, 2023",
    status: "Published",
    theme: "mint"
  },
  {
    code: "PRD-7310",
    name: "Orbit Action Camera",
    category: "Electronics / Video",
    usd: "$199.00",
    cop: "$796,000 COP",
    type: "Physical",
    date: "Oct 15, 2023",
    status: "Pending",
    theme: "teal"
  },
  {
    code: "PRD-5568",
    name: "Nova Smart Scale",
    category: "Health / Smart Home",
    usd: "$79.50",
    cop: "$318,000 COP",
    type: "Digital",
    date: "Oct 14, 2023",
    status: "Published",
    theme: "mint"
  },
  {
    code: "PRD-1092",
    name: "Atlas Travel Backpack",
    category: "Accessories / Travel",
    usd: "$88.00",
    cop: "$352,000 COP",
    type: "Physical",
    date: "Oct 13, 2023",
    status: "Published",
    theme: "sand"
  },
  {
    code: "PRD-6401",
    name: "Pulse Fitness Band",
    category: "Wearables / Fitness",
    usd: "$59.99",
    cop: "$240,000 COP",
    type: "Physical",
    date: "Oct 12, 2023",
    status: "Pending",
    theme: "teal"
  },
  {
    code: "PRD-8147",
    name: "Echo Portable Speaker",
    category: "Electronics / Audio",
    usd: "$72.00",
    cop: "$288,000 COP",
    type: "Physical",
    date: "Oct 11, 2023",
    status: "Published",
    theme: "mint"
  },
  {
    code: "PRD-9055",
    name: "Aero Drone Mini",
    category: "Electronics / Hobby",
    usd: "$159.00",
    cop: "$636,000 COP",
    type: "Physical",
    date: "Oct 10, 2023",
    status: "Pending",
    theme: "teal"
  },
  {
    code: "PRD-2574",
    name: "Terra Water Bottle",
    category: "Accessories / Outdoor",
    usd: "$24.90",
    cop: "$100,000 COP",
    type: "Physical",
    date: "Oct 9, 2023",
    status: "Published",
    theme: "sand"
  },
  {
    code: "PRD-3688",
    name: "Quantum SSD 1TB",
    category: "Electronics / Storage",
    usd: "$129.00",
    cop: "$516,000 COP",
    type: "Digital",
    date: "Oct 8, 2023",
    status: "Published",
    theme: "mint"
  }
]
