# digital_clock_frontend

React 17 (Create React App) frontend for a simple digital clock web app that displays the current time and updates every second.

## Environment

This container preserves the existing `.env` file (already present). Variables are prefixed with `REACT_APP_...` and are compatible with Create React App.

## Local development

From this directory:

```bash
npm ci
npm start
```

## Static analysis / CI checks

```bash
npm ci
npm run build
npm run lint
npm test
```

## Notes

- The UI is intentionally minimal: centered card, large time display, light theme.
- No backend integration is implemented here (clock uses browser time).
"
