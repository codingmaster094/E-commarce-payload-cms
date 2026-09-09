import React from "react";
import { getGlobal } from '@/lib/cms'
import generatePageMetadata from '../untils/generatePageMetadata'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return generatePageMetadata('datenschutzerklaerung', {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung der MeaNova GmbH',
  })
}

export default async function page() {
  const data = await getGlobal('datenschutzerklaerung')
  if (data?.contents?.Gutenberg_html) {
    return (
      <div className="pagecontent">
        <div className="container" dangerouslySetInnerHTML={{ __html: data.contents.Gutenberg_html }} />
      </div>
    )
  }
  return <StaticPrivacy />
}

const StaticPrivacy = () => {
  return (
    <div className="pagecontent">
      <div className="container">
        <h1>Datenschutzerklärung</h1>
        <p className="last-updated">
          <em>Stand: 18.10.2025</em>
        </p>

        <div className="section">
          <h2>1. Verantwortlicher</h2>
          <p>
            <strong>MeaNova GmbH</strong>
            <br />
            Salzstraße 8, 85622 Feldkirchen, Deutschland
            <br />
            Telefon: 089 189659820
            <br />
            E-Mail: <a href="mailto:info@meanova.de">info@meanova.de</a>
          </p>
          <p>
            Vertreten durch die Geschäftsführerin: <strong>Laura Marie Fies</strong>
          </p>
        </div>

        <div className="section">
          <h2>2. Allgemeines zur Datenverarbeitung</h2>
          <p>
            Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der
            EU-Datenschutz-Grundverordnung (DSGVO), des Bundesdatenschutzgesetzes
            (BDSG) sowie weiterer anwendbarer Vorschriften.
          </p>
          <p>
            <strong>Kategorien betroffener Personen:</strong> Besucherinnen und
            Besucher dieser Website, Nutzerinnen und Nutzer des ggf. vorhandenen
            Login-/Admin-Bereichs.
          </p>
          <p>
            <strong>Kategorien von Daten:</strong> Nutzungs- und Metadaten (z. B.
            IP-Adresse, Zeitstempel, angeforderte URL, Referrer, Statuscode,
            User-Agent), Inhaltsdaten (z. B. Eingaben in Formularen),
            Bestandsdaten (z. B. Nutzerkonto-Stammdaten bei Admins).
          </p>
          <p>
            <strong>Zwecke der Verarbeitung:</strong> Bereitstellung der Website,
            IT-Sicherheit, Fehleranalyse, Reichweiten-/Leistungsüberwachung,
            Beantwortung von Anfragen, Verwaltung von Inhalten (CMS).
          </p>
          <p>
            <strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. b DSGVO
            (Vertrag/vertragsvorbereitende Maßnahmen), Art. 6 Abs. 1 lit. c
            DSGVO (rechtliche Verpflichtung), Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse), Art. 6 Abs. 1 lit. a DSGVO (Einwilligung,
            sofern erforderlich).
          </p>
        </div>

        <div className="section">
          <h2>3. Hosting, Auslieferung &amp; Infrastruktur (Vercel)</h2>
          <p>
            Unsere Website wird über den Dienst <strong>Vercel</strong> betrieben.
            Primärer Serverstandort ist <strong>Frankfurt (DE)</strong>. Zur schnellen
            Auslieferung setzt Vercel außerdem ein globales Content-Delivery-Network
            (CDN) und Edge-Dienste ein. Dabei ist technisch bedingt nicht
            auszuschließen, dass Zugriffe kurzfristig über Knoten außerhalb der
            EU geleitet oder von Vercel-Unternehmen in Drittstaaten administrativ
            eingesehen werden (z. B. USA, Support-/Wartungsfälle).
          </p>
          <ul>
            <li>
              <strong>Dienstanbieter (Auftragsverarbeiter):</strong> Vercel Inc.,
              USA
            </li>
            <li>
              <strong>Zweck:</strong> Hosting, Auslieferung statischer und
              dynamischer Inhalte, Performance-Optimierung, Sicherheits- und
              Betriebslogs
            </li>
            <li>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an einer sicheren und effizienten
              Bereitstellung unserer Website) und -- soweit eine Einwilligung für
              optionale Technologien erforderlich ist -- Art. 6 Abs. 1 lit. a
              DSGVO
            </li>
            <li>
              <strong>Vertrag zur Auftragsverarbeitung:</strong> abgeschlossen
              gem. Art. 28 DSGVO
            </li>
            <li>
              <strong>Datenübermittlung in Drittländer:</strong> Absicherung über
              EU-Standardvertragsklauseln (Art. 46 DSGVO) und zusätzliche
              Schutzmaßnahmen
            </li>
          </ul>
          <p>
            <strong>Server-/Zugriffsprotokolle:</strong> Bei jedem Aufruf werden u. a.
            IP-Adresse, Datum/Uhrzeit, Request-Zeile/URL, Referrer-URL, HTTP-
            Statuscode, übertragene Bytes, User-Agent erfasst und in Logfiles
            gespeichert.
          </p>
          <p>
            <strong>Speicherdauer:</strong> Protokolldaten werden zur Sicherstellung
            des Betriebs und zur Fehleranalyse gespeichert und anschließend
            gelöscht. Die konkrete Dauer richtet sich nach technischen
            Erfordernissen; eine übliche Aufbewahrungsdauer liegt im Rahmen
            weniger Tage bis maximal einiger Wochen. Bei sicherheitsrelevanten
            Vorfällen können Logs bis zur abschließenden Klärung aufbewahrt
            werden.
          </p>
          <p>
            <strong>Berechtigte Interessen:</strong> Stabilität und Sicherheit des
            Systems, Missbrauchs- und Angriffserkennung, Nachvollziehbarkeit von
            Störfällen.
          </p>
        </div>

        <div className="section">
          <h2>4. Content-Management (Payload CMS)</h2>
          <p>
            Wir verwenden <strong>Payload CMS</strong> zur Verwaltung der
            Website-Inhalte. Bei Nutzung eines <strong>Admin-/Login-Bereichs</strong>
            verarbeitet das CMS insbesondere:
          </p>
          <ul>
            <li>
              <strong>Datenkategorien:</strong> Login-Daten (E-Mail/Benutzername,
              Passwort-Hash), Sitzungs-/Authentifizierungs-Cookies oder -Tokens,
              Protokolle von Admin-Aktionen (z. B. Änderungen an Inhalten)
            </li>
            <li>
              <strong>Zwecke:</strong> Authentifizierung, Rechteverwaltung,
              Nachvollziehbarkeit von Änderungen (Revisions/History), Sicherheit
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (Nutzungs-/Admin-Verhältnis), Art. 6 Abs. 1 lit. f DSGVO
              (Sicherheit/Integrität des Systems)
            </li>
            <li>
              <strong>Empfänger:</strong> Technischer Betrieb erfolgt auf der oben
              beschriebenen Vercel-Infrastruktur; ggf. weitere IT-Dienstleister
              im Rahmen einer Auftragsverarbeitung
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>5. Cookies &amp; lokale Speichertechnologien</h2>
          <p>
            Wir setzen <strong>technisch notwendige Cookies/Storage-Einträge</strong>
            ein (z. B. für Session-/Login, CSRF-Schutz, Sprachauswahl). Diese sind
            für den Betrieb erforderlich.
          </p>
          <p>
            Sofern <strong>optionale</strong> Technologien (z. B. Analyse/Marketing,
            komfortbezogene Funktionen) eingesetzt werden, holen wir <strong>vorab
            Ihre Einwilligung</strong> über ein entsprechendes Einwilligungs-
            Banner ein. Sie können Ihre Zustimmung jederzeit mit Wirkung für die
            Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).
          </p>
          <p>
            <strong>Rechtsgrundlagen:</strong> Notwendige Cookies: Art. 6 Abs. 1
            lit. f DSGVO; optionale Cookies: Art. 6 Abs. 1 lit. a DSGVO.
          </p>
          <p>
            <em>(Hinweis für Nutzer*innen: Einstellungen können Sie -- sofern
            vorhanden -- in den Cookie-Einstellungen auf dieser Website ändern.)</em>
          </p>
        </div>

        <div className="section">
          <h2>6. Kommunikation (E-Mail/Telefon/Kontakt)</h2>
          <p>
            Bei der Kontaktaufnahme verarbeiten wir die von Ihnen übermittelten
            Daten (z. B. Name, Kontaktdaten, Inhalt der Anfrage, Zeitpunkt).
          </p>
          <p>
            <strong>Zwecke/Rechtsgrundlagen:</strong> Bearbeitung der Anfrage und
            ggf. vorvertragliche/vertragliche Kommunikation (Art. 6 Abs. 1 lit. b
            DSGVO) sowie berechtigte Interessen an effizienter Kommunikation
            (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            <strong>Speicherdauer:</strong> Anfragen werden entsprechend gesetzlicher
            Aufbewahrungspflichten bzw. bis zur finalen Erledigung aufbewahrt; bei
            kaufmännischer Relevanz bis zu 6 bzw. 10 Jahre (Art. 6 Abs. 1 lit. c
            DSGVO i. V. m. HGB/AO).
          </p>
          <p>Ergänzend kann die Kommunikation – sofern gewünscht und vom Nutzer initiiert – auch über Messenger-Dienste (z. B. WhatsApp) erfolgen.</p>
          <p>In diesem Fall verarbeiten wir zusätzlich die Telefonnummer, Kommunikationsinhalte sowie Meta-Daten (z. B. Zeitpunkte der Kommunikation) zur Bearbeitung der Anfrage bzw. im Rahmen vorvertraglicher/vertraglicher Maßnahmen.</p>
          <p>Dabei können Dienstleister aus dem Bereich der Kommunikationsdienste eingesetzt werden (z. B. WhatsApp Ireland Limited).</p>
          <p>Eine Übermittlung personenbezogener Daten in Drittländer (insbesondere in die USA) kann dabei nicht ausgeschlossen werden. Die Absicherung erfolgt – soweit möglich – über geeignete Garantien im Sinne der Art. 44 ff. DSGVO (z. B. Standardvertragsklauseln).</p>
          <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>
        </div>

        <div className="section">
          <h2>7. Bewerber-, Kandidaten- und Recruitingprozess</h2>
          <p>
            Im Rahmen unserer Tätigkeit als Personalberatung und Recruiting-Dienstleister verarbeiten wir personenbezogene Daten von Bewerberinnen, Bewerbern, Kandidatinnen und Kandidaten.
          </p>
          <p>Hierzu können insbesondere gehören:</p>
          <ul>
            <li>Stammdaten (z. B. Name, Kontaktdaten, Wohnort)</li>
            <li>Bewerbungsunterlagen (z. B. Lebenslauf, Zeugnisse, Qualifikationen)</li>
            <li>berufliche Informationen (z. B. Gehaltsvorstellungen, Verfügbarkeit, Projekterfahrungen)</li>
            <li>Kommunikationsdaten aus Telefonaten, E-Mails, Videokonferenzen oder Messenger-Diensten</li>
            <li>Gesprächsnotizen und Informationen aus dem Recruitingprozess</li>
          </ul>
          <p>
            Die Verarbeitung erfolgt ausschließlich zum Zweck der Durchführung von Recruiting-, Personalvermittlungs- und Besetzungsprozessen sowie zur Kontaktaufnahme im Rahmen beruflicher Möglichkeiten.
          </p>
          <p>Rechtsgrundlagen der Verarbeitung sind insbesondere:</p>
          <ul>
            <li>Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Durchführung von Recruiting- und Vermittlungsprozessen)</li>
            <li>sowie ggf. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
          </ul>
          <p>
            Im Regelfall erfolgt eine erste Kandidatenvorstellung gegenüber potenziellen Kundenunternehmen zunächst anonymisiert oder teil-anonymisiert. Eine offene Weitergabe personenbezogener Daten an Kundenunternehmen erfolgt grundsätzlich erst nach vorheriger Abstimmung mit der betroffenen Person.
          </p>
          <p>
            Personenbezogene Daten werden nur an solche Unternehmen oder Ansprechpartner weitergegeben, die unmittelbar in einen konkreten Recruiting- oder Besetzungsprozess eingebunden sind.
          </p>
          <p>
            Zur Verwaltung von Kandidaten-, Kunden- und Prozessdaten nutzen wir interne Systeme, CRM-Lösungen und unterstützende Dienstleister. Der Zugriff erfolgt ausschließlich im erforderlichen Umfang nach dem Need-to-know-Prinzip.
          </p>
          <p>
            Personenbezogene Daten werden grundsätzlich nur so lange gespeichert, wie dies für die Durchführung von Recruiting-, Vermittlungs- oder Kommunikationsprozessen erforderlich ist oder berechtigte Interessen an einer weiteren Speicherung bestehen. Betroffene Personen können jederzeit der weiteren Verarbeitung widersprechen oder die Löschung ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </div>

        <div className="section">
          <h2>8. Einsatz digitaler Assistenzsysteme und KI-gestützter Tools</h2>
          <p>
            Zur Unterstützung interner Arbeits-, Kommunikations- und Organisationsprozesse können digitale Assistenzsysteme sowie KI-gestützte Anwendungen eingesetzt werden.
          </p>
          <p>Dies betrifft insbesondere:</p>
          <ul>
            <li>Formulierungs- und Strukturierungshilfen</li>
            <li>Erstellung und Optimierung von Texten</li>
            <li>Recherchezwecke</li>
            <li>Analysen</li>
            <li>Unterstützung bei organisatorischen Abläufen</li>
            <li>Auswertung und Aufbereitung von Informationen</li>
            <li>interne Dokumentations- und Kommunikationsprozesse</li>
          </ul>
          <p>
            Dabei erfolgt der Einsatz ausschließlich unterstützend und nicht zur automatisierten Entscheidungsfindung im Sinne des Art. 22 DSGVO.
          </p>
          <p>
            Eine vollautomatisierte Bewertung oder Auswahl von Kandidatinnen oder Kandidaten findet nicht statt. Sämtliche Entscheidungen innerhalb des Recruiting- und Vermittlungsprozesses erfolgen durch natürliche Personen.
          </p>
          <p>
            Die Verarbeitung personenbezogener Daten erfolgt dabei nur im erforderlichen Umfang und unter Beachtung der geltenden datenschutzrechtlichen Vorgaben.
          </p>
          <p>
            Sofern externe Dienstleister oder cloudbasierte Systeme eingesetzt werden, erfolgt dies ausschließlich auf Grundlage geeigneter datenschutzrechtlicher Vereinbarungen und – soweit erforderlich – geeigneter Garantien gemäß Art. 44 ff. DSGVO.
          </p>
        </div>

        <div className="section">
          <h2>9. Bereitstellung der Website &amp; Logfiles</h2>
          <p>
            Die Verarbeitung der in <strong>Abschnitt 3</strong> beschriebenen
            Protokolldaten ist für die Auslieferung der Website technisch
            erforderlich. Eine Zusammenführung dieser Daten mit anderen
            Datenquellen erfolgt nicht. Eine Auswertung zu Marketingzwecken
            findet ohne Ihre Einwilligung nicht statt.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </div>

        <div className="section">
          <h2>10. Empfänger von Daten / Kategorien von Empfängern</h2>
          <ul>
            <li>
              <strong>Auftragsverarbeiter:</strong> Vercel (Hosting/CDN), ggf.
              IT-Dienstleister für Wartung/Support
            </li>
            <li>
              <strong>Interne Empfänger:</strong> Fachabteilungen (nur soweit
              erforderlich, nach dem Need-to-know-Prinzip)
            </li>
            <li>
              <strong>Öffentliche Stellen:</strong> nur bei Bestehen einer
              gesetzlichen Verpflichtung
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>11. Drittlandübermittlungen</h2>
          <p>
            Soweit Dienste von Anbietern mit Sitz außerhalb der EU/des EWR eingesetzt
            werden oder Support/Administration durch Unternehmen in Drittstaaten
            erfolgt (insb. USA), sichern wir Übermittlungen durch
            <strong>Standardvertragsklauseln</strong> (Art. 46 DSGVO) und -- wo
            möglich -- zusätzliche technische und organisatorische Maßnahmen ab.
            Gleichwohl kann ein Restrisiko (z. B. behördliche Zugriffe) nicht
            vollständig ausgeschlossen werden.
          </p>
        </div>

        <div className="section">
          <h2>12. Speicherdauer</h2>
          <p>
            Sofern in dieser Erklärung nicht abweichend angegeben, löschen bzw.
            anonymisieren wir personenbezogene Daten, sobald der jeweilige Zweck
            entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            Kriterien für die Dauer sind u. a. gesetzliche Fristen, Verjährungs-
            fristen sowie Erforderlichkeit zur Abwehr/Verfolgung von Ansprüchen.
          </p>
        </div>

        <div className="section">
          <h2>13. Pflicht zur Bereitstellung von Daten</h2>
          <p>
            Die Bereitstellung von Nutzungsdaten bei rein informatorischer Nutzung
            ist technisch erforderlich. Bei Nichtbereitstellung kann die Website
            ggf. nicht oder nur eingeschränkt bereitgestellt werden.
          </p>
        </div>

        <div className="section">
          <h2>14. Sicherheit der Verarbeitung</h2>
          <p>
            Wir verwenden aktuelle <strong>TLS-Verschlüsselung</strong> (HTTPS) und
            angemessene technische und organisatorische Maßnahmen (TOM), um
            Vertraulichkeit, Integrität und Verfügbarkeit personenbezogener Daten
            zu schützen (Art. 32 DSGVO).
          </p>
        </div>

        <div className="section">
          <h2>15. Minderjährige</h2>
          <p>
            Unser Angebot richtet sich nicht an Kinder im Sinne von Art. 8 DSGVO.
            Sofern wir Kenntnis von der Verarbeitung personenbezogener Daten von
            Minderjährigen ohne erforderliche Zustimmung erlangen, löschen wir
            diese Daten unverzüglich.
          </p>
        </div>

        <div className="section">
          <h2>16. Keine automatisierte Entscheidungsfindung</h2>
          <p>
            Es findet <strong>keine</strong> automatisierte Entscheidungsfindung
            einschließlich Profiling i. S. v. Art. 22 DSGVO statt.
          </p>
        </div>

        <div className="section">
          <h2>17. Rechte der betroffenen Personen</h2>
          <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf:</p>
          <ul>
            <li><strong>Auskunft</strong> (Art. 15 DSGVO),</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO),</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO),</li>
            <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO),</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO),</li>
            <li>
              <strong>Widerspruch</strong> gegen Verarbeitungen auf Grundlage
              berechtigter Interessen (Art. 21 DSGVO).
              <br />
              <em>Hinweis:</em> Bei Widerspruch gegen notwendige Verarbeitungen
              (z. B. Sicherheitslogs) kann die Website nicht fehlerfrei bereitgestellt werden.
            </li>
            <li><strong>Widerruf erteilter Einwilligungen</strong> (Art. 7 Abs. 3 DSGVO)
            mit Wirkung für die Zukunft.</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannten
            Kontaktdaten.
          </p>
        </div>

        <div className="section">
          <h2>18. Beschwerderecht bei einer Aufsichtsbehörde</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
            beschweren (Art. 77 DSGVO). Für Bayern (Sitz unseres Unternehmens)
            zuständig ist insbesondere:
          </p>
          <p>
            <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong>
            <br />
            Promenade 27, 91522 Ansbach, Deutschland
            <br />
            Web: <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">https://www.lda.bayern.de</a>
          </p>
        </div>

        <div className="section">
          <h2>19. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir passen diese Datenschutzerklärung an, wenn dies aufgrund technischer
            Änderungen, rechtlicher Vorgaben oder der Erweiterung unserer Dienste
            erforderlich ist. Es gilt die jeweils hier veröffentlichte Version.
          </p>
        </div>
      </div>
    </div>
  );
}