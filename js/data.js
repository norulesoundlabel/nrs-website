/* ============================================================
   NO RULES SOUND — DATI DEL SITO
   ============================================================
   Questo è l'UNICO file che ti serve modificare per aggiornare
   contenuti, link, roster e uscite. Non serve toccare l'HTML.

   Regole veloci:
   - Ogni voce è tra virgolette "così"
   - Dopo ogni voce metti una virgola , (tranne l'ultima di un gruppo { })
   - Se un link non ce l'hai ancora, lascia "" (stringa vuota):
     il pulsante non verrà mostrato, niente si rompe.
   - Salva il file e ricarica la pagina per vedere le modifiche.
   ============================================================ */

window.NRS_DATA = {

  /* ---------- IDENTITÀ / HERO ---------- */
  label: {
    name: "NO RULES SOUND",
    shortName: "NRS",
    tagline: "Italian hard dance, hard techno & industrial collective.",
    subtagline: "Nessuna regola. Solo BPM alti e nessun compromesso.",
    location: "Italia",
    // Testo breve "chi siamo" mostrato nella sezione About
    about: "No Rules Sound nasce dall'energia dei parcheggi trasformati in dancefloor: dalle leggendarie \"after party\" underground, dove l'unico obiettivo era ballare, connettersi e costruire una comunità, il collettivo è cresciuto fino a diventare quello che è oggi. Sotto l'etichetta NRS Records pubblichiamo hard techno, industrial, schranz, bounce e neo rave, con un'unica regola: nessuna regola. Crediamo in uno spazio sicuro, inclusivo e senza filtri, dove chiunque possa esprimersi liberamente attraverso la musica."
  },

  /* ---------- CONTATTI ---------- */
  contact: {
    email: "info@norulessound.it", // metti qui la vostra casella su register.it
    bookingEmail: "nrsbookingofficial@gmail.com", // unica casella booking, usata anche in ogni scheda artista
  },

  /* ---------- SOCIAL / PIATTAFORME ---------- */
  socials: {
    soundcloud: "https://soundcloud.com/no-rules-sound-label",
    instagram: "https://www.instagram.com/norulesound/",
    // Link alla pagina artista o playlist Spotify di NRS (quella con gli artisti correlati).
    // Non sono riuscito a trovarla/verificarla via ricerca (ci sono troppi profili "No Rules"
    // omonimi su Spotify): incollate qui il link vero, es. https://open.spotify.com/artist/XXXXXXXX
    // — il player sotto "Playlist Spotify" lo usa in automatico anche senza compilare
    // spotifyPlaylistEmbedUrl più sotto.
    spotify: "https://open.spotify.com/artist/4ZYpceTd0FQmD7bLuEDhSO",
    beatport: "https://www.beatport.com/label/nrs-records/127009",
    tiktok: "",
    youtube: "",
    bandcamp: ""
  },

  /* ---------- NEWSLETTER (beehiiv) ----------
     Avete già una pubblicazione beehiiv, quindi bastano 2 righe:

     1) beehiivPublicationId: la trovate su beehiiv → Settings → Publication →
        "Publication ID" (una stringa tipo "pub_xxxxxxxxxxxxxxxxxxxx").
        Se la impostate, sul sito compare il form di iscrizione beehiiv incorporato
        direttamente nella pagina (nessun redirect).

     2) fallbackUrl: il link diretto alla pagina di iscrizione beehiiv
        (es. "https://ilnomedellavostrapub.beehiiv.com/subscribe").
        Usato come pulsante se preferite non incorporare il form, o come
        riserva finché non impostate il Publication ID. */
  newsletter: {
    beehiivPublicationId: "", // es: "pub_00000000-0000-0000-0000-000000000000"
    fallbackUrl: "https://newsletter-norulesound.beehiiv.com/?modal=signup"
  },

  /* ---------- PRE-SAVE / PLAYLIST SPOTIFY ----------
     Per il pre-save senza backend, il modo più semplice e gratuito è:
     - creare il pre-save con un tool gratuito (es. feature.fm free, o
       il pre-save integrato del vostro distributore, se ne avete uno)
     - incollare qui il link risultante: basta un normale link, si apre
       in una nuova scheda, nessun codice da mantenere sul sito.

     "releaseDate": mettete la data di uscita del brano (formato "AAAA-MM-GG").
     Il box "Pre-save" resta visibile automaticamente finché quella data non è
     passata — appena il brano esce, sparisce da solo, senza dover disattivare
     nulla a mano. Per il prossimo pre-save, sostituite semplicemente questi
     3 valori con quelli della prossima uscita. */
  presave: {
    trackTitle: "",            // es. "NRS015 — Titolo brano"
    url: "",                   // link al pre-save (feature.fm, distributore, ecc.)
    releaseDate: ""            // es. "2026-09-05" — lasciate vuoto per nascondere il box
  },

  // Embed di una playlist Spotify (aperta, pubblica). Per ottenerlo:
  // Spotify → apri la playlist → ... → Condividi → Incorpora playlist → copia il link "src" dell'iframe
  spotifyPlaylistEmbedUrl: "",

  /* ---------- ROSTER ARTISTI ----------
     Ogni artista è un blocco { ... }. Per aggiungerne uno nuovo,
     copia un blocco intero (dalla { alla } compresa), incollalo
     prima della chiusura ] e cambia i valori.
     "catalogNo" è solo il numero progressivo mostrato sulla card
     (01, 02, 03...), non un codice di uscita.
     "image": foto profilo presa dal loro SoundCloud (link pubblico,
     resta ospitata lì — zero peso extra sul vostro sito, zero costi).
     Se un giorno preferite foto vostre, basta sostituire il link con
     un percorso tipo "img/nomeartista.jpg" e caricare il file nella
     cartella img/ del progetto. */
  roster: [
    {
      catalogNo: "01",
      name: "TMPST",
      genre: "Hard Techno",
      bio: "TMPST è DJ e producer hard techno, co-fondatore di No Rules Sound: la sua firma è nel DNA stesso del collettivo.",
      image: "https://i1.sndcdn.com/avatars-xXTGCTICxzG0elBA-pxoncQ-t500x500.jpg",
      soundcloud: "https://soundcloud.com/tmpst_nrs",
      instagram: "https://www.instagram.com/tmpst.music_nrs/",
      beatport: "https://www.beatport.com/artist/tmpst-nrs/1286491"
    },
    {
      catalogNo: "02",
      name: "FAE NRS",
      genre: "Oriental Hard Techno",
      bio: "FAE NRS porta nel roster NRS il suo \"Sahara Sound\": hard techno che intreccia scale e atmosfere orientali con groove martellante, un'identità sonora unica nel collettivo.",
      image: "https://i1.sndcdn.com/avatars-hzpHsfekEximbfhF-IiYsRA-t500x500.jpg",
      soundcloud: "https://soundcloud.com/faenrs",
      instagram: "https://www.instagram.com/fae.music_nrs/",
      beatport: "https://www.beatport.com/artist/fae-nrs/1286473"
    },
    {
      catalogNo: "03",
      name: "HVNTER",
      genre: "Schranz",
      bio: "HVNTER, da Firenze, è lo \"Schranz Daddy\" del roster: groove serrato, ipnotico e senza sconti, pensato per colpire in pista dall'inizio alla fine del set.",
      image: "https://i1.sndcdn.com/avatars-VxWQAuNoy8jTtzzJ-reKOIg-t500x500.jpg",
      soundcloud: "https://soundcloud.com/hvnternrs",
      instagram: "https://www.instagram.com/hvnter.music_nrs/",
      beatport: "https://www.beatport.com/artist/hvnter/1074959"
    },
    {
      catalogNo: "04",
      name: "TSK Phønič",
      genre: "Hardtechno / Industrial / Raw",
      bio: "TSK Phønič è una delle voci più riconoscibili del roster NRS: hardtechno sporco, industrial e raw, prodotto per colpire in pista.",
      image: "https://i1.sndcdn.com/avatars-CzCHkcN17xmbutgl-4ycHMQ-t500x500.jpg",
      soundcloud: "https://soundcloud.com/tsk_phonic",
      instagram: "https://www.instagram.com/tsk_phonic/",
      beatport: "https://www.beatport.com/artist/tsk-phnic/1166367"
    },
    {
      catalogNo: "05",
      name: "RandeX",
      genre: "Hardtechno",
      bio: "RandeX, DJ e producer hardtechno di base a Firenze, è tra i membri fondatori di No Rules Sound.",
      image: "https://i1.sndcdn.com/avatars-dh1AhdgQDifAFVV5-fWlryA-t500x500.jpg",
      soundcloud: "https://soundcloud.com/randex_nrs",
      instagram: "https://www.instagram.com/randex.music_nrs/",
      beatport: "https://www.beatport.com/artist/randex-nrs/1282939"
    },
    {
      catalogNo: "06",
      name: "Danny Candy",
      genre: "Bounce Techno",
      bio: "Danny Candy è il re del leccalecca saltellante del roster: bounce techno giocoso e irresistibile, pensato per far rimbalzare la pista dal primo all'ultimo beat.",
      image: "https://i1.sndcdn.com/avatars-TcastgrW1b3GYVjh-Vfgiag-t500x500.jpg",
      soundcloud: "https://soundcloud.com/dannycandy",
      instagram: "https://www.instagram.com/dannycandy_nrs/",
      beatport: "https://www.beatport.com/artist/dannycandy/1462198"
    },
    {
      catalogNo: "07",
      name: "Sandro Cardio",
      genre: "Hard Techno",
      bio: "Sandro Cardio, producer e DJ italiano, ha aperto il catalogo NRS Records nel 2024 con \"Welcome to No Rules\" (NRS001). Da allora ha collaborato con nomi come Jovynn, Lorenzø, Gianma Bln, Daisy Guglielmi, Cris Way e Alysh, superando i 6 milioni di ascolti e ricevendo supporto da artisti come Nico Moreno, Steve Aoki, Dimitri Vegas & Like Mike, I Hate Models e Fatima Hajji.",
      image: "https://i1.sndcdn.com/avatars-ziymGvJyaKsmgxzX-4n5yHQ-t500x500.jpg",
      soundcloud: "https://soundcloud.com/sandrocardio",
      instagram: "https://www.instagram.com/sandro.cardio/",
      beatport: "https://www.beatport.com/artist/sandro-cardio/1179881"
    },
    {
      catalogNo: "08",
      name: "KØDA",
      genre: "Hard Bounce",
      bio: "KØDA, DJ e producer argentino, porta nel roster NRS il lato più \"bounce\" e dancefloor del collettivo — energia diretta e groove pensato per far saltare la pista.",
      image: "https://i1.sndcdn.com/avatars-TCzC1hAG1OI9pwez-sIGk4A-t500x500.jpg",
      soundcloud: "https://soundcloud.com/89koda",
      instagram: "https://www.instagram.com/89koda/",
      beatport: "https://www.beatport.com/artist/koda/98128"
    }
  ],

  /* ---------- ULTIME USCITE ----------
     Non c'è più nulla da mantenere qui: la sezione "Uscite" del sito mostra
     in automatico, sempre, i brani reali più recenti caricati sul vostro
     account SoundCloud (preso da socials.soundcloud qui sopra). Aggiungete
     un brano su SoundCloud → compare da solo sul sito, senza toccare
     questo file. */

};
