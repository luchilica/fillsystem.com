---
description: Execute a specific task from внести изменения/TODO.md by number or priority level. Reads the spec, implements it, verifies against the original requirement, builds, commits, and pushes.
---

# /audit-task — Execute TODO items

Run specific items from the site audit backlog.

## Usage

- `/audit-task 4` — execute item #4 from TODO.md
- `/audit-task P0` — execute all remaining P0 items
- `/audit-task 11-17` — execute items 11 through 17
- `/audit-task next` — pick the next unfinished item by priority (P0 first, then P1, etc.)

## Input

The argument is passed as `$ARGUMENTS`. Parse it to determine which items to execute.

## Procedure

1. **Read the task list**: Open `внести изменения/TODO.md` and find the requested item(s).
2. **Read the detailed spec**: If the item references a topic area (tech SEO, i18n, content, etc.), also read the corresponding numbered file (`01-tech-seo.md`, `02-i18n-geo.md`, `03-content-ai.md`, `04-geo-aeo-llm.md`, `05-conversion-trust.md`, `06-perf-a11y-legal.md`) for full context.
3. **Plan**: Identify all files that need changes. If the task touches multiple files (e.g. price sync across 10+ files), list them all before starting.
4. **Execute**: Make every change specified. Follow the spec exactly — don't skip steps, don't add unasked features.
5. **Self-verify**: Re-read the original spec. Check each requirement was met:
   - If the spec says "change X to Y" — grep to confirm X is gone and Y is present.
   - If the spec says "add Z to all pages" — verify it's on ALL pages, not just some.
   - If the spec mentions multiple files — confirm every file was updated.
6. **Build**: Run `npm run build`. Fix any errors. Do not commit if build fails.
7. **Commit + push**: Auto commit to main with a descriptive message. Push immediately.
8. **Report**: List what was done, what files were changed, and any items that need user input (e.g. "need GA4 measurement ID from user").

## Tracking completion

After executing an item, do NOT modify TODO.md — the user manages that file externally. Instead, report completion in the chat response.

## Error handling

- If an item requires credentials, env vars, or external action (e.g. "enable GA4"): implement everything code-side, report what the user needs to do manually.
- If an item conflicts with another item or with existing code: stop, explain the conflict, ask the user.
- If an item is ambiguous: check the detailed spec file (01-06) for clarification. If still unclear, make the conservative choice and note the assumption.
