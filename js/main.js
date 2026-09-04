/* ============================================================
   NO RULES SOUND — RENDER
   Legge NRS_DATA (da data.js) e popola la pagina.
   Non serve modificare questo file per aggiornare i contenuti:
   per quello c'è js/data.js
   ============================================================ */
(function(){
  const D = window.NRS_DATA;
  if(!D){ console.error("NRS_DATA non trovato: controlla che data.js sia caricato prima di main.js"); return; }

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(html !== undefined) e.innerHTML = html;
    return e;
  };
  const escapeHtml = (s) => (s || "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));

  const COPY = {
    it: {
      menuOpen: "Apri menu", languageLabel: "Lingua",
      navReleases: "Uscite", navContacts: "Contatti",
      heroRoster: "Scopri il roster", heroReleases: "Ultime uscite",
      artistsTitle: "Gli artisti", catalogLabel: "Catalogo", releasesTitle: "Ultime uscite",
      listenLabel: "Ascolta", playlistText: "Tutte le tracce NRS in un unico posto. Seguila per non perdere nessuna uscita.",
      comingLabel: "In arrivo", presaveText: "Qui trovi le prossime uscite. Salvale ora e ascoltale appena escono.", stayConnected: "Resta connesso",
      newsletterText: "Nuove uscite, date live e drop in anteprima, dritti in inbox. Niente spam, promesso — no rules, ma questa la rispettiamo.",
      footerTag: "No Rules Sound — Italian Hard Bounce, Hard Techno & Industrial collective.",
      followLabel: "Seguici", rights: "Tutti i diritti riservati.",
      rosterNumber: "ROSTER Nº", booking: "Booking", bookable: "Bookable", bookingArtists: "Artists", productionTeam: "Team Production", bookingSupport: "Per disponibilità e booking, scrivici direttamente.", bookingAll: "Richiedi booking", presaveNow: "Pre-save ora",
      noPresave: "Nessuna uscita in pre-save al momento. Torna presto — o seguici sui social per essere avvisato.",
      subscribe: "Iscriviti alla newsletter",
      noSoundcloud: "Account SoundCloud non collegato: aggiungi il link in js/data.js → socials.soundcloud.",
      noSpotify: "Playlist non ancora collegata: aggiungi il link in js/data.js → socials.spotify (o spotifyPlaylistEmbedUrl per una playlist specifica)."
    },
    en: {
      menuOpen: "Open menu", languageLabel: "Language",
      navReleases: "Releases", navContacts: "Contact",
      heroRoster: "Discover the roster", heroReleases: "Latest releases",
      artistsTitle: "The artists", catalogLabel: "Catalogue", releasesTitle: "Latest releases",
      listenLabel: "Listen", playlistText: "All NRS tracks in one place. Follow the playlist and never miss a release.",
      comingLabel: "Coming soon", presaveText: "Find the next releases here. Save them now and listen as soon as they drop.", stayConnected: "Stay connected",
      newsletterText: "New releases, live dates and early drops, straight to your inbox. No spam, promise — no rules, but we respect this one.",
      footerTag: "No Rules Sound — Italian Hard Bounce, Hard Techno & Industrial collective.",
      followLabel: "Follow us", rights: "All rights reserved.",
      rosterNumber: "ROSTER NO.", booking: "Booking", bookable: "Bookable", bookingArtists: "Artists", productionTeam: "Production Team", bookingSupport: "For availability and booking, contact us directly.", bookingAll: "Request booking", presaveNow: "Pre-save now",
      noPresave: "There are no releases available for pre-save right now. Check back soon — or follow us on social media for updates.",
      subscribe: "Join the newsletter",
      noSoundcloud: "SoundCloud is not connected yet: add the link in js/data.js → socials.soundcloud.",
      noSpotify: "The playlist is not connected yet: add the link in js/data.js → socials.spotify (or use spotifyPlaylistEmbedUrl for a specific playlist)."
    }
  };
  const requestedLang = new URLSearchParams(location.search).get("lang");
  let currentLang = requestedLang === "en" ? "en" : "it";
  const t = key => COPY[currentLang][key] || COPY.it[key] || key;

  /* ---------- HERO / ABOUT ---------- */
  if ($("#heroEyebrow")) $("#heroEyebrow").textContent = D.label.tagline || "";
  if ($("#heroTitle")) $("#heroTitle").textContent = D.label.name || "NO RULES SOUND";
  if ($("#heroSub")) $("#heroSub").textContent = D.label.subtagline || "";
  if ($("#aboutText")) $("#aboutText").textContent = D.label.about || "";
  document.title = (D.label.name || "NO RULES SOUND") + " — Hard Bounce / Hard Techno / Industrial Collective";

  /* ---------- SOCIAL PILLS (about + footer) ---------- */
  function buildSocialRow(container){
    if(!container) return;
    const map = [
      ["soundcloud", "SoundCloud"],
      ["instagram", "Instagram"],
      ["spotify", "Spotify"],
      ["beatport", "Beatport"],
      ["tiktok", "TikTok"],
      ["youtube", "YouTube"],
      ["bandcamp", "Bandcamp"]
    ];
    map.forEach(([key, label]) => {
      const url = D.socials && D.socials[key];
      if(url){
        const a = el("a", "social-pill", label);
        a.href = url; a.target = "_blank"; a.rel = "noopener";
        container.appendChild(a);
      }
    });
  }
  buildSocialRow($("#socialRow"));
  buildSocialRow($("#footerSocialRow"));

  /* ---------- ROSTER ---------- */
  const artistsGrid = $("#artistsGrid");
  const productionGrid = $("#productionGrid");
  const photoRefreshTargets = []; // { img, soundcloudUrl } — usato più sotto per l'auto-refresh foto da SoundCloud
  if((artistsGrid || productionGrid) && Array.isArray(D.roster)){
    D.roster.forEach(artist => {
      const card = el("article", "artist-card");

      const top = el("div", "");
      top.style.display = "flex";
      top.style.justifyContent = "space-between";
      top.style.alignItems = "flex-start";

      const monogram = el("div", "artist-card__mono", escapeHtml((artist.name || "?").trim().charAt(0)));
      if(artist.image){
        const img = document.createElement("img");
        img.src = artist.image;
        img.alt = artist.name || "";
        img.loading = "lazy";
        img.className = "artist-card__photo";
        // Se l'immagine non si carica (link cambiato/rimosso), torna al monogramma: mai un'icona rotta.
        img.onerror = function(){ this.replaceWith(monogram); };
        top.appendChild(img);
        if(artist.soundcloud) photoRefreshTargets.push({ img, soundcloudUrl: artist.soundcloud });
      } else {
        top.appendChild(monogram);
      }
      const idTag = el("span", "artist-card__id mono");
      idTag.dataset.catalogNo = artist.catalogNo || "—";
      top.appendChild(idTag);

      card.appendChild(top);
      if(artist.bookable){
        const status = el("span", "artist-card__status mono");
        status.dataset.copyKey = "bookable";
        card.appendChild(status);
      }
      card.appendChild(el("h3", "artist-card__name", escapeHtml(artist.name)));
      card.appendChild(el("p", "artist-card__genre mono", escapeHtml(artist.genre)));
      const bio = el("p", "artist-card__bio", escapeHtml(artist.bio));
      bio.dataset.it = artist.bio || "";
      bio.dataset.en = artist.bioEn || artist.bio || "";
      card.appendChild(bio);

      const links = el("div", "artist-card__links");
      if(artist.soundcloud){
        const a = el("a", "", "SoundCloud"); a.href = artist.soundcloud; a.target="_blank"; a.rel="noopener";
        links.appendChild(a);
      }
      if(artist.instagram){
        const a = el("a", "", "Instagram"); a.href = artist.instagram; a.target="_blank"; a.rel="noopener";
        links.appendChild(a);
      }
      if(artist.beatport){
        const a = el("a", "", "Beatport"); a.href = artist.beatport; a.target="_blank"; a.rel="noopener";
        links.appendChild(a);
      }
      if(links.children.length) card.appendChild(links);

      if(artist.bookable && D.contact && D.contact.bookingEmail){
        const booking = el("a", "artist-card__booking", "BOOK NOW");
        booking.href = "mailto:" + D.contact.bookingEmail + "?subject=" + encodeURIComponent("Booking request — " + (artist.name || "NRS artist"));
        card.appendChild(booking);
      }

      const targetGrid = artist.bookable ? artistsGrid : productionGrid;
      if(targetGrid) targetGrid.appendChild(card);
    });
  }

  const rosterBookingCta = $("#rosterBookingCta");
  if(rosterBookingCta && D.contact && D.contact.bookingEmail){
    rosterBookingCta.href = "mailto:" + D.contact.bookingEmail + "?subject=" + encodeURIComponent("Booking request — No Rules Sound");
  }

  /* ---------- AUTO-REFRESH FOTO DA SOUNDCLOUD ----------
     Ad ogni visita, il sito prova a chiedere a SoundCloud (via il suo endpoint
     ufficiale e gratuito "oEmbed", nessuna chiave richiesta) la foto profilo
     più recente di ogni artista, e la sostituisce a quella salvata in data.js.
     Se per qualsiasi motivo la richiesta fallisce (rete assente, endpoint
     irraggiungibile, ecc.) non succede nulla di visibile: resta semplicemente
     la foto già presente in data.js. Le bio restano invece manuali: l'endpoint
     di SoundCloud non fornisce quel testo. */
  function upgradeSoundcloudImage(url){
    // Le miniature restituite da oEmbed sono spesso a bassa risoluzione (…-large.jpg,
    // cioè 100x100): se possibile chiediamo la versione più grande allo stesso host.
    return url ? url.replace(/-large\.jpg/i, "-t500x500.jpg") : url;
  }
  photoRefreshTargets.forEach(({ img, soundcloudUrl }) => {
    const endpoint = "https://soundcloud.com/oembed?format=json&url=" + encodeURIComponent(soundcloudUrl);
    fetch(endpoint)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(data && data.thumbnail_url && img.isConnected){
          img.src = upgradeSoundcloudImage(data.thumbnail_url);
        }
      })
      .catch(() => { /* silenzioso: resta la foto già in data.js */ });
  });

  /* ---------- RELEASES (player live, sempre aggiornato da SoundCloud) ----------
     Non legge più js/data.js: mostra sempre i brani reali più recenti
     caricati sull'account SoundCloud della label (socials.soundcloud),
     tramite il player "stream" ufficiale di SoundCloud. Zero manutenzione:
     appena caricate un brano nuovo su SoundCloud, compare qui da solo. */
  const releasesWrap = $("#releasesList");
  if(releasesWrap){
    const labelSoundcloud = D.socials && D.socials.soundcloud;
    if(labelSoundcloud){
      const tracksUrl = labelSoundcloud.replace(/\/+$/, "") + "/tracks";
      const iframe = document.createElement("iframe");
      iframe.loading = "lazy";
      iframe.width = "100%";
      iframe.height = "450";
      iframe.style.border = "0";
      iframe.allow = "autoplay";
      iframe.src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(tracksUrl) +
        "&color=%23ff6a13&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false";
      releasesWrap.appendChild(iframe);
    } else {
      const message = el("p", "split__text");
      message.dataset.copyKey = "noSoundcloud";
      releasesWrap.appendChild(message);
    }
  }

  /* ---------- SPOTIFY EMBED (playlist, o pagina artista NRS come fallback) ---------- */
  // Trasforma un normale link open.spotify.com/... nell'equivalente embed.
  function toSpotifyEmbedSrc(url){
    if(!url) return null;
    try{
      const u = new URL(url);
      if(!u.hostname.includes("spotify.com")) return null;
      if(u.pathname.includes("/embed/")) return url; // già un embed
      return "https://open.spotify.com/embed" + u.pathname + u.search;
    } catch(e){ return null; }
  }

  const spotifyWrap = $("#spotifyEmbedWrap");
  if(spotifyWrap){
    const embedSrc = D.spotifyPlaylistEmbedUrl || toSpotifyEmbedSrc(D.socials && D.socials.spotify);
    if(embedSrc){
      const iframe = document.createElement("iframe");
      iframe.src = embedSrc;
      iframe.width = "100%";
      iframe.height = "380";
      iframe.style.border = "0";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      spotifyWrap.appendChild(iframe);
    } else {
      const message = el("p", "split__text");
      message.dataset.copyKey = "noSpotify";
      spotifyWrap.appendChild(message);
    }
  }

  /* ---------- PRE-SAVE (visibile da solo finché la data di uscita non è passata) ---------- */
  const presaveBox = $("#presaveBox");
  if(presaveBox){
    const p = D.presave || {};
    const releaseDate = p.releaseDate ? new Date(p.releaseDate + "T23:59:59") : null;
    const isUpcoming = p.url && (!releaseDate || (!isNaN(releaseDate) && releaseDate.getTime() >= Date.now()));
    if(isUpcoming){
      const meta = el("div", "presave-box__meta");
      if(p.cover){
        const cover = document.createElement("img");
        cover.className = "presave-box__cover";
        cover.src = p.cover;
        cover.alt = p.trackTitle || "";
        cover.loading = "lazy";
        meta.appendChild(cover);
      }
      meta.appendChild(el("p", "presave-box__track mono", escapeHtml(p.trackTitle || "")));
      presaveBox.appendChild(meta);
      const a = el("a", "btn btn--primary btn--full");
      a.dataset.copyKey = "presaveNow";
      a.href = p.url; a.target = "_blank"; a.rel = "noopener";
      presaveBox.appendChild(a);
    } else {
      const message = el("p", "presave-box__empty");
      message.dataset.copyKey = "noPresave";
      presaveBox.appendChild(message);
    }
  }

  /* ---------- NEWSLETTER (beehiiv) ---------- */
  const nlWrap = $("#newsletterFormWrap");
  if(nlWrap){
    const nl = D.newsletter || {};
    if(nl.beehiivPublicationId){
      const iframe = document.createElement("iframe");
      iframe.src = "https://embeds.beehiiv.com/" + encodeURIComponent(nl.beehiivPublicationId) + "?slim=true";
      iframe.setAttribute("data-test-id", "beehiiv-embed");
      iframe.height = "52";
      iframe.frameBorder = "0";
      iframe.scrolling = "no";
      iframe.style.margin = "0";
      iframe.style.borderRadius = "0px";
      iframe.style.backgroundColor = "transparent";
      iframe.style.width = "100%";
      iframe.style.maxWidth = "440px";
      iframe.style.marginTop = "1.6rem";
      nlWrap.appendChild(iframe);
    } else if(nl.fallbackUrl){
      const a = el("a", "btn btn--primary");
      a.dataset.copyKey = "subscribe";
      a.href = nl.fallbackUrl; a.target = "_blank"; a.rel = "noopener";
      a.style.marginTop = "1.6rem";
      a.style.display = "inline-block";
      nlWrap.appendChild(a);
    } else {
      const p = el("p", "nl-fallback");
      const email = (D.contact && D.contact.email) || "";
      p.innerHTML = email
        ? `Newsletter non ancora collegata: scrivici intanto a <a href="mailto:${escapeHtml(email)}?subject=Newsletter">${escapeHtml(email)}</a> per essere aggiunto manualmente.`
        : "Newsletter non ancora configurata (js/data.js → newsletter).";
      nlWrap.appendChild(p);
    }
  }

  /* ---------- CONTATTI / FOOTER ---------- */
  if($("#footerEmail")) $("#footerEmail").textContent = (D.contact && D.contact.email) || "—";
  if($("#footerBooking")) $("#footerBooking").textContent = (D.contact && D.contact.bookingEmail) || "—";
  if($("#year")) $("#year").textContent = new Date().getFullYear();

  /* ---------- LINGUA IT / EN ---------- */
  function applyLanguage(lang, updateUrl){
    currentLang = lang === "en" ? "en" : "it";
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(node => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    document.querySelectorAll("[data-copy-key]").forEach(node => {
      node.textContent = t(node.dataset.copyKey);
    });
    document.querySelectorAll("[data-lang]").forEach(button => {
      button.setAttribute("aria-pressed", button.dataset.lang === currentLang ? "true" : "false");
    });
    document.querySelectorAll(".artist-card__id[data-catalog-no]").forEach(node => {
      node.textContent = t("rosterNumber") + node.dataset.catalogNo;
    });
    document.querySelectorAll(".artist-card__bio").forEach(node => {
      node.textContent = node.dataset[currentLang] || node.dataset.it || "";
    });

    if($("#heroEyebrow")) $("#heroEyebrow").textContent = currentLang === "en" ? (D.label.taglineEn || D.label.tagline) : D.label.tagline;
    if($("#heroSub")) $("#heroSub").textContent = currentLang === "en" ? (D.label.subtaglineEn || D.label.subtagline) : D.label.subtagline;
    if($("#aboutText")) $("#aboutText").textContent = currentLang === "en" ? (D.label.aboutEn || D.label.about) : D.label.about;

    const description = currentLang === "en"
      ? "No Rules Sound — Italian Hard Bounce, Hard Techno and Industrial collective and label. Artists, releases, playlist and contacts."
      : "No Rules Sound — collettivo ed etichetta Hard Bounce, Hard Techno e Industrial. Artisti, uscite, playlist e contatti.";
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if(metaDescription) metaDescription.content = description;
    if(ogDescription) ogDescription.content = description;

    if(updateUrl){
      const url = new URL(location.href);
      if(currentLang === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      history.replaceState({}, "", url);
    }
  }

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
  });
  applyLanguage(currentLang, false);

  /* ---------- NAV MOBILE TOGGLE ---------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if(navToggle && navLinks){
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- NAV: SEZIONE ATTIVA ---------- */
  const navSectionLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  if("IntersectionObserver" in window && navSectionLinks.length){
    const sectionLinkMap = new Map(navSectionLinks.map(link => [link.getAttribute("href"), link]));
    const navObserver = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if(!current) return;
      navSectionLinks.forEach(link => link.classList.toggle("is-active", link === sectionLinkMap.get("#" + current.target.id)));
    }, { rootMargin: "-35% 0px -55%", threshold: [0.01, 0.25, 0.6] });
    document.querySelectorAll("#top, #roster, #uscite, #playlist, #newsletter, #contatti").forEach(section => navObserver.observe(section));
  }

  /* ---------- MICRO-ANIMAZIONI ---------- */
  if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.documentElement.classList.add("is-animated");
    requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section, .artist-card, .about").forEach(node => {
      node.classList.add("reveal");
      revealObserver.observe(node);
    });
  }

})();
