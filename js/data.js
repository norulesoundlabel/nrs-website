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
    tagline: "Italian hard bounce, hard techno & industrial collective.",
    taglineEn: "Italian hard bounce, hard techno & industrial collective.",
    subtagline: "NO RULES, JUST SOUND.\nDESTROY THE SILENCE",
    subtaglineEn: "NO RULES, JUST SOUND.\nDESTROY THE SILENCE",
    location: "Italia",
    // Testo breve "chi siamo" mostrato nella sezione About
    about: "No Rules Sound nasce dall'energia dei parcheggi trasformati in dancefloor: dai leggendari \"after party\" underground, dove l'unico obiettivo era ballare, connettersi e costruire una comunità, il collettivo è cresciuto fino a diventare quello che è oggi. Sotto l'etichetta NRS Records pubblichiamo hard techno, industrial, schranz, hard bounce e neo rave, con un'unica regola: nessuna regola. Crediamo in uno spazio sicuro, inclusivo e senza filtri, dove chiunque possa esprimersi liberamente attraverso la musica.",
    aboutEn: "No Rules Sound was born from the energy of car parks turned into dance floors: from legendary underground afterparties, where the only goals were to dance, connect and build a community, the collective grew into what it is today. Through NRS Records we release hard techno, industrial, schranz, hard bounce and neo rave, with one rule: no rules. We believe in a safe, inclusive and unfiltered space where anyone can express themselves freely through music."
  },

  /* ---------- CONTATTI ---------- */
  contact: {
    email: "info@norulesound.com",
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
    tiktok: "https://www.tiktok.com/@no.rules.sound",
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
    trackTitle: "HVNTER — Emotional Breakout",
    url: "https://hypeddit.com/hvnter/emotionalbreakout",
    releaseDate: ""            // opzionale: dopo questa data il box viene nascosto automaticamente
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
      bookable: true,
      genre: "Hard Techno",
      bio: "TMPST, classe 2002, è DJ, producer e co-founder di No Rules Sound. La sua hard techno è fatta di ritmi martellanti, atmosfere oscure ed energia brutale. Cresciuto nell'underground, ha sviluppato un sound personale e potente. I suoi set, ad alto impatto e adrenalina, lo stanno affermando come una delle nuove promesse della scena hard techno.",
      bioEn: "TMPST, born in 2002, is a DJ, producer and co-founder of No Rules Sound. His hard techno is made of hammering rhythms, dark atmospheres, and raw energy. Raised in the underground scene, he has developed a powerful and distinctive sound. His high-impact, adrenaline-filled sets are establishing him as one of the new rising talents in the hard techno scene.",
      image: "https://i1.sndcdn.com/avatars-xXTGCTICxzG0elBA-pxoncQ-t500x500.jpg",
      soundcloud: "https://soundcloud.com/tmpst_nrs",
      instagram: "https://www.instagram.com/tmpst.music_nrs/",
      beatport: "https://www.beatport.com/artist/tmpst-nrs/1286491"
    },
    {
      catalogNo: "02",
      name: "Fae نرس",
      bookable: true,
      genre: "Oriental Hard Techno",
      bio: "Fondatore e punto di riferimento di No Rules Sound, Fae porta con sé un suono molto caratteristico plasmato dalle sue origini. I suoi set fondono Hard Techno e suoni mediorientali, creando un'esperienza esotica unica che evoca stati di coinvolgimento culturale attraverso vari generi musicali. In passato ha condiviso il palco con artisti come Azyr, Jazzy, Jowi, Øtta, Rikhter e Rebekah. Lasciati trasportare in un viaggio sonoro senza precedenti.",
      bioEn: "Founder and point of reference of No Rules Sound, Fae brings a very characteristic sound shaped by its origins. His sets intertwine Hard Techno with Middle Eastern sounds creating a one-of-a-kind exotic experience that evokes states of cultural involvement across various musical genres. In the past, he has shared the stage with the likes of Azyr, Jazzy, Jowi, Øtta, Rikhter, Rebekah. Let yourself be transported on an unprecedented sound journey.",
      image: "https://i1.sndcdn.com/avatars-hzpHsfekEximbfhF-IiYsRA-t500x500.jpg",
      soundcloud: "https://soundcloud.com/faenrs",
      instagram: "https://www.instagram.com/fae.music_nrs/",
      beatport: "https://www.beatport.com/artist/fae-nrs/1286473"
    },
    {
      catalogNo: "03",
      name: "HVNTER",
      bookable: true,
      genre: "Schranz",
      bio: "HVNTER è un DJ e produttore techno fiorentino nato nel 2001. Attivo fin dai 14 anni, ha fatto il suo debutto nei club underground a 20 anni. Nel 2023 è entrato a far parte del collettivo No Rules Sound, con il quale ha pubblicato i brani \"In My Way\" e \"Hijo de la Luna (schranz)\". Il suo sound è grezzo e fedele alle radici del genere.",
      bioEn: "HVNTER is a Florentine techno DJ and producer born in 2001. Active since 14, he made his debut in underground clubs at 20. In 2023 he joined the No Rules Sound collective, with which he released the songs \"In My Way\" and \"Hijo de la Luna (schranz)\". Its sound is raw, hypnotic and faithful to the roots of the genre.",
      image: "https://i1.sndcdn.com/avatars-VxWQAuNoy8jTtzzJ-reKOIg-t500x500.jpg",
      soundcloud: "https://soundcloud.com/hvnternrs",
      instagram: "https://www.instagram.com/hvnter.music_nrs/",
      beatport: "https://www.beatport.com/artist/hvnter/1074959"
    },
    {
      catalogNo: "04",
      name: "TSK Phonic",
      bookable: true,
      genre: "Hardtechno / Industrial / Raw",
      bio: "TSK Phonic è un DJ e produttore hard techno/industrial di Padova. La sua musica combina atmosfere oscure e ritmi aggressivi, creando un contrasto emotivo tra dolcezza e rabbia. Ogni suo set è un viaggio unico, un portale in cui luce e oscurità si fondono in pura energia sonora, lasciando l'ascoltatore profondamente cambiato.",
      bioEn: "TSK Phonic is a DJ and hard techno/industrial producer from Padua. His music combines dark atmospheres and aggressive rhythms, creating an emotional contrast between sweetness and anger. Each set is a unique journey, a portal where light and darkness merge into pure sound energy, leaving the listener profoundly changed.",
      image: "https://i1.sndcdn.com/avatars-CzCHkcN17xmbutgl-4ycHMQ-t500x500.jpg",
      soundcloud: "https://soundcloud.com/tsk_phonic",
      instagram: "https://www.instagram.com/tsk_phonic/",
      beatport: "https://www.beatport.com/artist/tsk-phnic/1166367"
    },
    {
      catalogNo: "05",
      name: "RandeX",
      bookable: true,
      genre: "Hardtechno",
      bio: "Tommaso Randelli, in arte RandeX, è un DJ e producer italiano del 2003. Attivo nella Hard Techno e Hard Bounce, ha iniziato la sua carriera da poco più di un anno, spinto da una passione coltivata fin da piccolo. Nei suoi set unisce aggressività e malinconia, alternando sonorità dure a momenti melodici influenzati da Hard Bounce ed elettronica. Mira a trasformare ogni esibizione in un viaggio intenso e personale.",
      bioEn: "RandeX, stage name of Tommaso Randelli (born in 2003), is an Italian DJ and producer active in the Hard Techno and Hard Bounce scene. He began his career just over a year ago, driven by a passion cultivated since childhood. His sets blend intensity and melancholy, alternating aggressive sounds with melodic moments influenced by Hard Bounce and electronic music. His goal is to turn every performance into an intense and personal journey.",
      image: "https://i1.sndcdn.com/avatars-dh1AhdgQDifAFVV5-fWlryA-t500x500.jpg",
      soundcloud: "https://soundcloud.com/randex_nrs",
      instagram: "https://www.instagram.com/randex.music_nrs/",
      beatport: "https://www.beatport.com/artist/randex-nrs/1282939"
    },
    {
      catalogNo: "06",
      name: "DannyCandy",
      bookable: true,
      genre: "Hard Bounce",
      bio: "DannyCandy è il progetto hard bounce di No Rules Sound: una miscela esplosiva di bassi, ritmo e identità nascoste. Nasce dal desiderio di voler espandere i propri confini musicali. Ogni set è una sorpresa continua, tra energia, caos controllato e vibrazioni cucite sul dancefloor. I due DJ non si mostrano e si alternano tra di loro per offrire ogni volta un'esperienza diversa.",
      bioEn: "DannyCandy is the hard bounce project of No Rules Sound: an explosive mix of bass, rhythm and hidden identities born from the desire to expand their musical boundaries. Every set is a constant surprise, between energy, controlled chaos, and vibrations made for the dancefloor. The two DJs remain anonymous and switch between each other to offer a different experience every time.",
      image: "https://i1.sndcdn.com/avatars-TcastgrW1b3GYVjh-Vfgiag-t500x500.jpg",
      soundcloud: "https://soundcloud.com/dannycandy",
      instagram: "https://www.instagram.com/dannycandy_nrs/",
      beatport: "https://www.beatport.com/artist/dannycandy/1462198"
    },
    {
      catalogNo: "07",
      name: "Sandro Cardio",
      bookable: false,
      genre: "Hard Techno",
      bio: "Sandro Cardio, producer e DJ italiano, ha aperto il catalogo NRS Records nel 2024 con \"Welcome to No Rules\" (NRS001). Da allora ha collaborato con nomi come Jovynn, Lorenzø, Gianma Bln, Daisy Guglielmi, Cris Way e Alysh, superando i 6 milioni di ascolti e ricevendo supporto da artisti come Nico Moreno, Steve Aoki, Dimitri Vegas & Like Mike, I Hate Models e Fatima Hajji.",
      bioEn: "Italian producer and DJ Sandro Cardio opened the NRS Records catalogue in 2024 with \"Welcome to No Rules\" (NRS001). Since then, he has collaborated with artists including Jovynn, Lorenzø, Gianma Bln, Daisy Guglielmi, Cris Way and Alysh, surpassing 6 million streams and earning support from Nico Moreno, Steve Aoki, Dimitri Vegas & Like Mike, I Hate Models and Fatima Hajji.",
      image: "https://i1.sndcdn.com/avatars-ziymGvJyaKsmgxzX-4n5yHQ-t500x500.jpg",
      soundcloud: "https://soundcloud.com/sandrocardio",
      instagram: "https://www.instagram.com/sandro.cardio/",
      beatport: "https://www.beatport.com/artist/sandro-cardio/1179881"
    },
    {
      catalogNo: "08",
      name: "KØDA",
      bookable: false,
      genre: "Hard Bounce",
      bio: "KØDA, DJ e producer argentino, porta nel roster NRS il lato più hard bounce e dancefloor del collettivo — energia diretta e groove pensato per far saltare la pista.",
      bioEn: "Argentinian DJ and producer KØDA brings the collective's most hard-bounce-driven, dance-floor-focused side to the NRS roster — direct energy and grooves made to move the crowd.",
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
