# Content Model

## Directus Collections

## posts

- `id` (string)
- `slug` (string)
- `title` (string)
- `excerpt` (string)
- `publish_date` (date)
- `author_name` (string)
- `category` (`field-notes` | `conservation` | `engineering`)
- `tags` (string[])
- `reading_minutes` (number)
- `hero` (json object)
- `intro_blocks` (string[])
- `preservation_lens` (string[])
- `animal_sections` (json[])

## Animal Section Structure

- `section_id`
- `title`
- `paragraphs` (min 2)
- `photos` (exactly 2)
- `video` (optional by source availability)

## Prisma Models

- `ContactSubmission`
- `RevalidationEvent`
- `AuditEvent`

Directus stores editorial content. Prisma/Postgres stores operational events and contact payloads.
