# Backlog

## Ongoing

- Consolidate the design so the UI feels more consistent

## Current

- Make session approval and publishing transactional
- Finish tier and payment consistency across checkout, approval, and publishing
- Productionize email sending
- Strengthen security around write actions
- Add automated tests for critical flows
- change tokens to random words

## Next

- Add search or better filtering on the public board
- Improve analytics beyond basic page views
- Add review error handling
- Review whether the dummy payment flow should stay, change, or be removed
- Add clearer monitoring and health checks for production
- Add caching where it will materially improve performance
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
- Keep project docs in sync

## Later

- Add a blog
- Revisit edit approval flow so important changes may need admin review
- Consider richer moderation tools for admin
- Restyle the drafts page
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
