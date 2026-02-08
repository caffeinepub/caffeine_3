# Specification

## Summary
**Goal:** Reproduce and resolve the current deployment failure with minimal changes, and add a fast pre-deploy verification step to prevent regressions.

**Planned changes:**
- Reproduce the failing deployment pipeline step and capture the exact error output and command used to trigger it.
- Apply the minimal code/config changes needed to fix the deployment while preserving existing app behavior and UI.
- Add a lightweight automated pre-deploy verification command that fails fast if the deployment-breaking condition returns, and document how to run it plus the root cause and fix.

**User-visible outcome:** The app deploys successfully, loads in the browser with the backend canister reachable, and core routes render without new blank screens or console errors caused by the fix.
