// Token filling: {khai}, {khai.s}, {me} … become (relabelable) names. Used for display text and for grader checks.
import { NPCS } from '../content/npcs.js';

export const TOKENS = {
  khai: 'anh_khai', ethan: 'ethan', lan: 'chi_lan', bao: 'bao', vy: 'vy', sarah: 'sarah', raj: 'raj',
  antoine: 'antoine', chau: 'minh_chau', michael: 'michael', dat: 'dat', ha: 'ha',
};

const TOKEN_RE = /\{(\w+)(\.s)?\}/g;

function relabel(names, id) {
  const n = names && names[id];
  return n && String(n).trim() ? String(n).trim().slice(0, 40) : '';
}

/** Name for a token. A private relabel replaces both the full and the short form. */
export function tokenName(key, short, ctx = {}) {
  if (key === 'me') return (ctx.me && String(ctx.me).trim().slice(0, 40)) || 'you';
  const id = TOKENS[key];
  if (!id) return null;
  const custom = relabel(ctx.names, id);
  if (custom) return custom;
  const npc = NPCS[id];
  return short ? npc.short : npc.name;
}

export function fill(str, ctx = {}) {
  if (typeof str !== 'string') return str;
  return str.replace(TOKEN_RE, (m, key, s) => tokenName(key, !!s, ctx) ?? m);
}

export function stripMarks(s) {
  return String(s).normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/** A regex fragment that matches a name with or without Vietnamese diacritics. */
function nameAlt(name) {
  const a = escapeRe(name), b = escapeRe(stripMarks(name));
  return a === b ? a : `(?:${a}|${b})`;
}

export function fillPattern(src, ctx = {}) {
  return String(src).replace(TOKEN_RE, (m, key, s) => {
    const n = tokenName(key, !!s, ctx);
    return n == null ? m : nameAlt(n);
  });
}

export function fillChecks(checks, ctx = {}) {
  return (checks || []).map(c => ({ ...c, l: fill(c.l, ctx), ok: fill(c.ok, ctx), fix: fill(c.fix, ctx), any: (c.any || []).map(a => fillPattern(a, ctx)) }));
}
