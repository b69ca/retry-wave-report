# retry-wave-report

Detect retry waves where several clients retry the same operation at nearly the same time—a practical signature of missing jitter or a thundering herd.

```sh
npx --yes github:b69ca/retry-wave-report requests.jsonl
npx --yes github:b69ca/retry-wave-report requests.jsonl --time at --operation route --client workerId --attempt try --window 500 --json
```

Only attempts greater than 1 are analyzed. Retries for the same operation are clustered when adjacent events are within the configured window. A wave requires three distinct clients by default. Reports include client count, retry count, span, attempt range and a simple synchronization score. Detected waves exit 1; invalid input exits 2.

This is an offline log heuristic, not a traffic generator or tracing system. It answers whether independent clients are converging on the same retry instant. Zero dependencies, Node.js 20+, MIT licensed.
