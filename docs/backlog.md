# Backlog

## Fixed

- Added loading states
- Changed db pooling to neon-http client.

## Current

- How to handle database timing out

## Next

- Fix manage dashboard
- Fix footer on form's review page
- Helmet + rate limiter issues on vercel deployment
- Review all manage pages
- Contact page UI
- Review Admin dashboard. show metadata from logs
- Improve the multi-step form code using `cloneNode` and `DocumentFragment`
- Split and simplify the multi-step form client code
- Add SEO features
- Introduce Node event emitters where they simplify internal app flows, such as email sending, startup and graceful shutdown hooks, and DB-to-cache follow-up work

## Later

- Add a blog
- Revisit edit approval flow so important changes may need admin review

## Known Problems

- Rate limiter needs to be replaced, not compatitable with neon http serverless.
- Emails still send to a hardcoded address instead of the intended recipients
