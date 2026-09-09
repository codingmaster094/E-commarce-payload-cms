type CouponLike = {
  code: string
  type?: 'percentage' | 'fixed' | null
  value?: number | null
  minimumOrderValue?: number | null
  maximumDiscount?: number | null
  usageLimit?: number | null
  usageCount?: number | null
  startDate?: string | null
  expiryDate?: string | null
  status?: string | null
  applicableProducts?: (string | { id: string })[] | null
  applicableCategories?: (string | { id: string })[] | null
}

export type CouponResult =
  | { valid: true; code: string; type: 'percentage' | 'fixed'; value: number; discount: number }
  | { valid: false; message: string }

export function evaluateCoupon(
  coupon: CouponLike,
  subtotal: number,
  productIds: string[] = [],
  categoryIds: string[] = [],
): CouponResult {
  if (coupon.status !== 'active') {
    return { valid: false, message: 'This coupon is not active.' }
  }

  const now = Date.now()
  if (coupon.startDate && new Date(coupon.startDate).getTime() > now) {
    return { valid: false, message: 'This coupon is not valid yet.' }
  }
  if (coupon.expiryDate && new Date(coupon.expiryDate).getTime() < now) {
    return { valid: false, message: 'This coupon has expired.' }
  }
  if (coupon.usageLimit != null && Number(coupon.usageCount || 0) >= coupon.usageLimit) {
    return { valid: false, message: 'This coupon has reached its usage limit.' }
  }
  if (coupon.minimumOrderValue && subtotal < coupon.minimumOrderValue) {
    return { valid: false, message: `Minimum order of ${coupon.minimumOrderValue} is required.` }
  }

  const productFilter = (coupon.applicableProducts || [])
    .map((item) => (typeof item === 'object' ? item.id : item))
    .filter(Boolean)
  if (productFilter.length > 0 && !productIds.some((id) => productFilter.includes(id))) {
    return { valid: false, message: 'This coupon does not apply to items in your cart.' }
  }

  const categoryFilter = (coupon.applicableCategories || [])
    .map((item) => (typeof item === 'object' ? item.id : item))
    .filter(Boolean)
  if (categoryFilter.length > 0 && !categoryIds.some((id) => categoryFilter.includes(id))) {
    return { valid: false, message: 'This coupon does not apply to items in your cart.' }
  }

  const type = coupon.type === 'fixed' ? 'fixed' : 'percentage'
  let discount = type === 'percentage' ? (subtotal * Number(coupon.value)) / 100 : Number(coupon.value)
  if (coupon.maximumDiscount != null) {
    discount = Math.min(discount, coupon.maximumDiscount)
  }
  discount = Math.max(0, Math.min(discount, subtotal))

  return { valid: true, code: coupon.code, type, value: Number(coupon.value), discount }
}
