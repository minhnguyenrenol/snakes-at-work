// Bundle the game into one self-contained page for the Artifact: inline CSS + one inline script.
// Usage: node build.mjs   (set TLG_TOOLS to a folder whose node_modules has esbuild, react, react-dom, remotion, @remotion/player)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const tools = process.env.TLG_TOOLS || '/tmp/claude-0/-home-claude/273e51e9-7fd9-533f-98a0-1e746fb25bfe/scratchpad/tools';
const require = createRequire(path.join(tools, 'package.json'));
const esbuild = require('esbuild');

const result = await esbuild.build({
  entryPoints: [path.join(here, 'app/js/main.js')],
  bundle: true, write: false, minify: true, format: 'iife', target: ['es2020'], legalComments: 'none',
  jsx: 'automatic', loader: { '.jsx': 'jsx' },
  nodePaths: [path.join(tools, 'node_modules')],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});
let js = result.outputFiles[0].text;
// Never let the bundle close the inline script early.
js = js.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const css = readFileSync(path.join(here, 'app/styles.css'), 'utf8');
const fonts = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap';
const html = `<title>Snakes at Work · Rắn công sở</title>
<style>
${css}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">
<div id="app"></div>
<script>
${js}
</script>
`;
mkdirSync(path.join(here, 'dist'), { recursive: true });
writeFileSync(path.join(here, 'dist/index.html'), html);
console.log(`dist/index.html ${(html.length / 1024).toFixed(0)} KB (js ${(js.length / 1024).toFixed(0)} KB, css ${(css.length / 1024).toFixed(0)} KB)`);
