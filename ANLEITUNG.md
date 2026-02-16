# Always Automaten - Komplette technische Dokumentation

Letzte Aktualisierung: 16. Februar 2026

---

## 1. ÜBERSICHT - WIE ALLES ZUSAMMENHÄNGT

```
Dein Mac (Desktop/always-automaten/)
        |
        | git push (Terminal-Befehl)
        ↓
GitHub (github.com/AlwaysAutomaten/always-automaten.de)
        |
        | GitHub Pages (wandelt Repo automatisch in Website um)
        ↓
Live-Website (https://always-automaten.de)
        ↑
        | DNS-Einstellungen (leiten Domain auf GitHub weiter)
        |
Netcup (Domain-Registrar für always-automaten.de)
```

Die Website ist eine **statische HTML-Seite** (kein WordPress, kein CMS). Alle Dateien
liegen als einfache HTML/CSS/JS-Dateien im Ordner auf deinem Desktop. Wenn du eine Datei
änderst und auf GitHub hochlädst, ist die Änderung nach 1-2 Minuten live.

---

## 2. ALLE ACCOUNTS & ZUGÄNGE

| Dienst | URL | Account / Login | Zweck |
|--------|-----|----------------|-------|
| GitHub | github.com | AlwaysAutomaten | Website-Hosting (GitHub Pages) |
| Netcup | customercontrolpanel.de | Dein Netcup-Login | Domain always-automaten.de verwalten |
| Web3Forms | web3forms.com | info@always-automaten.de | Formulare senden E-Mails an dich |
| Google Analytics | analytics.google.com | Dein Google-Konto | Besucherstatistiken |
| Google Search Console | search.google.com/search-console | Dein Google-Konto | SEO, Google-Indexierung |
| Google Business | business.google.com | Dein Google-Konto | Google Maps Eintrag |
| E-Mail | Google Workspace | info@always-automaten.de | Geschäfts-E-Mail |

---

## 3. WICHTIGE KEYS & IDs

| Was | Wert | Wo verwendet |
|-----|------|-------------|
| Web3Forms Access Key | `8fa3512b-cb13-4662-89c3-44cef27e7692` | In allen 5 Formularen (JS-Code am Ende jeder Seite) |
| GA4 Mess-ID | `G-681FWP0R3W` | In js/main.js (Funktion loadAnalytics) |
| GitHub Repo | `AlwaysAutomaten/always-automaten.de` | GitHub Pages |

---

## 4. DATEISTRUKTUR

```
always-automaten/
├── CNAME                    ← Domain-Zuordnung (NICHT LÖSCHEN!)
├── index.html               ← Startseite
├── standorte.html           ← Standorte mit Google Maps Karte
├── faq.html                 ← Häufige Fragen
├── feedback.html            ← Feedback-Formular mit Sternebewertung
├── kontakt.html             ← Kontaktformular
├── aktuelles.html           ← Blog / Neuigkeiten
├── standort-anfrage.html    ← Standort-Anfrage Formular (für Vermieter)
├── vapes-anfragen.html      ← Großhandel-Anfrage Formular
├── impressum.html           ← Impressum (rechtlich)
├── datenschutz.html         ← Datenschutzerklärung (rechtlich)
├── danke.html               ← Danke-Seite nach Formular-Absendung
├── robots.txt               ← Anweisungen für Google-Crawler
├── sitemap.xml              ← Liste aller Seiten für Google
├── css/
│   └── style.css            ← Gesamtes Design (Farben, Layout, alles)
├── js/
│   └── main.js              ← Alle Funktionen (Menü, Cookies, GA4, Loader, Sterne)
├── fonts/
│   └── inter-latin.woff2    ← Schriftart (lokal gehostet für DSGVO)
└── images/
    ├── logo.png             ← Logo
    └── aufkleber-always-automaten.pdf  ← Aufkleber-Design
```

---

## 5. DNS-EINSTELLUNGEN BEI NETCUP

So müssen die DNS-Einstellungen bei Netcup aussehen (CCP → Domain → DNS):

| Host | Typ | Wert | Zweck |
|------|-----|------|-------|
| @ | A | 185.199.108.153 | GitHub Pages Server 1 |
| @ | A | 185.199.109.153 | GitHub Pages Server 2 |
| @ | A | 185.199.110.153 | GitHub Pages Server 3 (falls möglich) |
| @ | A | 185.199.111.153 | GitHub Pages Server 4 (falls möglich) |
| www | CNAME | alwaysautomaten.github.io | www-Weiterleitung |
| @ | MX | SMTP.GOOGLE.COM. (Priorität 1) | Google E-Mail |
| @ | TXT | google-site-verification=... | Google Verifizierung |
| google._domainkey | TXT | v=DKIM1;k=rsa;p=... | E-Mail DKIM-Signatur |
| z7gnpfysi5yk | CNAME | gv-w6czt2bu6a7d62.dv.goog | Google Domain-Verifizierung |

**WICHTIG:** Die MX, TXT und DKIM-Einträge sind für deine Google E-Mail. NIEMALS löschen!

---

## 6. GITHUB PAGES EINSTELLUNGEN

Im GitHub Repo (github.com/AlwaysAutomaten/always-automaten.de):
- Settings → Pages
- Source: **Deploy from a branch**
- Branch: **main** / Ordner: **/ (root)**
- Custom domain: **always-automaten.de**
- Enforce HTTPS: **Aktiviert (Haken setzen)**

---

## 7. WIE DIE FORMULARE FUNKTIONIEREN

Alle 5 Formulare nutzen **Web3Forms** (kostenlos, bis 250 Submissions/Monat).

**So funktioniert es:**
1. Besucher füllt Formular aus und klickt "Senden"
2. JavaScript am Ende der Seite sendet die Daten an Web3Forms API
3. Web3Forms leitet die Daten als E-Mail an info@always-automaten.de weiter
4. Besucher wird auf danke.html weitergeleitet

**Die 5 Formulare:**

| Seite | Formular-ID im Code | Betreff der E-Mail |
|-------|---------------------|-------------------|
| index.html | newsletter-form | Neue Newsletter-Anmeldung |
| kontakt.html | kontakt-form | Neue Kontaktanfrage |
| feedback.html | feedback-form | Neues Feedback |
| standort-anfrage.html | standort-anfrage-form | Neue Standort-Anfrage |
| vapes-anfragen.html | vapes-anfrage-form | Neue Großhandel-Anfrage |

**Spam-Schutz:** Jedes Formular hat ein unsichtbares Honeypot-Feld (`botcheck`).
Bots füllen es aus, Web3Forms blockiert diese automatisch.

---

## 8. WIE GOOGLE ANALYTICS FUNKTIONIERT

- GA4 ist in `js/main.js` eingebaut (Funktion `loadAnalytics`)
- Tracking startet NUR wenn der Besucher im Cookie-Banner "Alle akzeptieren" klickt
  oder "Analyse & Statistik" aktiviert (DSGVO-konform)
- Ohne Cookie-Consent wird KEIN Tracking geladen
- Daten siehst du auf analytics.google.com

---

## 9. WEBSITE ÄNDERN (OHNE CLAUDE)

### Schritt 1: Datei bearbeiten
- Öffne die gewünschte HTML-Datei im Ordner `Desktop/always-automaten/`
- Benutze einen Texteditor: VS Code (empfohlen), oder TextEdit (Format → Reiner Text)
- Änderungen speichern

### Schritt 2: Änderungen hochladen
Terminal öffnen (Programme → Dienstprogramme → Terminal) und eingeben:

```bash
cd ~/Desktop/always-automaten
git add .
git commit -m "Kurze Beschreibung was du geändert hast"
git push
```

### Schritt 3: Warten
Nach 1-2 Minuten ist die Änderung auf https://always-automaten.de live.

### Häufige Änderungen:

**Text auf einer Seite ändern:**
→ Öffne die .html Datei, suche den Text, ändere ihn, speichern, git push

**Neuen Blog-Beitrag auf Aktuelles:**
→ Öffne aktuelles.html, kopiere einen bestehenden `<div class="blog-card">` Block,
  ändere Titel und Text, speichern, git push

**Produktpreis ändern:**
→ Öffne index.html, suche den Preis im Text, ändere ihn, speichern, git push

---

## 10. KOMPLETT NEU AUFSETZEN (NOTFALL)

Falls alles verloren geht und du die Seite komplett neu aufsetzen musst:

### Schritt 1: Git installieren (falls nicht vorhanden)
```bash
xcode-select --install
```

### Schritt 2: GitHub CLI installieren
```bash
brew install gh
```

### Schritt 3: Bei GitHub einloggen
```bash
gh auth login
```
→ GitHub.com → HTTPS → Login with web browser → Mit AlwaysAutomaten einloggen

### Schritt 4: Repo klonen (Dateien herunterladen)
```bash
cd ~/Desktop
gh repo clone AlwaysAutomaten/always-automaten.de always-automaten
```
→ Jetzt hast du wieder den kompletten Ordner auf deinem Desktop

### Schritt 5: Prüfen ob alles läuft
```bash
cd ~/Desktop/always-automaten
git status
```
→ Sollte "On branch main, nothing to commit" zeigen

### Falls auch das GitHub Repo gelöscht wurde:

1. Neues Repo erstellen:
```bash
cd ~/Desktop/always-automaten
gh repo create AlwaysAutomaten/always-automaten.de --public --source . --push
```

2. GitHub Pages aktivieren:
   - github.com → Repo → Settings → Pages
   - Source: Deploy from branch → main → / (root)
   - Custom domain: always-automaten.de
   - Enforce HTTPS aktivieren

3. DNS bei Netcup prüfen (siehe Abschnitt 5)

4. Warten bis HTTPS-Zertifikat erstellt wird (bis 30 Min)
   - Falls es nicht klappt: Custom domain entfernen, speichern, neu eintragen, speichern

---

## 11. COOKIE-BANNER & ALTERSVERIFIKATION

**Cookie-Banner:**
- Erscheint beim ersten Besuch
- 3 Kategorien: Notwendig (immer an), Analyse (GA4), Marketing
- Einstellung wird in localStorage gespeichert
- Code: js/main.js (Abschnitt COOKIE BANNER)
- Design: css/style.css (Klasse .cookie-banner)

**Altersverifikation (18+):**
- Erscheint beim ersten Besuch nach dem Loader
- Wird in localStorage gespeichert (24 Stunden gültig)
- Code: js/main.js (Abschnitt AGE VERIFICATION)
- Wer "Unter 18" klickt, sieht eine Ablehnungsnachricht

---

## 12. DESIGN-SYSTEM

Alle Farben und Styles sind in `css/style.css` definiert:

**Farben (CSS Variablen, ganz oben in der Datei):**
- `--primary`: Hauptfarbe (Teal/Cyan)
- `--bg-dark`: Dunkler Hintergrund
- `--bg-card`: Karten-Hintergrund
- `--text-primary`: Haupttext (Weiß)
- `--text-secondary`: Sekundärtext (Grau)

**Schriftart:** Inter (lokal in fonts/inter-latin.woff2)

**Buttons:**
- `.btn-primary` → Orange Hauptbutton
- `.btn-secondary` → Transparenter Sekundärbutton

---

## 13. CHECKLISTE NACH ÄNDERUNGEN

Wenn du etwas an der Seite änderst, prüfe:

- [ ] Sieht die Seite auf dem Handy gut aus? (Browser → Rechtsklick → Untersuchen → Handy-Icon)
- [ ] Funktionieren alle Links?
- [ ] Funktionieren die Formulare? (Testmail senden)
- [ ] Lädt die Seite ohne Fehler? (Browser → Rechtsklick → Untersuchen → Konsole)
- [ ] Wurde die Änderung gepusht? (`git status` sollte "clean" zeigen)
