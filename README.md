# NO RULES SOUND — sito

Sito statico (HTML/CSS/JS puro, nessun framework, nessuna build). Pensato per stare
su **Cloudflare Pages** a costo zero.

## Struttura

```
index.html        → struttura della pagina (di solito non serve toccarla)
css/style.css      → stile grafico
js/data.js         → ⭐ TUTTI I CONTENUTI: roster, uscite, link, contatti, newsletter
js/main.js         → logica che legge data.js e disegna la pagina (non serve toccarlo)
```

**Per aggiornare il sito nel 99% dei casi ti basta modificare `js/data.js`.**
È commentato in italiano, ogni blocco spiega cosa mettere.

---

## Cose da fare SUBITO prima di andare online

Nel file `js/data.js`:

1. **Contatti** — `contact.email`: mettete la vostra casella su register.it.
   `contact.bookingEmail` è già impostata su `nrsbookingofficial@gmail.com` ed è
   l'unica usata su tutto il sito (pulsante "Booking" identico su ogni scheda artista).
2. **Social** — `socials`: aggiungete i link reali (SoundCloud label, Instagram, Beatport già
   inseriti dove trovati; Spotify/TikTok/YouTube da compilare voi).
3. **Roster** — bio scritte senza nomi e cognomi, solo nome d'arte, genere e city dove
   pubblicamente indicata dagli artisti stessi. Per metà del roster non ho trovato
   informazioni aggiuntive oltre al genere musicale, quindi restano bio brevi e
   generiche: fatele leggere/arricchire dagli artisti prima di pubblicare.
   **Foto**: ogni scheda mostra già l'immagine profilo presa dal loro SoundCloud
   (link pubblico, resta ospitata lì — zero peso e zero costi sul vostro sito). Se un
   domani preferite foto diverse, basta sostituire il valore `image` con un altro link,
   o con un file caricato in una cartella `img/` del progetto.
   **Foto sempre aggiornate**: non dovete fare nulla — ad ogni visita il sito chiede da
   solo a SoundCloud la foto più recente di ciascun artista (tramite il loro endpoint
   ufficiale e gratuito "oEmbed") e la mostra al posto di quella salvata qui. Il valore
   `image` sotto resta comunque utile come prima immagine mostrata mentre carica, e come
   riserva se la richiesta a SoundCloud dovesse fallire.
   **Le uscite** (sezione "Uscite") sono automatiche allo stesso modo: il player
   incorporato è sempre quello live di SoundCloud, mostra da solo titolo/artwork
   aggiornati, non c'è nulla da sincronizzare.
   **Le bio no**: SoundCloud non offre un modo pubblico e gratuito per leggere
   automaticamente il testo della bio di un profilo (l'unico modo sarebbe un'API
   privata non ufficiale, che può rompersi senza preavviso — non l'ho usata di
   proposito). Le bio restano testo semplice da aggiornare a mano qui sotto quando
   qualcosa cambia: sono 2 righe, non serve toccare altro.
   **Instagram**: confermato solo per Sandro Cardio. Per TMPST, FAE NRS, HVNTER,
   TSK Phønič, RandeX, Danny Candy e KØDA non ho trovato un profilo Instagram
   collegato al loro SoundCloud (nessuno dei loro profili lo elenca) — il campo
   `instagram` è vuoto in `js/data.js`, compilatelo voi con i link giusti quando li avete.
4. **Uscite** — ho inserito 3 release reali trovate su SoundCloud (NRS001, NRS010, NRS011).
   Aggiungete le vostre uscite più recenti in cima all'array `releases`.
5. **Newsletter** — vedi sotto, serve un servizio esterno gratuito.
6. **Pre-save / playlist Spotify** — vedi sotto.

---

## Newsletter (beehiiv — già attiva)

Avete già una pubblicazione beehiiv, quindi bastano due dati da recuperare dalla
dashboard beehiiv (Settings → Publication):

```js
newsletter: {
  beehiivPublicationId: "pub_XXXXXXXXXXXXXXXXXXXX", // Settings → Publication → Publication ID
  fallbackUrl: "https://ilnomedellavostrapub.beehiiv.com/subscribe"
}
```

Se compilate `beehiivPublicationId`, sul sito appare il form di iscrizione
incorporato direttamente (nessun redirect, l'iscrizione avviene sulla pagina).
Se preferite un semplice pulsante che porta alla pagina beehiiv, lasciate
`beehiivPublicationId` vuoto e compilate solo `fallbackUrl`.
Finché non compilate nessuno dei due, il sito mostra comunque un link "scrivici a
info@..." come fallback: non è mai rotto.

**Nota sul link che mi avete dato**: `fallbackUrl` è già compilato con il link di
iscrizione che mi avete mandato, e funziona. È però un link "di tracciamento" generato
da un invio email specifico (inizia con `link.mail.beehiiv.com/ss/c/...`), non l'indirizzo
permanente della vostra pubblicazione — di norma è comunque stabile, ma se in futuro
notate che smette di funzionare, sostituitelo con l'URL pulito della pagina di iscrizione
(quello che si vede nella barra degli indirizzi se aprite "Subscribe" dal vostro sito
beehiiv, di solito `https://ilnomedellapub.beehiiv.com/subscribe`) oppure impostate
`beehiivPublicationId` per l'embed diretto.

## Pre-save Spotify

Anche qui, senza backend serve un tool esterno che generi un link di pre-save. Il più
semplice e gratuito è **feature.fm** (piano free) o il pre-save del vostro distributore,
se ne userete uno in futuro (es. DistroKid, Amuse). Una volta ottenuto il link:

```js
presave: {
  active: true,
  trackTitle: "NRS0XX — Titolo",
  url: "https://IL_VOSTRO_LINK_DI_PRESAVE"
}
```

## Spotify (pagina artisti NRS o playlist)

Ci avete detto che il profilo Spotify di NRS mostra già gli artisti correlati: basta
quindi incollare quel link, normale (non serve già l'embed), qui:

```js
socials: {
  spotify: "https://open.spotify.com/artist/XXXXXXXX", // o /playlist/XXXXXXXX
  ...
}
```

Il sito lo trasforma da solo in un player incorporato nella sezione "Playlist".
Se in futuro preferite mostrare una playlist specifica invece della pagina artista,
compilate `spotifyPlaylistEmbedUrl` (stesso tipo di link, ha la priorità su `socials.spotify`):

```js
spotifyPlaylistEmbedUrl: "https://open.spotify.com/playlist/XXXX"
```

---

## Pubblicare su Cloudflare Pages (gratis)

1. Create un account su [Cloudflare](https://dash.cloudflare.com) (gratis).
2. **Workers & Pages → Create → Pages → Upload assets** (non serve Git se non volete):
   caricate l'intera cartella del sito (o trascinatela).
   In alternativa, se mettete questi file su GitHub, potete collegare il repo e
   Cloudflare pubblica automaticamente a ogni modifica — più comodo nel tempo.
3. Al primo deploy vi darà un indirizzo tipo `no-rules-sound.pages.dev`, già online e gratis.
4. **Dominio custom (norulessound.it da register.it)**: nel progetto Pages →
   Custom domains → aggiungete il dominio. Cloudflare vi mostrerà dei record DNS
   (di solito un CNAME) da impostare nel pannello DNS di register.it. Una volta
   propagati (di solito minuti/poche ore), il sito risponde sul vostro dominio, sempre gratis.
5. Le caselle email su register.it continuano a funzionare normalmente: cambiare dove
   punta il sito (verso Cloudflare) non tocca la posta, sono due cose separate — al
   massimo dovrete controllare che i record MX della posta restino quelli di register.it
   quando aggiungete i record del sito.

Da lì in poi, ogni volta che modificate `js/data.js` (o qualunque file) ricaricate la
cartella su Cloudflare Pages (o fate push su GitHub, se collegato) e il sito si aggiorna.

---

## Modificare senza saper programmare

- Per **testare in locale** prima di pubblicare: aprite semplicemente `index.html`
  con un doppio click, si apre nel browser.
- Per aggiungere un artista al roster: in `js/data.js`, copiate un blocco `{ ... }`
  dentro `roster: [ ... ]`, incollatelo prima della parentesi quadra `]` di chiusura,
  cambiate i valori.
- Per aggiungere un'uscita: stessa cosa dentro `releases: [ ... ]`.
- Non cancellate mai una virgola `,` tra due blocchi `{ }`, altrimenti il sito smette
  di caricare i contenuti (schermata vuota). Se succede, controllate con
  [jsonlint.com](https://jsonlint.com) — anche se il file è JS e non JSON puro, la
  struttura dei blocchi è la stessa e vi aiuta a trovare l'errore.
