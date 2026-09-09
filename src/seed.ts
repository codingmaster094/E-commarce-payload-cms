import type { Payload } from 'payload'
import { brandConfig } from './lib/brand'
import { CATEGORIES, COLLECTIONS, PRODUCTS, WHY_CHOOSE_US } from './lib/seedData'

const seedContext = { disableRevalidate: true }

function lexicalFromText(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              mode: 'normal',
              text: text || '',
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

async function upsertBySlug(
  payload: Payload,
  collection: 'categories' | 'collections' | 'products',
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    pagination: false,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      depth: 0,
      overrideAccess: true,
      context: seedContext,
    })
  }

  return payload.create({
    collection,
    data,
    depth: 0,
    overrideAccess: true,
    context: seedContext,
  })
}

export async function seedWebsite(payload: Payload) {
  payload.logger.info('Seeding MeaNova website data from frontend...')

  const categoryIds: Record<string, string | number> = {}
  for (const category of CATEGORIES) {
    const doc = await upsertBySlug(payload, 'categories', category.slug, {
      name: category.name,
      slug: category.slug,
      description: category.description,
      imageUrl: category.image,
      featured: Boolean(category.featured),
    })
    categoryIds[category.slug] = doc.id
  }

  const collectionIds: Record<string, string | number> = {}
  for (const collection of COLLECTIONS) {
    const doc = await upsertBySlug(payload, 'collections', collection.slug, {
      name: collection.name,
      slug: collection.slug,
      tagline: collection.tagline,
      description: collection.description,
      imageUrl: collection.image,
      featured: Boolean(collection.featured),
    })
    collectionIds[collection.slug] = doc.id
  }

  const productIds: Record<string, string | number> = {}
  for (const product of PRODUCTS) {
    const doc = await upsertBySlug(payload, 'products', product.slug, {
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      category: categoryIds[product.categorySlug],
      collections: product.collectionSlug && collectionIds[product.collectionSlug]
        ? [collectionIds[product.collectionSlug]]
        : [],
      shortDescription: product.shortDescription,
      description: lexicalFromText(product.description),
      thumbnailUrl: product.thumbnail,
      imageUrls: product.images.map((url) => ({ url })),
      materials: product.materials.map((material) => ({ material })),
      colors: product.colors,
      features: product.features.map((feature) => ({ feature })),
      specifications: product.specifications,
      dimensions: product.dimensions,
      weight: product.weight,
      maxLoad: product.maxLoad,
      warranty: product.warranty,
      stock: product.stock,
      availability: product.availability,
      rating: product.rating,
      reviewCount: product.reviewCount,
      featured: Boolean(product.featured),
      bestSeller: Boolean(product.bestSeller),
      newArrival: Boolean(product.newArrival),
    })
    productIds[product.slug] = doc.id
  }

  for (const collection of COLLECTIONS) {
    const related = PRODUCTS.filter((product) => product.collectionSlug === collection.slug)
      .map((product) => productIds[product.slug])
      .filter(Boolean)

    await upsertBySlug(payload, 'collections', collection.slug, {
      products: related,
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: brandConfig.brandName,
      shortName: brandConfig.shortName,
      tagline: brandConfig.brandTagline,
      brandDescription: brandConfig.brandDescription,
      logoText: brandConfig.logoText,
      logoSubtext: brandConfig.logoSubtext,
      currency: brandConfig.currency,
      currencyCode: brandConfig.currencyCode,
      email: brandConfig.contactEmail,
      phone: brandConfig.phone,
      address: brandConfig.address,
      hoursWeekday: 'Monday – Friday: 9:00 AM – 6:00 PM EST',
      hoursSaturday: 'Saturday: 10:00 AM – 4:00 PM EST',
      contactIntro:
        'Visit our flagship design plaza to test out all ergonomic models, trial custom leather options, and consult with our postural posture team.',
      freeShippingThreshold: brandConfig.policies.freeShippingThreshold,
      warrantyYears: brandConfig.policies.warrantyYears,
      trialDays: brandConfig.policies.trialDays,
      announcementLeft: 'Exclusive Seating Innovation',
      announcementMiddle: `Free Delivery on Orders Over $${brandConfig.policies.freeShippingThreshold}`,
      announcementRight: `${brandConfig.policies.warrantyYears}-Year Frame Warranty`,
      instagram: brandConfig.socialLinks.instagram,
      twitter: brandConfig.socialLinks.twitter,
      facebook: brandConfig.socialLinks.facebook,
      linkedin: brandConfig.socialLinks.linkedin,
      youtube: brandConfig.socialLinks.youtube,
    },
    overrideAccess: true,
    context: seedContext,
  })

  await payload.updateGlobal({
    slug: 'menus',
    data: {
      menus: [
        { link: { label: 'Home', url: '/', target: '_self' } },
        { link: { label: 'Chairs', url: '/chairs', target: '_self' } },
        { link: { label: 'Categories', url: '/categories', target: '_self' } },
        { link: { label: 'Collections', url: '/collections', target: '_self' } },
        { link: { label: 'About', url: '/about', target: '_self' } },
        { link: { label: 'Contact', url: '/contact', target: '_self' } },
      ],
    },
    overrideAccess: true,
    context: seedContext,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      title: 'Header',
      slug: 'header',
      link: {
        Kontakt_label: 'Account',
        url: '/account',
        target: '_self',
      },
    },
    overrideAccess: true,
    context: seedContext,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      title: 'Footer',
      slug: 'footer',
      description: brandConfig.brandDescription,
      kontakt: {
        phone: brandConfig.phone,
        phone_urls: `tel:${brandConfig.phone.replace(/[^+\d]/g, '')}`,
        email: brandConfig.contactEmail,
        email_url: `mailto:${brandConfig.contactEmail}`,
        address: brandConfig.address,
      },
      sprechzeiten: [
        { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM EST' },
        { day: 'Saturday', time: '10:00 AM – 4:00 PM EST' },
      ],
      navigation: [
        {
          heading: 'Customer Support',
          menus: [
            { label: 'All Chairs Catalog', url: '/chairs' },
            { label: 'Signature Collections', url: '/collections' },
            { label: 'Chair Comparison Tool', url: '/compare' },
            { label: 'Saved Wishlist', url: '/wishlist' },
            { label: 'Shopping Cart', url: '/cart' },
            { label: 'Contact & Showroom', url: '/contact' },
          ],
        },
      ],
      legalLinks: [
        { label: 'Privacy Policy', url: '/datenschutzerklaerung' },
        { label: 'Terms of Service', url: '/impressum' },
        { label: 'Warranty Policy', url: '/contact' },
      ],
      copyright: `© {year} ${brandConfig.brandName}. All rights reserved.`,
    },
    overrideAccess: true,
    context: seedContext,
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        badge: 'Next-Generation Seating Technology',
        heading: 'Sit Better.',
        headingAccent: 'Work Better. Live Better.',
        description:
          'Engineering state-of-the-art ergonomic chairs, luxury executive leather seating, and high-performance task chairs designed for health, endurance, and refined spaces.',
        imageUrl:
          'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=2000&auto=format&fit=crop',
        primaryCta: { label: 'Explore All Chairs', url: '/chairs' },
        secondaryCta: { label: 'View Collections', url: '/collections' },
        metrics: [
          { value: '10-Year', label: 'Frame Warranty' },
          { value: '30-Day', label: 'Risk-Free Trial' },
          { value: 'Free', label: 'Express Delivery' },
        ],
      },
      categoriesSection: {
        eyebrow: 'Curated Selection',
        heading: 'Browse by Chair Category',
        linkLabel: 'View All Categories →',
        linkUrl: '/categories',
      },
      productsSection: {
        eyebrow: 'Flagship Seating',
        heading: 'Best-Selling Chairs',
        linkLabel: 'Explore All Chairs →',
        linkUrl: '/chairs',
      },
      whyChoose: {
        eyebrow: 'The MEANOVA Standard',
        heading: 'Engineered Without Compromise',
        description:
          'Every MEANOVA chair represents hundreds of hours of ergonomic refinement, structural testing, and luxury material selection.',
        items: WHY_CHOOSE_US,
      },
      ergo: {
        eyebrow: 'Precision Engineering',
        heading: 'The Anatomy of Perfect Sitting',
        description:
          'Click below to explore how our chairs protect your spine and maintain optimal energy levels.',
        ctaLabel: 'Find Chairs with This Feature',
        ctaUrl: '/chairs',
        tabs: [
          {
            key: 'lumbar',
            title: 'Dynamic Lumbar Matrix',
            description:
              'Automatically adjusts to your lower spine curvature, actively reducing lumbar disk pressure by up to 40%.',
            imageUrl:
              'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?q=80&w=800&auto=format&fit=crop',
          },
          {
            key: 'armrests',
            title: '4D Fluid Multidirectional Armrests',
            description:
              'Adjust height, width, depth, and pivot angle to eliminate shoulder tension and wrist strain during typing.',
            imageUrl:
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
          },
          {
            key: 'recline',
            title: '135° Synchro-Tilt Recline',
            description:
              'Seamlessly shift between deep focus and relaxed brainstorming with 4 lockable recline angles.',
            imageUrl:
              'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=800&auto=format&fit=crop',
          },
          {
            key: 'mesh',
            title: 'Italian Elastomeric Breathable Mesh',
            description:
              'Engineered for maximum thermal dissipation, keeping you cool and comfortable even through marathon workdays.',
            imageUrl:
              'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800&auto=format&fit=crop',
          },
        ],
      },
      collectionsSection: {
        eyebrow: 'Signature Lines',
        heading: 'Curated Design Collections',
      },
      testimonials: {
        eyebrow: 'Verified Feedback',
        heading: 'What Chair Owners Say',
        items: [
          {
            quote:
              'As a software architect sitting 10+ hours a day, the ErgoPro Apex completely eliminated my chronic lower back strain within two weeks.',
            author: 'Dr. Marcus Vance',
            role: 'Verified Buyer',
            rating: 5,
          },
          {
            quote:
              'The Monarch Sovereign leather executive chair is the centerpiece of our boardroom. Meticulous craftsmanship and unbelievable comfort.',
            author: 'Elena Rostova',
            role: 'Executive VP',
            rating: 5,
          },
          {
            quote:
              'The 30-day risk-free trial gave us total confidence. We ordered 15 AeroMesh chairs for our creative studio and couldn’t be happier.',
            author: 'David K.',
            role: 'Studio Director',
            rating: 5,
          },
        ],
      },
      cta: {
        eyebrow: 'Find Your Perfect Fit',
        heading: 'Ready to Elevate Your Daily Comfort?',
        description:
          'Browse our full chair collection or use our interactive comparison tool to find the exact model for your body and workspace.',
        primaryCta: { label: 'Explore All Chairs', url: '/chairs' },
        secondaryCta: { label: 'Visit Showroom', url: '/contact' },
      },
    },
    overrideAccess: true,
    context: seedContext,
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroEyebrow: 'Our Philosophy',
      heroHeading: 'Designed for the Way You Sit.',
      heroDescription: `At ${brandConfig.brandName}, we believe seating is not merely furniture — it is the essential interface between human physiology, focused intellect, and architectural design.`,
      storyEyebrow: 'Craftsmanship & Science',
      storyHeading: 'Precision Ergonomics Meets Luxury Aesthetics',
      storyParagraphs: [
        {
          text: 'Founded with a commitment to eliminate desk fatigue, every model in our collection undergoes rigorous BIFMA load testing, spine biomechanics alignment, and luxury material selection.',
        },
        {
          text: 'From Italian elastomeric mesh to top-grain Nappa leathers and die-cast aluminum frames, our chairs are built to endure decades of intense daily performance.',
        },
      ],
      storyImageUrl:
        'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1200&auto=format&fit=crop',
      pillarsHeading: 'Our Four Design Pillars',
      pillars: [
        {
          icon: '⚡',
          title: 'Spine Alignment',
          description: 'Active lumbar matrix adapting to natural curvature.',
        },
        {
          icon: '🌱',
          title: 'Thermal Comfort',
          description: 'Breathable mesh for zero heat retention.',
        },
        {
          icon: '🛡️',
          title: '10-Year Guarantee',
          description: 'Heavy-duty structural integrity confidence.',
        },
        {
          icon: '🎨',
          title: 'Sculptural Form',
          description: 'Architectural elegance elevating any space.',
        },
      ],
      ctaHeading: 'Experience the MEANOVA Difference',
      ctaLabel: 'Explore All Chairs Catalog',
      ctaUrl: '/chairs',
    },
    overrideAccess: true,
    context: seedContext,
  })

  payload.logger.info('MeaNova website seed complete.')
}
