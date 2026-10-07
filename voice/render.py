"""Render voice/jobs.json with Kokoro-82M into voice/cache/<id>.mp3 + <id>.json.
Usage: python3 voice/render.py <model.onnx> <voices.npz> [workers=4]
Each clip: sentences synthesised one by one (for caption timing), joined with short pauses,
encoded as CBR MP3 (32 kbps, 24 kHz mono, no tags) so clips can be concatenated into sprites and sliced back by byte range."""
import json, os, re, sys, subprocess, multiprocessing as mp
import numpy as np

ROOT = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(ROOT, 'cache')
SR = 24000
FPS = 15

def safe(i): return re.sub(r'[^A-Za-z0-9_.-]', '_', i)

def sentences(t):
    parts = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9"\'(])', t.strip())
    out = []
    for p in parts:
        while len(p) > 380:  # very long sentences: split at a comma near the middle
            cut = p.rfind(', ', 0, 300)
            if cut < 80: break
            out.append(p[:cut + 1]); p = p[cut + 2:]
        if p.strip(): out.append(p.strip())
    return out

_k = None
def init(model, voices):
    global _k
    import onnxruntime as ort
    from kokoro_onnx import Kokoro
    so = ort.SessionOptions(); so.intra_op_num_threads = 1; so.inter_op_num_threads = 1
    _k = Kokoro.from_session(ort.InferenceSession(model, so, providers=['CPUExecutionProvider']), voices)

def render(job):
    base = os.path.join(CACHE, safe(job['id']))
    meta_path = base + '.json'
    if os.path.exists(meta_path):
        try:
            m = json.load(open(meta_path))
            if m.get('h') == job['h'] and m.get('voice') == job['voice'] and os.path.exists(base + '.mp3'): return job['id'], 'cached'
        except Exception: pass
    lang = 'en-gb' if job['voice'].startswith('b') else 'en-us'
    chunks, sents, t = [], [], 0.0
    gap = np.zeros(int(SR * 0.18), dtype=np.float32)
    for s in sentences(job['text']):
        a, sr = _k.create(s, voice=job['voice'], speed=1.0, lang=lang)
        a = np.asarray(a, dtype=np.float32)
        sents.append([round(t, 2), s])
        chunks += [a, gap]; t += (len(a) + len(gap)) / SR
    audio = np.concatenate(chunks) if chunks else np.zeros(SR // 2, dtype=np.float32)
    peak = float(np.max(np.abs(audio)) or 1.0)
    audio = (audio / peak * 0.89).astype(np.float32)
    hop = SR // FPS
    env = []
    for i in range(0, len(audio), hop):
        r = float(np.sqrt(np.mean(audio[i:i + hop] ** 2))) if len(audio[i:i + hop]) else 0.0
        env.append(min(9, int(r * 40)))
    pcm = (audio * 32767).astype('<i2').tobytes()
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', 'pipe:0',
                    '-c:a', 'libmp3lame', '-b:a', '32k', '-ar', str(SR), '-write_xing', '0', '-id3v2_version', '0',
                    '-fflags', '+bitexact', '-map_metadata', '-1', base + '.mp3'], input=pcm, check=True)
    json.dump({'id': job['id'], 'h': job['h'], 'voice': job['voice'], 'dur': round(len(audio) / SR, 2),
               'env': ''.join(map(str, env)), 'sents': sents}, open(meta_path, 'w'))
    return job['id'], 'new'

if __name__ == '__main__':
    model, voices = sys.argv[1], sys.argv[2]
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 4
    os.makedirs(CACHE, exist_ok=True)
    jobs = json.load(open(os.path.join(ROOT, 'jobs.json')))
    done = 0
    with mp.Pool(n, initializer=init, initargs=(model, voices)) as pool:
        for i, (jid, st) in enumerate(pool.imap_unordered(render, jobs, chunksize=1)):
            done += st == 'new'
            if (i + 1) % 25 == 0: print(f'{i + 1}/{len(jobs)} ({done} new)', flush=True)
    print('finished', len(jobs), 'clips,', done, 'new', flush=True)
