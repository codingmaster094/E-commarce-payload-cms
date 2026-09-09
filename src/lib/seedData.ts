export interface ProductSpec {
  name: string
  value: string
}

export interface ProductColor {
  name: string
  hex: string
}

export interface ProductItem {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  categorySlug: string
  categoryName: string
  collectionSlug?: string
  collectionName?: string
  images: string[]
  thumbnail: string
  materials: string[]
  colors: ProductColor[]
  features: string[]
  specifications: ProductSpec[]
  dimensions: {
    width: string
    depth: string
    height: string
    seatHeight: string
  }
  weight: string
  maxLoad: string
  warranty: string
  stock: number
  availability: 'in_stock' | 'out_of_stock' | 'pre_order'
  rating: number
  reviewCount: number
  featured?: boolean
  bestSeller?: boolean
  newArrival?: boolean
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  description: string
  image: string
  featured?: boolean
  productCount: number
}

export interface CollectionItem {
  id: string
  name: string
  slug: string
  description: string
  image: string
  featured?: boolean
  tagline: string
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-ergonomic',
    name: 'Ergonomic Chairs',
    slug: 'ergonomic-chairs',
    description: 'Precision-engineered seating designed to reduce lumbar strain and optimize posture.',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    productCount: 4,
  },
  {
    id: 'cat-executive',
    name: 'Executive Chairs',
    slug: 'executive-chairs',
    description: 'Luxury top-grain leather craftsmanship for command posts and executive suites.',
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    productCount: 3,
  },
  {
    id: 'cat-office',
    name: 'Office Chairs',
    slug: 'office-chairs',
    description: 'Versatile, breathable high-performance task chairs for modern workspaces.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    productCount: 3,
  },
  {
    id: 'cat-gaming',
    name: 'Gaming Chairs',
    slug: 'gaming-chairs',
    description: 'Ergonomic high-back racing-inspired seats built for marathon gaming sessions.',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    productCount: 2,
  },
  {
    id: 'cat-conference',
    name: 'Conference Chairs',
    slug: 'conference-chairs',
    description: 'Sleek, fluid-swivel seating for productive boardrooms and collaborative spaces.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    productCount: 2,
  },
  {
    id: 'cat-lounge',
    name: 'Lounge Chairs',
    slug: 'lounge-chairs',
    description: 'Editorial design, plush cushioning, and architectural silhouette for quiet reflection.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    productCount: 3,
  },
]

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-executive-suite',
    name: 'The Executive Suite',
    slug: 'executive-suite',
    description: 'Uncompromising luxury, handcrafted Nappa leather, and polished aluminum accents.',
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    tagline: 'Authority Meets Ultimate Comfort',
  },
  {
    id: 'col-ergo-master',
    name: 'Ergonomic Master Series',
    slug: 'ergo-master-series',
    description: 'Dynamic spinal support, 4D fluid armrests, and active pressure dissipation.',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    tagline: 'Scientific Spine Support',
  },
  {
    id: 'col-gaming-pro',
    name: 'Gaming Pro Line',
    slug: 'gaming-pro-line',
    description: 'Cold-cured foam density, 165° recline, and magnetic lumbar pillows.',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    tagline: 'Peak Performance Seating',
  },
  {
    id: 'col-lounge-comfort',
    name: 'Modern Lounge Collection',
    slug: 'modern-lounge-collection',
    description: 'Sculptural seating designed for hotel lobbies, executive breakout areas, and luxury residences.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    tagline: 'Sculptural Architectural Comfort',
  },
]

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'ErgoPro Apex Executive',
    slug: 'ergopro-apex-executive',
    sku: 'MNV-ERG-001',
    shortDescription: 'Flagship ergonomic chair featuring active lumbar matrix and breathable Italian elastomeric mesh.',
    description: `Engineered for professionals who spend 8+ hours at their desk, the ErgoPro Apex Executive represents the pinnacle of ergonomic design. Featuring our patented Dynamic Spine Alignment system, it continuously adapts to your subtle postural adjustments. The breathable Italian mesh ensures temperature regulation throughout the day, while 4D armrests eliminate wrist and shoulder fatigue.`,
    price: 899,
    compareAtPrice: 1099,
    categorySlug: 'ergonomic-chairs',
    categoryName: 'Ergonomic Chairs',
    collectionSlug: 'ergo-master-series',
    collectionName: 'Ergonomic Master Series',
    thumbnail: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Elastomeric Mesh', 'Die-Cast Aluminum', 'High-Density Memory Foam'],
    colors: [
      { name: 'Graphite Black', hex: '#1C1C1E' },
      { name: 'Platinum Silver', hex: '#E5E5EA' },
      { name: 'Midnight Navy', hex: '#1B263B' },
    ],
    features: [
      'Self-adjusting dynamic lumbar support',
      '4D multidirectional armrests',
      '135° sync-tilt mechanism with lock',
      'Breathable contour elastomeric mesh',
      'Adjustable seat depth & headrest height',
      'BIFMA Class 4 heavy-duty gas lift',
    ],
    specifications: [
      { name: 'Frame Material', value: 'Polished Die-Cast Aluminum' },
      { name: 'Upholstery', value: 'Korean Wintex Breathable Mesh' },
      { name: 'Gas Lift', value: 'Class 4 Heavy-Duty Cylinder' },
      { name: 'Recline Angle', value: '90° to 135° (4 Lock Positions)' },
      { name: 'Warranty', value: '10 Years Limited Warranty' },
      { name: 'Assembly', value: '15 Minutes Easy Assembly' },
    ],
    dimensions: {
      width: '68 cm',
      depth: '65 cm',
      height: '118 - 128 cm',
      seatHeight: '45 - 55 cm',
    },
    weight: '22 kg',
    maxLoad: '150 kg (330 lbs)',
    warranty: '10 Years',
    stock: 45,
    availability: 'in_stock',
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    bestSeller: true,
  },
  {
    id: 'prod-2',
    name: 'AeroMesh Pro 4D Task Chair',
    slug: 'aeromesh-pro-4d-task-chair',
    sku: 'MNV-OFF-002',
    shortDescription: 'High-performance office chair designed for all-day focus, cool airflow, and fluid mobility.',
    description: `The AeroMesh Pro 4D combines sleek minimalist aesthetics with uncompromising functional support. Built with high-tensile mesh fabric and a reinforced nylon polymer spine, this chair promotes active seating posture while maintaining effortless airflow.`,
    price: 649,
    compareAtPrice: 749,
    categorySlug: 'office-chairs',
    categoryName: 'Office Chairs',
    collectionSlug: 'ergo-master-series',
    collectionName: 'Ergonomic Master Series',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Tensile Mesh', 'Reinforced Polymer', 'Soft PU Arm Covers'],
    colors: [
      { name: 'Onyx Black', hex: '#000000' },
      { name: 'Slate Grey', hex: '#64748B' },
    ],
    features: [
      'Flexible lumbar flex system',
      'Pneumatic seat height adjustment',
      'Silent glide polyurethane casters',
      'Tilt tension resistance wheel',
    ],
    specifications: [
      { name: 'Mechanism', value: 'Synchro-Tilt with Multi-Lock' },
      { name: 'Casters', value: '65mm PU Mute Casters' },
      { name: 'Warranty', value: '7 Years' },
    ],
    dimensions: {
      width: '65 cm',
      depth: '62 cm',
      height: '110 - 120 cm',
      seatHeight: '43 - 53 cm',
    },
    weight: '18.5 kg',
    maxLoad: '136 kg (300 lbs)',
    warranty: '7 Years',
    stock: 28,
    availability: 'in_stock',
    rating: 4.8,
    reviewCount: 94,
    featured: true,
    newArrival: true,
  },
  {
    id: 'prod-3',
    name: 'Monarch Sovereign Leather Executive',
    slug: 'monarch-sovereign-leather-executive',
    sku: 'MNV-EXEC-003',
    shortDescription: 'Handcrafted top-grain Nappa leather executive chair with memory foam cushioning and dark walnut arm accents.',
    description: `Indulge in unmatched prestige with the Monarch Sovereign. Wrapped in supple top-grain Italian Nappa leather, every curve is meticulously hand-stitched over dual-density high-resilience memory foam. Designed for CEOs and visionary leaders.`,
    price: 1299,
    compareAtPrice: 1499,
    categorySlug: 'executive-chairs',
    categoryName: 'Executive Chairs',
    collectionSlug: 'executive-suite',
    collectionName: 'The Executive Suite',
    thumbnail: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Top-Grain Nappa Leather', 'Walnut Wood Accents', 'Polished Steel Base'],
    colors: [
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Obsidian Black', hex: '#121212' },
      { name: 'Cognac Tan', hex: '#9E5B32' },
    ],
    features: [
      '100% Genuine Italian Nappa Leather',
      'Dual-layer high-density memory foam',
      'Integrated headrest cushion',
      'Gentle knee-tilt rocking motion',
    ],
    specifications: [
      { name: 'Leather Type', value: 'Full Top-Grain Nappa Leather' },
      { name: 'Armrest', value: 'Padded Nappa Leather with Walnut trim' },
      { name: 'Warranty', value: '10 Years Lifetime Frame' },
    ],
    dimensions: {
      width: '72 cm',
      depth: '70 cm',
      height: '122 - 130 cm',
      seatHeight: '48 - 56 cm',
    },
    weight: '26 kg',
    maxLoad: '180 kg (400 lbs)',
    warranty: '10 Years',
    stock: 15,
    availability: 'in_stock',
    rating: 5.0,
    reviewCount: 67,
    featured: true,
    bestSeller: true,
  },
  {
    id: 'prod-4',
    name: 'TitanCraft Ultra Gaming Throne',
    slug: 'titancraft-ultra-gaming-throne',
    sku: 'MNV-GAM-004',
    shortDescription: 'Ultimate gaming chair featuring cold-cured foam, magnetic lumbar pillow, and 165° deep recline.',
    description: `Designed for competitive esports athletes and hardcore gamers. The TitanCraft Ultra features cold-cured high-density foam encased in breathable Prime PU leather. Supports full body recline up to 165 degrees for rest between intense matches.`,
    price: 549,
    compareAtPrice: 649,
    categorySlug: 'gaming-chairs',
    categoryName: 'Gaming Chairs',
    collectionSlug: 'gaming-pro-line',
    collectionName: 'Gaming Pro Line',
    thumbnail: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Cold-Cured Foam', 'Prime PU Leather', 'Steel Armor Frame'],
    colors: [
      { name: 'Stealth Black', hex: '#0D0D0D' },
      { name: 'Crimson Red', hex: '#8B0000' },
      { name: 'Cyber White', hex: '#F0F4F8' },
    ],
    features: [
      '165° full recline angle',
      'Magnetic memory foam lumbar pillow',
      '4D heavy-duty armrests with metal internal buttons',
      'Reinforced steel wheel base',
    ],
    specifications: [
      { name: 'Foam Density', value: '60 kg/m³ Cold-Cured Foam' },
      { name: 'Recline Mechanism', value: '90° - 165° Multi-Positional' },
      { name: 'Warranty', value: '5 Years' },
    ],
    dimensions: {
      width: '70 cm',
      depth: '68 cm',
      height: '125 - 135 cm',
      seatHeight: '46 - 56 cm',
    },
    weight: '24 kg',
    maxLoad: '160 kg (350 lbs)',
    warranty: '5 Years',
    stock: 32,
    availability: 'in_stock',
    rating: 4.9,
    reviewCount: 210,
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'VelvetCloud Architectural Lounge Chair',
    slug: 'velvetcloud-architectural-lounge-chair',
    sku: 'MNV-LNG-005',
    shortDescription: 'Mid-century sculptural lounge chair in tactile Bouclé fabric with brushed brass swivel base.',
    description: `Make an unforgettable statement in your executive study or home lounge. VelvetCloud pairs an organic shell silhouette with luxurious textured Bouclé upholstery and a 360° smooth swivel base.`,
    price: 799,
    compareAtPrice: 950,
    categorySlug: 'lounge-chairs',
    categoryName: 'Lounge Chairs',
    collectionSlug: 'modern-lounge-collection',
    collectionName: 'Modern Lounge Collection',
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Premium Bouclé Fabric', 'Molded Foam', 'Brushed Brass Metal Base'],
    colors: [
      { name: 'Cream Oat', hex: '#F3EFE0' },
      { name: 'Charcoal Wool', hex: '#333333' },
      { name: 'Olive Velvet', hex: '#556B2F' },
    ],
    features: [
      '360° smooth fluid rotation',
      'Plush, deep ergonomic seat shell',
      'Stain-resistant high-durability weave fabric',
      'Precision welded metal pedestal',
    ],
    specifications: [
      { name: 'Upholstery', value: 'Soft Tactile Bouclé / Velvet' },
      { name: 'Base Finish', value: 'Brushed Satin Gold / Brass' },
      { name: 'Warranty', value: '5 Years' },
    ],
    dimensions: {
      width: '82 cm',
      depth: '78 cm',
      height: '85 cm',
      seatHeight: '42 cm',
    },
    weight: '21 kg',
    maxLoad: '140 kg (310 lbs)',
    warranty: '5 Years',
    stock: 18,
    availability: 'in_stock',
    rating: 4.9,
    reviewCount: 43,
    featured: true,
    newArrival: true,
  },
  {
    id: 'prod-6',
    name: 'Confero Elite Swivel Boardroom Chair',
    slug: 'confero-elite-swivel-boardroom-chair',
    sku: 'MNV-CONF-006',
    shortDescription: 'Elegant low-back aluminum conference chair designed for high-impact decision rooms.',
    description: `Streamlined and elegant, the Confero Elite is crafted to maintain sleek visual lines across long conference tables. Features ribbed leatherette upholstery and an auto-return swivel mechanism.`,
    price: 429,
    compareAtPrice: 499,
    categorySlug: 'conference-chairs',
    categoryName: 'Conference Chairs',
    collectionSlug: 'executive-suite',
    collectionName: 'The Executive Suite',
    thumbnail: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Chrome Aluminum', 'Ribbed Microfiber Leather'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Camel Tan', hex: '#C19A6B' },
    ],
    features: [
      'Ribbed ergonomic backrest',
      'Polished aluminum armrests & 5-star base',
      'Memory return swivel function',
    ],
    specifications: [
      { name: 'Base', value: 'Polished Die-Cast Chrome Base' },
      { name: 'Warranty', value: '5 Years' },
    ],
    dimensions: {
      width: '60 cm',
      depth: '60 cm',
      height: '92 - 100 cm',
      seatHeight: '44 - 52 cm',
    },
    weight: '14 kg',
    maxLoad: '130 kg (285 lbs)',
    warranty: '5 Years',
    stock: 50,
    availability: 'in_stock',
    rating: 4.7,
    reviewCount: 38,
  },
  {
    id: 'prod-7',
    name: 'PostureFit Flex 360 Ergonomic',
    slug: 'posturefit-flex-360-ergonomic',
    sku: 'MNV-ERG-007',
    shortDescription: 'Adaptive spinal curve chair with automated lumbar pressure balancer.',
    description: `Designed in collaboration with physical orthopedic specialists, the PostureFit Flex 360 dynamically responds to thoracic and lumbar posture changes, minimizing lower back pressure points.`,
    price: 720,
    compareAtPrice: 850,
    categorySlug: 'ergonomic-chairs',
    categoryName: 'Ergonomic Chairs',
    collectionSlug: 'ergo-master-series',
    collectionName: 'Ergonomic Master Series',
    thumbnail: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['High-Strength Mesh', 'Polished Alloy', 'Breathable Cushion'],
    colors: [
      { name: 'Graphite', hex: '#2C2C2E' },
      { name: 'Teal Blue', hex: '#008080' },
    ],
    features: ['Auto-flexing lower back arch', 'Synchro tilt control', '3D headrest'],
    specifications: [
      { name: 'Certifications', value: 'GREENGUARD Gold Certified' },
      { name: 'Warranty', value: '8 Years' },
    ],
    dimensions: {
      width: '67 cm',
      depth: '64 cm',
      height: '115 - 125 cm',
      seatHeight: '44 - 54 cm',
    },
    weight: '20 kg',
    maxLoad: '145 kg',
    warranty: '8 Years',
    stock: 22,
    availability: 'in_stock',
    rating: 4.8,
    reviewCount: 82,
  },
  {
    id: 'prod-8',
    name: 'Nordic Wood Accent Visitor Chair',
    slug: 'nordic-wood-accent-visitor-chair',
    sku: 'MNV-VIS-008',
    shortDescription: 'Scandinavian bentwood arm chair with wool felt seat for modern reception and office visitors.',
    description: `Warm natural timber meets minimal architectural silhouette. Perfect for reception lounges, modern meeting rooms, or executive desk visitor seating.`,
    price: 349,
    compareAtPrice: 399,
    categorySlug: 'office-chairs',
    categoryName: 'Office Chairs',
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
    ],
    materials: ['Solid Ash Wood Frame', 'Wool Blend Upholstery'],
    colors: [
      { name: 'Natural Oak', hex: '#D2B48C' },
      { name: 'Walnut Stain', hex: '#5C4033' },
    ],
    features: ['Solid ash hardwood shell', 'Stackable design up to 4 chairs', 'High durability felt padding'],
    specifications: [
      { name: 'Wood Type', value: 'FSC Certified Solid Ash' },
      { name: 'Warranty', value: '3 Years' },
    ],
    dimensions: {
      width: '58 cm',
      depth: '55 cm',
      height: '80 cm',
      seatHeight: '45 cm',
    },
    weight: '8.5 kg',
    maxLoad: '120 kg',
    warranty: '3 Years',
    stock: 40,
    availability: 'in_stock',
    rating: 4.6,
    reviewCount: 29,
  },
]

export const WHY_CHOOSE_US = [
  {
    title: 'Ergonomic Science',
    description: 'Developed in partnership with spinal posture engineers to maintain natural spine alignment and eliminate strain.',
    icon: 'spine',
  },
  {
    title: 'Luxury Craftsmanship',
    description: 'Precision die-cast aluminum frames, Italian top-grain Nappa leather, and breathable elastomeric mesh.',
    icon: 'craft',
  },
  {
    title: '10-Year Warranty',
    description: 'Uncompromising confidence. Every structural frame and gas-lift mechanism comes backed by a 10-year warranty.',
    icon: 'shield',
  },
  {
    title: '30-Day Risk-Free Trial',
    description: 'Test the chair in your home or office for 30 days. If you don’t feel the difference, we’ll pick it up free.',
    icon: 'trial',
  },
]
