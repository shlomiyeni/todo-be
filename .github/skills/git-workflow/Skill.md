---
name: git-workflow
description: Guide developers through a rebase-based Git workflow using a single master branch and Git worktrees. Use when the user asks about starting a new branch, syncing with master, writing commits, or opening a pull request.
---

# Git Workflow Skill

Single `master` branch. Rebase, never merge. Worktrees for new branches.

---

## New Branch

Always use `git worktree add` — never `git checkout -b`.

```bash
git fetch origin
git worktree add ../project-my-feature -b feature/short-description origin/master
cd ../project-my-feature
```

Branch naming: `feature/`, `fix/`, `chore/`, `refactor/`, `docs/` + a short hyphenated description.

- Use hyphens to separate words: `fix/login-redirect` not `fix/loginRedirect`
- Be specific: `feature/user-auth-oauth` not `feature/update`
- Focus on the task: `refactor/payment-service` not `refactor/changes`

---

## Sync with Master

Run this daily, or before opening a PR:

```bash
git fetch origin
git rebase origin/master
```

If there are conflicts: fix them, then `git add <file>` and `git rebase --continue`. To bail: `git rebase --abort`.

---

## Commits

Use Conventional Commits:

```
feat(scope): add login page
fix(api): handle null response
chore(deps): upgrade lodash
```

Clean up before PR with interactive rebase:

```bash
git rebase -i origin/master
```

---

## Pull Request

1. Rebase on latest master (`git fetch origin && git rebase origin/master`)
2. Push: `git push origin feature/my-feature`
3. Open PR — title matches commit format: `feat(scope): description`
4. After merge, clean up:

```bash
git worktree remove ../project-my-feature
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```
