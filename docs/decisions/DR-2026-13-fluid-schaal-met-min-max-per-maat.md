# DR-2026-13: Fluid schaal met een min- en max-token per maat, uitgerekend in de build

**ID:** DR-2026-13
**Datum:** Oktober 2026
**Status:** Accepted
**Auteurs:** Jeffrey Lauwers

---

## Context

De font-sizes waren al fluid, met een `clamp()` per maat in `project-types/default/typography.json`. De spacing was vast. We wilden de spacing laten meegroeien met de viewport, en dat moest aan een paar eisen voldoen:

- **Iconen, checkboxes en radio's moeten mee blijven schalen.** Die leiden hun grootte al af van font-size × line-height.
- **De schaal moet white-label zijn.** Een organisatie moet per maat kunnen afwijken: de ene wil grote koppen sterker laten groeien, de andere wil een maat juist vast houden. Eén centrale groeifactor is daarvoor te grof.
- **De keuze tussen fluid en vast moet per density kunnen.** Dashboards en datatabellen willen vaste maten. Sommige projecten willen alleen de tekst laten meegroeien en de ruimte niet.
- **De Figma-export moet de waarden kunnen uitrekenen.** Een Figma-variable is statisch. `figma.js` rekent een `clamp()` om naar een vaste waarde per viewport-mode.

Het uitgangspunt was een stuk CSS waarin de browser de schaal uitrekent. Per maat staat er een min- en een max-custom property. Een centrale `--viewport-scale` loopt van 0 tot 1 tussen twee viewportbreedtes, met de `tan(atan2(…))`-truc om een lengte naar een getal om te zetten. Elke maat is dan `min + (max − min) × scale`.

---

## Opties overwogen

### Optie 1: Eén centrale groeifactor

Eén token zoals `--dsn-fluid-factor` loopt van 1 naar 1.25. Elke maat is zijn vaste waarde maal die factor.

**Voordeel:** heel weinig code, één knop om aan te draaien.
**Nadeel:** alle maten groeien even hard. Een organisatie kan niet per maat afwijken, en dat was een harde eis.

### Optie 2: Min/max per maat, uitgerekend in de browser (`tan(atan2())`)

Dit is de aanpak van het uitgangspunt. De min- en max-tokens zijn custom properties, en de formule staat per maat in de CSS.

**Voordeel:**

- Alles blijft zichtbaar als custom property.
- Het viewport-bereik is op runtime te wijzigen.

**Nadeel:**

- De Figma-export kan `tan(atan2())` niet lezen. Hij kent `clamp()`, `calc()`, `min()` en `max()`, maar geen goniometrie op lengtes.
- Per maat staat er een lange formule in de CSS, voor vijf spacing-concepten en zeven font-sizes.
- Typed arithmetic met `tan(atan2())` werkt in de evergreen browsers, maar het is een truc die weinig mensen herkennen.

### Optie 3: Min/max per maat, uitgerekend in de build (gekozen)

Per maat staan er een min- en een max-token in het thema. Een project-type schrijft `fluid({min}, {max})`. Een Style Dictionary-transform (`dsn/fluid`) rekent dat tijdens de build om naar een gewone `clamp()`:

```json
"md": { "$value": "fluid({dsn.text.font-size.min.md}, {dsn.text.font-size.max.md})" }
```

```css
--dsn-text-font-size-md: clamp(1rem, 0.91667rem + 0.37037vw, 1.25rem);
```

Het viewport-bereik komt uit het thema: `dsn.viewport.min-inline-size` (360px) en `max-inline-size` (1440px).

**Voordeel:**

- In de browser is het resultaat hetzelfde als bij optie 2.
- De output is een gewone `clamp()`. De Figma-export kan hem per viewport uitrekenen, en zo konden spacing en afgeleide waarden automatisch een mobile- en desktop-mode krijgen.
- Per maat is af te wijken, en een maat met min = max levert gewoon de vaste waarde op.
- Een project-type kiest per maat: `fluid(…)` groeit mee, een losse referentie naar de min-waarde blijft vast.
- De min-grens staat in `rem`, dus tekst en ruimte groeien nog steeds mee als een gebruiker inzoomt.

**Nadeel:**

- Het viewport-bereik is niet op runtime te wijzigen. Daarvoor moet je de tokens opnieuw bouwen.
- De build moet de min- en max-waarde naar pixels kunnen omrekenen. Daardoor zijn alleen `px`, `rem` en vermenigvuldigen of delen binnen `calc()` toegestaan. Bij iets anders breekt de build met een duidelijke fout.
- `dsn.viewport.min-inline-size` en `max-inline-size` moeten vaste px-waarden zijn.

---

## Beslissing

**Elke font-size en elke spacing-maat krijgt in het thema een min-token (op 360px) en een max-token (op 1440px). Standaard is max = min × 1.25, en maten van 1px en 2px hebben min = max. Een project-type kiest met `fluid({min}, {max})` welke maten meegroeien, en de build maakt daar een `clamp()` van.**

Er zijn drie densities:

| Density               | Font-sizes | Spacing |
| --------------------- | ---------- | ------- |
| `default`             | fluid      | fluid   |
| `default-fixed-space` | fluid      | vast    |
| `information-dense`   | vast       | vast    |

**Het viewport-bereik.** 360px is de kleinste gangbare telefoonbreedte. 1440px is een gangbare laptop. 1440 / 360 = 4, dezelfde factor als de 400% zoom uit WCAG 1.4.10. De officiële Reflow-testbreedte is 320px. Daar staan alle maten op hun min-waarde, en dat is precies de bedoeling.

**Bewust vast:**

- het klikdoel (`dsn.pointer-target`, 3rem), omdat een smalle viewport vaak een touch-device is;
- de small button (2.5rem);
- randen en layoutbreedtes;
- de ruimte voor password managers.

Componenten met een vaste maat die bij de tekst hoort, leiden die nu af van `icon.size`: Spinner, File-media, DotBadge en het Card-placeholdericoon.

---

## Impact

| Dimension                            | Meting                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Nieuwe tokens per thema              | 2 viewport + 14 font-size (min/max) + 106 spacing (min/max)                               |
| Configuraties                        | 8 → 12 (3 project types)                                                                  |
| Build-stappen toegevoegd             | 1 transform (`dsn/fluid`)                                                                 |
| Breaking changes                     | Visueel: `default` krijgt fluid spacing; oud gedrag = `default-fixed-space`               |
| Figma: waarden met een viewport-mode | font-sizes, alle spacing, `form-control/font-size` en `padding-inline-*`, `icon/size/4xl` |
| Figma: waarden vastgeprikt op 1440px | 15 (hangen ook van het theme af)                                                          |

---

## Gevolgen

**Wat makkelijker wordt:**

- **Per maat afwijken.** Een organisatie past alleen het min- of max-token in haar thema aan. De delegatieketen naar component-tokens blijft intact.
- **Een nieuwe density.** Die is een map met verwijzingen: `fluid(…)` of een losse referentie per maat.
- **Figma.** De spacing heeft daar nu net als de typografie een mobile- en een desktop-mode.

**Wat moeilijker wordt:**

- **Runtime-wijzigingen.** Een ander viewport-bereik op runtime kan niet meer zonder de tokens opnieuw te bouwen.
- **Theme én viewport.** Waarden die van allebei afhangen, kunnen in Figma niet in één collection. Voorbeelden zijn de icon-sizes (via de line-height van het theme) en `form-control/padding-block-*` (Start en Wireframe verwijzen naar een andere spacing-maat). Die blijven op 1440px vastgeprikt en staan in het report (issue #328).
- **Hogere controls.** Formuliercontrols en buttons worden op een brede viewport hoger dan 48px, tot 52px. 48px blijft het minimum.
