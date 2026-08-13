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

  /* ---------- HERO / ABOUT ---------- */
  if ($("#heroEyebrow")) $("#heroEyebrow").textContent = D.label.tagline || "";
  if ($("#heroTitle")) $("#heroTitle").textContent = D.label.name || "NO RULES SOUND";
  if ($("#heroSub")) $("#heroSub").textContent = D.label.subtagline || "";
  if ($("#aboutText")) $("#aboutText").textContent = D.label.about || "";
  document.title = (D.label.name || "NO RULES SOUND") + " — Hard Dance / Hardcore Collective";

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
  const rosterGrid = $("#rosterGrid");
  const photoRefreshTargets = []; // { img, soundcloudUrl } — usato più sotto per l'auto-refresh foto da SoundCloud
  if(rosterGrid && Array.isArray(D.roster)){
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
      const idTag = el("span", "artist-card__id mono", "ROSTER Nº" + escapeHtml(artist.catalogNo || "—"));
      top.appendChild(idTag);

      card.appendChild(top);
      card.appendChild(el("h3", "artist-card__name", escapeHtml(artist.name)));
      card.appendChild(el("p", "artist-card__genre mono", escapeHtml(artist.genre)));
      card.appendChild(el("p", "artist-card__bio", escapeHtml(artist.bio)));

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
      if(D.contact && D.contact.bookingEmail){
        const a = el("a", "", "Booking"); a.href = "mailto:" + D.contact.bookingEmail;
        links.appendChild(a);
      }
      if(links.children.length) card.appendChild(links);

      rosterGrid.appendChild(card);
    });
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

  /* ---------- RELEASES ---------- */
  const releasesList = $("#releasesList");
  if(releasesList && Array.isArray(D.releases)){
    D.releases.forEach(rel => {
      const row = el("div", "release-row");
      row.appendChild(el("span", "release-row__cat mono", escapeHtml(rel.catalog || "")));

      const mid = el("div", "");
      mid.appendChild(el("p", "release-row__title", escapeHtml(rel.title)));
      mid.appendChild(el("p", "release-row__artist", escapeHtml(rel.artist)));
      row.appendChild(mid);

      row.appendChild(el("span", "release-row__date mono", escapeHtml(rel.date || "")));

      if(rel.embedUrl){
        const wrap = el("div", "release-embed");
        const iframe = document.createElement("iframe");
        iframe.loading = "lazy";
        iframe.height = "120";
        iframe.allow = "autoplay";
        iframe.src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(rel.embedUrl) +
          "&color=%23ff6a13&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false";
        wrap.appendChild(iframe);
        row.appendChild(wrap);
      } else if(rel.link){
        row.style.cursor = "pointer";
        row.addEventListener("click", () => window.open(rel.link, "_blank", "noopener"));
      }

      releasesList.appendChild(row);
    });
    if(!D.releases.length){
      releasesList.appendChild(el("p", "split__text", "Nessuna uscita ancora inserita: aggiungile in js/data.js → releases."));
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
      spotifyWrap.appendChild(el("p", "split__text", "Playlist non ancora collegata: aggiungi il link in js/data.js → socials.spotify (o spotifyPlaylistEmbedUrl per una playlist specifica)."));
    }
  }

  /* ---------- PRE-SAVE ---------- */
  const presaveBox = $("#presaveBox");
  if(presaveBox){
    if(D.presave && D.presave.active && D.presave.url){
      presaveBox.appendChild(el("p", "presave-box__track mono", escapeHtml(D.presave.trackTitle || "")));
      const a = el("a", "btn btn--primary btn--full", "Pre-save ora");
      a.href = D.presave.url; a.target = "_blank"; a.rel = "noopener";
      presaveBox.appendChild(a);
    } else {
      presaveBox.appendChild(el("p", "presave-box__empty", "Nessuna uscita in pre-save al momento. Torna presto — o seguici sui social per essere avvisato."));
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
      const a = el("a", "btn btn--primary", "Iscriviti alla newsletter");
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

})();
