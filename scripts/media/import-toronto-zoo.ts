import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_ROOT = '/home/kevin/coding/portfolio-site';
const DEST_ROOT = '/home/kevin/coding/zoo-blog/public/media/toronto-zoo/2026-02-28';

const imageMap: Record<string, string> = {
  '/public/images/blog/toronto-zoo-2026-02-28/snow-leopard-closeup-1.webp': 'images/snow-leopard-closeup-1.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/snow-leopard-closeup-2.webp': 'images/snow-leopard-closeup-2.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/snow-leopard-video-poster.webp': 'images/snow-leopard-video-poster.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/polar-bear-closeup-1.webp': 'images/polar-bear-closeup-1.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/polar-bear-closeup-2.webp': 'images/polar-bear-closeup-2.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/polar-bear-video-poster.webp': 'images/polar-bear-video-poster.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/gibbon-closeup-1.webp': 'images/gibbon-closeup-1.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/gibbon-closeup-2.webp': 'images/gibbon-closeup-2.webp',
  '/public/images/blog/toronto-zoo-2026-02-28/gibbon-video-poster.webp': 'images/gibbon-video-poster.webp',
};

const videoMap: Record<string, string> = {
  '/public/videos/blog/toronto-zoo-2026-02-28/snow-leopard-highlight.mp4': 'videos/snow-leopard-highlight.mp4',
  '/public/videos/blog/toronto-zoo-2026-02-28/polar-bear-highlight.mp4': 'videos/polar-bear-highlight.mp4',
  '/public/videos/blog/toronto-zoo-2026-02-28/gibbon-highlight.mp4': 'videos/gibbon-highlight.mp4',
};

async function copyMappedFiles(mapping: Record<string, string>) {
  for (const [sourceRelative, destinationRelative] of Object.entries(mapping)) {
    const source = path.join(SOURCE_ROOT, sourceRelative);
    const destination = path.join(DEST_ROOT, destinationRelative);

    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination, { force: true });
    process.stdout.write(`Copied ${sourceRelative} -> ${destinationRelative}\n`);
  }
}

async function main() {
  await mkdir(path.join(DEST_ROOT, 'images'), { recursive: true });
  await mkdir(path.join(DEST_ROOT, 'videos'), { recursive: true });

  await copyMappedFiles(imageMap);
  await copyMappedFiles(videoMap);

  process.stdout.write('Toronto Zoo media import complete.\n');
}

main().catch((error) => {
  process.stderr.write(`Media import failed: ${(error as Error).message}\n`);
  process.exit(1);
});
