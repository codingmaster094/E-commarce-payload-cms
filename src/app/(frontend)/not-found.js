import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-20 text-center space-y-4">
      <h1 className="text-3xl font-extrabold font-outfit">Page not found</h1>
      <p className="text-sm text-neutral-600">The page you requested is not available.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase rounded-xl">
        Back home
      </Link>
    </div>
  )
}
