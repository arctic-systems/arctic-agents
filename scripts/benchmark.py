import time
from statistics import mean, stdev
from app.inference import load_model, generate

PROMPTS = [
    "Describe neon rain on old glass in one sentence.",
    "Give a grounded, two-sentence terminal-core vignette about a humming vent.",
    "Write one sentence about a corridor light stuttering back to life."
]

def run_trial(prompt: str, iters: int = 3):
    times = []
    outs = []
    for _ in range(iters):
        t0 = time.time()
        out = generate([{"role": "user", "content": prompt}], max_new_tokens=64, temperature=0.7, top_p=0.95)
        dt = time.time() - t0
        times.append(dt)
        outs.append(out[:120].replace("\n", " "))
    return times, outs[-1]

def main():
    load_model()
    print("benchmark: warm model loaded.")
    results = []
    for p in PROMPTS:
        times, sample = run_trial(p)
        results.append((p, times, sample))
    print("\n=== RESULTS ===")
    for p, times, sample in results:
        ms = [t * 1000 for t in times]
        avg = mean(ms)
        sd = stdev(ms) if len(ms) > 1 else 0.0
        print(f"\nPrompt: {p}\n  avg: {avg:.1f} ms   sd: {sd:.1f} ms   n={len(ms)}\n  sample: {sample}")

if __name__ == "__main__":
    main()
