/* Shared validation: data files are editable content, never executable URLs. */
(function(){
  function httpsURL(value, hosts){
    try {
      const url = new URL(value);
      if(url.protocol !== "https:" || url.username || url.password || url.port || !url.hostname || /[\u0000-\u001F\u007F]/.test(String(value))) return "";
      if(hosts && !hosts.includes(url.hostname.toLowerCase())) return "";
      return url.href;
    } catch { return ""; }
  }
  function email(value){
    return typeof value === "string" && /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) ? value : "";
  }
  function spotify(value){
    const valid = httpsURL(value, ["open.spotify.com"]);
    if(!valid) return "";
    const url = new URL(valid);
    const match = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?(artist|playlist|album|track)\/([A-Za-z0-9]+)\/?$/);
    return match ? "https://open.spotify.com/embed/" + match[1] + "/" + match[2] : "";
  }
  window.NRS_SECURITY = Object.freeze({httpsURL, email, spotify});
})();
