import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { getAllPosts } from '@/lib/directus/queries';

const SOURCE_DIRECTORIES = ['app', 'components', 'lib'] as const;
const SOURCE_FILE_EXTENSIONS = new Set(['.ts', '.tsx']);
const IMAGE_MEDIA_PATH_PATTERN = /['"`](\/media\/[^'"`\s]+?\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^'"`]*)?)['"`]/gi;

async function collectSourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && SOURCE_FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeLocalImagePath(value: string): string | null {
  const withoutQuery = value.split('?')[0];
  if (!withoutQuery || !withoutQuery.startsWith('/media/')) {
    return null;
  }

  return withoutQuery;
}

async function getReferencedImagePathsFromSource(): Promise<Set<string>> {
  const references = new Set<string>();
  for (const directory of SOURCE_DIRECTORIES) {
    const absoluteDirectory = path.join(process.cwd(), directory);
    const files = await collectSourceFiles(absoluteDirectory);

    for (const filePath of files) {
      const source = await readFile(filePath, 'utf8');
      const matches = source.matchAll(IMAGE_MEDIA_PATH_PATTERN);
      for (const match of matches) {
        const normalized = normalizeLocalImagePath(match[1] ?? '');
        if (normalized) {
          references.add(normalized);
        }
      }
    }
  }

  return references;
}

async function getReferencedImagePathsFromContent(): Promise<Set<string>> {
  const references = new Set<string>();
  const posts = await getAllPosts();

  for (const post of posts) {
    const hero = normalizeLocalImagePath(post.hero.src);
    if (hero) {
      references.add(hero);
    }

    for (const section of post.content.sections) {
      for (const photo of section.photos) {
        const photoPath = normalizeLocalImagePath(photo.src);
        if (photoPath) {
          references.add(photoPath);
        }
      }

      const posterPath = normalizeLocalImagePath(section.video?.posterSrc ?? '');
      if (posterPath) {
        references.add(posterPath);
      }
    }
  }

  return references;
}

async function findMissingMediaFiles(paths: Iterable<string>): Promise<string[]> {
  const missing: string[] = [];

  for (const mediaPath of paths) {
    const filesystemPath = path.join(process.cwd(), 'public', mediaPath.slice(1));
    try {
      await access(filesystemPath);
    } catch {
      missing.push(mediaPath);
    }
  }

  return missing.sort();
}

describe('media image references', () => {
  it('resolves every referenced local image under public/media', async () => {
    const sourceReferences = await getReferencedImagePathsFromSource();
    const contentReferences = await getReferencedImagePathsFromContent();
    const allReferences = new Set([...sourceReferences, ...contentReferences]);

    expect(allReferences.size).toBeGreaterThan(0);

    const missing = await findMissingMediaFiles(allReferences);
    expect(missing, `Missing media image files:\n${missing.join('\n')}`).toEqual([]);
  });
});
