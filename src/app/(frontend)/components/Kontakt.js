// components/Kontakt.jsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const Kontakt = ({
  Heading,
  SubHeading,
  FormHeading,
  DatenschutzerklarungLink,
  SubmitButton
}) => {
    console.log('SubmitButton', SubmitButton)
  const [form, setForm] = useState({
    role: 'Unternehmen',
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    anliegen: '',
  })
  const [files, setFiles] = useState([]) // Array of File objects
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  // Developer-provided local path — sent as fileUrl in payload.
  const DEV_FILE_PATH = '/mnt/data/3ec0802f-e181-4ebb-8d48-627a26e14488.png'

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 5) {
      alert('Bitte maximal 5 Dateien auswählen.')
      // Keep existing files or clear? Let's just take the first 5 for now or do nothing
      // Better UX: just slice the first 5
      setFiles(selectedFiles.slice(0, 5))
    } else {
      // Check total size
      const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0)
      if (totalSize > 15 * 1024 * 1024) { // 15MB limit
        alert('Die Gesamtgröße der Dateien darf 15 MB nicht überschreiten.')
        setFiles([])
        e.target.value = '' // Reset input
      } else {
        setFiles(selectedFiles)
      }
    }
  }

  // convert file to base64 string (without data:... prefix)
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null)
      const reader = new FileReader()
      reader.onload = () => {
        const r = String(reader.result || '')
        const payload = r.includes(',') ? r.split(',')[1] : r
        resolve(payload)
      }
      reader.onerror = (err) => reject(err)
      reader.readAsDataURL(file)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)

    const vorname = form.vorname?.trim()
    const nachname = form.nachname?.trim()
    const email = form.email?.trim()
    const telefon = form.telefon?.trim()
    const anliegen = form.anliegen?.trim()

    if (!vorname || !nachname || !email || !telefon || !anliegen) {
      setMessage({ type: 'error', text: 'Bitte alle Pflichtfelder ausfüllen.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: 'error', text: 'Bitte eine gültige E-Mail-Adresse angeben.' })
      return
    }

    setLoading(true)
    try {
      const attachments = []
      if (files && files.length > 0) {
        for (const f of files) {
          const base64 = await fileToBase64(f)
          attachments.push({ filename: f.name, content: base64 })
        }
      }

      // Build payload with select value and file info.
      const payload = {
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@meanova.de',
        subject: `Kontaktformular Anfrage von ${vorname} ${nachname}`,
        text: `
Rolle: ${form.role}
Name: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon}

Anliegen:
${anliegen}
File(s): ${files.length > 0 ? files.map(f => f.name).join(', ') : 'kein Upload, using developer file path'}
        `,
        html: `
          <h2>Neue Anfrage von der Website</h2>
          <p><strong>Rolle:</strong> ${form.role}</p>
          <p><strong>Name:</strong> ${vorname} ${nachname}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${telefon}</p>
          <p><strong>Anliegen:</strong><br/>${anliegen.replace(/\n/g, '<br/>')}</p>
          <p><strong>Datei(en):</strong> ${files.length > 0 ? files.map(f => f.name).join(', ') : DEV_FILE_PATH}</p>
        `,
        attachments,          // base64 attachments only if user uploaded
        // Always include the developer-provided local path as `fileUrl`.
        fileUrl: DEV_FILE_PATH,
        // Also include the select value explicitly (though it's in text/html).
        role: form.role,
      }

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Fehler beim Senden')

      setMessage({ type: 'success', text: 'Anfrage wurde erfolgreich versendet. Danke!' })
      setForm({ role: 'Unternehmen', vorname: '', nachname: '', email: '', telefon: '', anliegen: '' })
      setFiles([])
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'Beim Senden ist ein Fehler aufgetreten. Bitte später erneut versuchen.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='py-32 md:py-50 lg:py-80' id='kontakt'>
      <div className="container">
        <div className="inner flex justify-start items-start gap-32 xlg:gap-64 flex-col lg:flex-row">
          <div className='w-full lg:w-1/2 inset-0 relative lg:sticky lg:top-140'>
            <div className='space-y-16 relative lg:sticky lg:top-20'>
              <div className="title text-h2/snug font-jakarta font-normal">
                <h2>{Heading}</h2>
              </div>
              <div className="text-dark">
                <p>{SubHeading}</p>
              </div>
            </div>
          </div>

          <div className='w-full lg:w-1/2'>
            <form className="space-y-24" aria-label="Kontaktformular für Anfragen" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="role" className="block text-base_sm font-medium mb-8">
                  Wer sind Sie? <span className="text-red-500">*</span>
                </label>
                <select id="role" name="role" aria-required="true" value={form.role} onChange={handleChange}
                  className="w-full border border-body px-12 py-5 text-[#818181] focus:outline-none focus:ring-2 focus:ring-black">
                  <option>Unternehmen</option>
                  <option>Privatperson</option>
                </select>
                <div className="mt-2 text-sm text-gray-600">Ausgewählt: <strong>{form.role}</strong></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                <div>
                  <label htmlFor="vorname" className="block text-base_sm font-normal mb-8">Vorname <span className="text-red-500">*</span></label>
                  <input type="text" id="vorname" name="vorname" aria-required="true" value={form.vorname} onChange={handleChange}
                    className="w-full border border-body px-12 py-5 text-[#818181] focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label htmlFor="nachname" className="block text-base_sm font-normal mb-8">Nachname <span className="text-red-500">*</span></label>
                  <input type="text" id="nachname" name="nachname" aria-required="true" value={form.nachname} onChange={handleChange}
                    className="w-full border border-body px-12 py-5 text-[#818181] focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-base_sm font-normal mb-8">E-Mail-Adresse <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" aria-required="true" placeholder="mustermann@mustermann.de" value={form.email} onChange={handleChange}
                  className="w-full border border-body px-12 py-5 text-[#818181] focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div>
                <label htmlFor="telefon" className="block text-base_sm font-normal mb-8">Telefon <span className="text-red-500">*</span></label>
                <input type="tel" id="telefon" name="telefon" placeholder="+49123456789" aria-required="true" value={form.telefon} onChange={handleChange}
                  className="w-full border border-body px-12 py-5 text-[#818181] focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div>
                <label htmlFor="anliegen" className="block text-base_sm font-normal mb-8">Anliegen <span className="text-red-500">*</span></label>
                <textarea id="anliegen" name="anliegen" rows="4" aria-required="true" value={form.anliegen} onChange={handleChange}
                  className="w-full border border-body px-12 py-5 text-[#818181] focus:outline-none focus:ring-2 focus:ring-black"></textarea>
              </div>

              <div className="text-center border border-gray-300 rounded-md py-54 relative">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24  flex items-center justify-center mb-2">
                    {/* svg kept as-is */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z" fill="#000000" />
                      </g>
                    </svg>
                  </div>
                  <span className="block text-base_sm font-normal mb-8 text-dark">Bitte laden Sie Ihren Lebenslauf oder andere Dokumente hoch (Max. 5, max. 15MB).</span>
                  <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
              </div>
              {files.length > 0 && (
                <div className="mt-4 text-left">
                  <p className="text-sm text-gray-600">Ausgewählte Dateien:</p>
                  <ul className="list-disc pl-5">
                    {files.map((f, i) => (
                      <li key={i} className="font-medium text-black">{f.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <p>
                {FormHeading}
                {DatenschutzerklarungLink?.url && (
                  <Link href={DatenschutzerklarungLink.url} className="font-semibold text-black underline">{DatenschutzerklarungLink.label}</Link>
                )}
              </p>

              {message && (
                <div className={`p-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {message.text}
                </div>
              )}

              <button type="submit" className="!w-full btn-dark cursor-pointer" aria-label={SubmitButton} disabled={loading}>
                {loading ? 'Sende...' : SubmitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Kontakt
