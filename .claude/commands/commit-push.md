You are about to commit and push all pending changes. Follow these steps precisely:

## Step 1 — Discover changes

Run `git status` and `git diff` to see all modified, added, and deleted files.

## Step 2 — Group changes into logical units

Analyze the diff for every changed file and group them by the feature, concern, or area they belong to. Examples of good groupings:

- All files changed for a single feature (e.g. "mobile navbar menu")
- All files changed for a single bug fix
- A new file and its related data/types
- A config or dependency change on its own

Never mix unrelated concerns in one commit. One commit = one reason to change.

## Step 3 — Commit each group separately

For each group, in order of logical dependency (foundational first):

1. Stage only the files in that group using `git add <file1> <file2> ...`
2. Write a concise commit message following this format:
   - Start with a type prefix: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, or `docs:`
   - Then a short imperative sentence (max 72 chars) describing WHAT changed and WHY
   - Co-Authored-By line at the end
3. Run `git commit -m "$(cat <<'EOF' ... EOF)"`

Commit message template:
```
<type>: <short description>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Step 4 — Verify

After all commits, run `git log --oneline -10` to confirm the commit history looks correct.

## Step 5 — Push

Run `git push` to push all commits to the remote branch.

## Rules

- Never use `git add -A` or `git add .` — always add files by name
- Never use `--no-verify`
- If a commit fails (e.g. hook error), fix the issue and retry before continuing
- If there are no changes, say so and stop
- Report each commit as it is made so the user can follow along
