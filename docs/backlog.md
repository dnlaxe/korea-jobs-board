# Backlog

## Ongoing

- Consolidate the design so the UI feels more consistent

## Current

- Fix manage dashboard
- Fix footer on form's review page
- Align error handling with Vercel logs

## Next

- Strengthen security around write actions
- Add automated tests for critical flows
- Review all manage pages
- Contact page UI
- Review Admin dashboard. show metadata from logs

- Improve the multi-step form code using `cloneNode` and `DocumentFragment`
- Split and simplify the multi-step form client code
- Measure performance and identify slow paths before optimizing further
- Add database indexes and review query performance
- Move post expiration to a scheduled or background job
- Add SEO features
- Add concrete SEO deliverables such as sitemap, metadata, and structured data
- Add an accessibility audit and fixes
- Introduce Node event emitters where they simplify internal app flows, such as email sending, startup and graceful shutdown hooks, and DB-to-cache follow-up work
- Deploy the app

## Later

- Add a blog
- Revisit edit approval flow so important changes may need admin review
- Consider richer moderation tools for admin
- Consider saved drafts or better draft recovery UX

## Known Problems

- Some later-added features may still need cleanup or redesign:
- Dummy payment flow with tiers is not fully integrated
- Page view tracking may need clearer reporting or purpose
- Audit event logging may need more consistent event coverage and metadata
- Rate limiting is still broad and simple
- DB readiness check and graceful shutdown are in place but need production validation
- Production/deployment work is still incomplete
- Test coverage is still limited
- Emails still send to a hardcoded address instead of the intended recipients
- Payment flow is still dummy or incomplete
- Session approval can leave partial state if a later step fails
- Post expiration currently happens lazily when the board is loaded
