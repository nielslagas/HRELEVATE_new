# Prompt voor het bouwen van de website "HRElevate" (met Replicate integratie)

**Doel:** Bouw een website die de "HRElevate - Professionele HR-Oplossingen" website dupliceert en verbetert, gebaseerd op de analyse van de bestaande website, maar zonder directe toegang tot de originele bestanden. Maak gebruik van de `replicate` MCP server om afbeeldingen te genereren.

**Website Beschrijving:**

De website is voor "HRElevate - Professionele HR-Oplossingen" en biedt informatie en diensten aan op het gebied van HR. De website omvat de volgende secties en functionaliteiten:

*   **Homepage:** Een hero sectie met een logo, pakkende titel, beschrijving, call-to-action knoppen en statistieken. Mogelijk een afbeelding of illustratie in de hero.
*   **Navigatie:** Een duidelijke navigatiebalk in de header met links naar de belangrijkste pagina's (Home, Ebooks, Cursussen, Consultancy, Resources, Shop, About, Cart).
*   **USP Sectie:** Een sectie met Unique Selling Propositions (USP's) die de voordelen van HRElevate benadrukken, mogelijk met iconen.
*   **Vertrouwens Sectie:** Een sectie om vertrouwen op te bouwen, bijvoorbeeld met partnerlogo's.
*   **Product/Cursus Overzicht:** Secties met overzichten van e-books en cursussen, gepresenteerd in card-formaat.
*   **Footer:** Een footer met links naar belangrijke pagina's, contactinformatie, social media links en copyright informatie.
*   **E-book Viewer:** Een pagina voor het bekijken van e-books in markdown formaat, met een inhoudsopgave, leesvoortgang indicator, zoekfunctie en smooth scrolling.
*   **Shop, Cursussen, Consultancy, Resources, About, Cart pagina's:**  Pagina's met content gerelateerd aan de genoemde secties. De exacte content moet nog worden bepaald, maar kan bestaan uit tekst, afbeeldingen, formulieren en call-to-actions.
*   **Styling:** Een consistente visuele stijl gebaseerd op een design systeem met gedefinieerde kleuren, typografie, spacing, border radius en schaduwen. Responsief design voor verschillende schermformaten.

**Visuele Stijl Gids (gebaseerd op `css/style.css`):**

*   **Kleuren:**
    *   Primaire kleur: Marineblauw (`#2A3B4D`) en varianten (`--primary-light`, `--primary-dark`)
    *   Secundaire kleur: Donkergrijs (`#4A4A4A`) en varianten (`--secondary-light`, `--secondary-dark`)
    *   Accent kleur: Donkergroen (`#2E5E4E`) en varianten (`--accent-light`, `--accent-dark`)
    *   Achtergrond kleur: Lichtgrijs (`#F5F7FA`) en varianten (`--background-alt`, `--card-background`)
    *   Tekst kleur: Near Black (`#333333`) en varianten (`--text-light`, `--text-muted`)
*   **Typografie:**
    *   Koppen: 'Inter' font-family, font-weight 600-700
    *   Body tekst: 'Roboto' font-family, font-weight 400
    *   Gebruik van Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap`
*   **Spacing:** Gebruik van spacing variabelen (`--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-xxl`) voor consistente marges en paddings.
*   **Border Radius:** Gebruik van radius variabelen (`--radius-sm`, `--radius-md`, `--radius-lg`) voor afgeronde hoeken.
*   **Shadows:** Gebruik van shadow variabelen (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) voor subtiele schaduweffecten.
*   **Transitions:** Gebruik van transition variabelen (`--transition-fast`, `--transition-normal`) voor vloeiende animaties.
*   **Button Styling:** Gedefinieerde stijlen voor buttons (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-lg`).

**Website Structuur (Pagina's en Content):**

1.  **index.html (Homepage):**
    *   Header met logo en navigatie
    *   Hero sectie met titel, beschrijving, call-to-actions, statistieken en afbeelding (`images/hero-image.jpg`)
    *   USP sectie (3-4 USP's met iconen)
    *   Vertrouwens sectie (partnerlogo's)
    *   Uitgelichte e-book sectie
    *   Nieuwsbrief sectie
    *   Footer
2.  **ebooks.html (E-books Overzichtspagina):**
    *   Header met logo en navigatie
    *   Sectie titel "E-books" met beschrijving
    *   Grid van e-book cards (afbeeldingen: `images/ebooks/employee-participation-cover.jpg`, `images/ebooks/leadership-cover.jpg`, `images/ebooks/hr-compliance-cover.jpg`, titel, korte beschrijving, prijs, "Bekijk E-book" knop)
    *   Footer
3.  **ebook-viewer.html (E-book Viewer Pagina):**
    *   Header met logo en navigatie
    *   Titel van het e-book
    *   Inhoudsopgave (TOC) in een sidebar
    *   E-book content gebied (weergeven van markdown content geconverteerd naar HTML)
    *   Leesvoortgang indicator
    *   Zoekfunctie binnen e-book
4.  **courses.html (Cursussen Overzichtspagina):**
    *   Header met logo en navigatie
    *   Sectie titel "Cursussen" met beschrijving
    *   Grid van cursus cards (afbeelding, titel, korte beschrijving, prijs, "Bekijk Cursus" knop)
    *   Footer
5.  **consultancy.html (Consultancy Pagina):**
    *   Header met logo en navigatie
    *   Informatie over consultancy diensten
    *   Contactformulier
    *   Footer
6.  **resources.html (Resources Pagina):**
    *   Header met logo en navigatie
    *   Overzicht van HR resources (templates, checklists, etc.)
    *   Footer
7.  **shop.html (Shop Pagina):**
    *   Header met logo en navigatie
    *   Overzicht van producten (anders dan e-books en cursussen)
    *   Footer
8.  **about.html (Over Ons Pagina):**
    *   Header met logo en navigatie
    *   Informatie over HRElevate, missie, team, etc.
    *   Footer
9.  **cart.html (Winkelwagen Pagina):**
    *   Header met logo en navigatie
    *   Winkelwagen functionaliteit (kan later worden toegevoegd, voor nu placeholder content)
    *   Footer

**E-book Functionaliteit (gebaseerd op `js/ebooks.js`):**

*   **E-book laden:** JavaScript functionaliteit om e-book content te laden en weer te geven in `ebook-viewer.html`. Gebruik een fallback map (`ebookMap` in `js/ebooks.js`) met hardcoded content voor de e-books: 'medewerkerparticipatie', 'leiderschap-21e-eeuw', 'hr-compliance-handboek'.
*   **Markdown naar HTML conversie:** Functie `convertMarkdownToHTML()` om markdown content om te zetten naar HTML. (Basis implementatie is voldoende, later eventueel vervangen door een library zoals marked.js).
*   **Inhoudsopgave (TOC):** Functie `addTableOfContentsNavigation()` om een dynamische inhoudsopgave te genereren op basis van de headers in de e-book content. Actieve sectie highlighting in de TOC.
*   **Leesvoortgang indicator:** Functie `addReadingProgressIndicator()` om een progress bar toe te voegen die de leesvoortgang van de gebruiker weergeeft.
*   **Smooth scrolling:** Functie `addSmoothScrolling()` voor smooth scrolling naar anker links in de e-book content.
*   **Zoekfunctie:** Functie `addEbookSearch()` om een zoekfunctie toe te voegen waarmee gebruikers binnen de e-book content kunnen zoeken en zoekresultaten highlighten.

**Verbeteringen (te implementeren tijdens de bouw):**

*   **Modern Design:** Implementeer een modern en aantrekkelijk design, rekening houdend met de visuele stijl gids.
*   **Responsiviteit:** Zorg voor volledige responsiviteit op alle schermformaten (mobile-first benadering).
*   **Performance:** Optimaliseer afbeeldingen, minificeer CSS en JavaScript, implementeer lazy loading en caching.
*   **Toegankelijkheid:**  Implementeer semantische HTML, ARIA attributen, voldoende kleurcontrast en keyboard navigatie.
*   **Content:** Verbeter de tekstuele content, optimaliseer voor SEO, verduidelijk call-to-actions en structureer de content logisch.
*   **Integratie van Replicate Afbeeldingen:** Vervang placeholder afbeeldingen met gegenereerde afbeeldingen van de `replicate` server voor een professionelere en unieke uitstraling.

**Gewenste Output:**

Genereer de volgende bestanden en mappen:

*   `index.html`
*   `ebooks.html`
*   `ebook-viewer.html`
*   `courses.html`
*   `consultancy.html`
*   `resources.html`
*   `shop.html`
*   `about.html`
*   `cart.html`
*   `css/style.css` (met design systeem variabelen en algemene stijlen)
*   `css/ebooks.css` (specifieke stijlen voor e-book viewer)
*   `css/logo.css` (stijlen voor logo)
*   `js/ebooks.js` (e-book functionaliteit)
*   `images/` (map voor afbeeldingen)
    *   `images/hero-image.jpg` (of .webp) - Gegenereerde hero afbeelding voor de homepage (placeholder in eerste instantie)
    *   `images/ebooks/` (map voor e-book covers)
        *   `images/ebooks/employee-participation-cover.jpg` (of .webp) - Gegenereerde cover voor e-book "Medewerkerparticipatie" (placeholder in eerste instantie)
        *   `images/ebooks/leadership-cover.jpg` (of .webp) - Gegenereerde cover voor e-book "Leiderschap in de 21e eeuw" (placeholder in eerste instantie)
        *   `images/ebooks/hr-compliance-cover.jpg` (of .webp) - Gegenereerde cover voor e-book "HR Compliance Handboek" (placeholder in eerste instantie)
*   `ebooks/markdown/` (map voor markdown e-book bestanden - gebruik de hardcoded content in `js/ebooks.js` als basis)

**Workflow voor Afbeeldingen Genereren:**

1.  **Placeholder Afbeeldingen:** Start met placeholder afbeeldingen in de `images/` map om de layout en structuur van de website op te zetten.
2.  **Modellen Zoeken:** Gebruik `replicate.search_models` om geschikte modellen te vinden voor hero afbeeldingen en e-book covers. Analyseer de modelbeschrijvingen en voorbeelden om een keuze te maken.
3.  **Afbeeldingen Genereren:** Gebruik `replicate.create_prediction` met de gekozen modellen en passende prompts om de afbeeldingen te genereren. Experimenteer met verschillende prompts en model parameters om de gewenste resultaten te bereiken.
4.  **Afbeeldingen Integreren:** Vervang de placeholder afbeeldingen met de gegenereerde afbeeldingen in de HTML en CSS. Gebruik de URL's van de gegenereerde afbeeldingen (verkregen via `replicate.get_prediction` of webhook).
