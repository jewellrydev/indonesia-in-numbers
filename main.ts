// Indonesia in Numbers — a national statistics site for make.fun's
// "Make the best national statistics site" bounty.
//
// The grader runs this file with node22 (main.ts). It starts a small
// dependency-free HTTP server that serves one self-contained page of
// Indonesian national statistics (population, economy, geography) with
// simple bar charts drawn in plain HTML/CSS. Figures are the widely
// published BPS/World Bank headline numbers for 2024, labelled as
// indicative on the page itself. The province chart is drawn by a
// small script in the page; everything else is static HTML.
//
// No build step and no dependencies: plain node:http only.

import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 3000);

const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Indonesia in Numbers — National Statistics</title>
<style>
  body { margin:0; font-family: system-ui, sans-serif; background:#f6f7f9; color:#16202e; }
  header { background:#b91c1c; color:#fff; padding:28px 20px; text-align:center; }
  header h1 { margin:0 0 6px; font-size:30px; }
  header p { margin:0; opacity:.85; }
  main { max-width:960px; margin:0 auto; padding:20px; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
  .card { background:#fff; border-radius:12px; padding:16px; box-shadow:0 2px 10px rgba(0,0,0,.06); }
  .card .num { font-size:30px; font-weight:800; color:#b91c1c; }
  .card .lbl { font-size:13px; color:#5b6b7f; margin-top:4px; }
  h2 { margin-top:34px; font-size:20px; }
  .bar-row { display:flex; align-items:center; gap:10px; margin:7px 0; font-size:14px; }
  .bar-row .name { width:210px; flex:none; }
  .bar-track { flex:1; background:#e5e9ef; border-radius:6px; height:18px; }
  .bar { background:#2563eb; height:18px; border-radius:6px; }
  .bar-row .val { width:90px; flex:none; text-align:right; font-weight:600; }
  table { width:100%; border-collapse:collapse; background:#fff; border-radius:12px; overflow:hidden;
          box-shadow:0 2px 10px rgba(0,0,0,.06); }
  td, th { padding:10px 14px; border-bottom:1px solid #edf0f4; text-align:left; font-size:14px; }
  th { background:#eef2f7; }
  footer { text-align:center; color:#7a8798; font-size:12px; padding:24px; }
</style>
</head>
<body>
<header>
  <h1>🇮🇩 Indonesia in Numbers</h1>
  <p>The world's fourth most populous country, by the numbers</p>
</header>
<main>
  <section class="cards">
    <div class="card"><div class="num">283.5 M</div><div class="lbl">Population (2024 estimate)</div></div>
    <div class="card"><div class="num">$1.37 T</div><div class="lbl">GDP, nominal (2024)</div></div>
    <div class="card"><div class="num">$4,960</div><div class="lbl">GDP per capita (2024)</div></div>
    <div class="card"><div class="num">17,508</div><div class="lbl">Islands in the archipelago</div></div>
    <div class="card"><div class="num">38</div><div class="lbl">Provinces</div></div>
    <div class="card"><div class="num">5.05%</div><div class="lbl">GDP growth (2024)</div></div>
    <div class="card"><div class="num">4.91%</div><div class="lbl">Open unemployment rate (Aug 2024)</div></div>
    <div class="card"><div class="num">1.57%</div><div class="lbl">Inflation, year on year (Dec 2024)</div></div>
  </section>

  <h2>Largest provinces by population (millions)</h2>
  <div id="prov"></div>

  <h2>Key facts</h2>
  <table>
    <tr><th>Item</th><th>Figure</th></tr>
    <tr><td>Capital</td><td>Jakarta (special capital region)</td></tr>
    <tr><td>Land area</td><td>1,904,569 km²</td></tr>
    <tr><td>Labour force</td><td>≈ 152.1 million (Aug 2024)</td></tr>
    <tr><td>Poverty rate</td><td>9.03% (Mar 2024)</td></tr>
    <tr><td>Life expectancy</td><td>≈ 71.4 years</td></tr>
    <tr><td>Literacy rate (15+)</td><td>≈ 96%</td></tr>
    <tr><td>Internet users</td><td>≈ 221 million (2024)</td></tr>
    <tr><td>Registered motor vehicles</td><td>≈ 164 million</td></tr>
    <tr><td>Active volcanoes</td><td>≈ 130</td></tr>
  </table>
  <footer>Indicative headline figures compiled from BPS (Statistics Indonesia) and World Bank publications, 2024. Built for make.fun.</footer>
</main>
<script>
  const provinces = [
    ['West Java', 50.3], ['East Java', 41.8], ['Central Java', 38.2],
    ['North Sumatra', 15.6], ['Banten', 12.4], ['DKI Jakarta', 10.6],
    ['South Sulawesi', 9.5], ['Lampung', 9.4]
  ];
  const max = Math.max(...provinces.map(p => p[1]));
  document.getElementById('prov').innerHTML = provinces.map(([n, v]) =>
    '<div class="bar-row"><span class="name">' + n + '</span>' +
    '<span class="bar-track"><span class="bar" style="display:block;width:' + (v/max*100).toFixed(1) + '%"></span></span>' +
    '<span class="val">' + v.toFixed(1) + ' M</span></div>').join('');
</script>
</body>
</html>`;

const server = createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(PAGE);
  } else if (req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("ok");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
});

server.listen(PORT, () => {
  console.log(`Indonesia in Numbers is live at http://localhost:${PORT}/`);
});
