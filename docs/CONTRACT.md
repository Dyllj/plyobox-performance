# Plyobox Shared Contract

The preview apps share `shared/contract.ts`, `shared/seed.ts`, and `shared/tokens.json`.

## Enums

- Membership: `daily`, `monthly`
- Payment methods: `cash`, `gcash`, `maya`, `bank`
- Payment status: `pending`, `verified`, `rejected`
- Account status: `active`, `suspended`
- Membership status: `none`, `active`, `expired`
- Check-in source: `qr`, `staff`
- Staff roles: `owner`, `admin`, `staff`
- App roles: `member`, `trainer`
- Trainer profile: `draft`, `published`, `suspended`
- Booking: `pending`, `confirmed`, `declined`, `completed`, `cancelled`
- Inquiry: `new`, `replied`; topics `membership`, `trainer`, `other`

## Business decisions

- Daily access is valid on the verified Manila calendar day and ends at midnight.
- Monthly access starts on the verified Manila date and includes 30 calendar days.
- Payments store `amountMinor`; no current-price recalculation.
- One check-in per member per Manila calendar day.
- QR rotation is 60 seconds.
- Cash payments need no proof; GCash, Maya and bank payments require proof.
- Staff roles are owner, admin, and staff. Public app roles are member and trainer.
- Non-cash verification may be performed by staff, admin, or owner.
- Trainer prices live on trainer services.

## Preview seed

Run `node shared/sync.mjs` to copy the contract and seed. Mobile uses Mara Santos (`PLY-0042`) and Kai Mendoza (`TRN-001`) for preview sessions.

## Sync workflow

Edit `shared/contract.ts`, `shared/seed.ts`, or `shared/tokens.json`, then:

```bash
node shared/sync.mjs
node shared/sync.mjs --check
node shared/check.mjs
```

The sync script generates app-local copies and theme files. Generated files must not be edited directly.

## Needed for backend phase

- Camera QR scanning
- Image/receipt upload
- Secure token storage
- Push notifications
- Data layer such as TanStack Query with Zod
- Auth provider

## Feature flags

Workouts, progress, goals, community/referrals, and ratings default to off in `Plyobox/src/constants/features.ts`.
