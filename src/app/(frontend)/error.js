'use client'

export default function Error({ error, reset }) {
  return (
    <div className="container py-80">
      <h1 className="text-h2 mb-16">Etwas ist schiefgelaufen</h1>
      <p className="mb-24">{error?.message || 'Die Seite konnte nicht geladen werden.'}</p>
      <button type="button" className="btn-dark" onClick={() => reset()}>
        <span>Erneut versuchen</span>
      </button>
    </div>
  )
}
