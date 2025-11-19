#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/**
 * Recursively copy files matching a filter
 */
function copyFiltered(src, dest, filter) {
    if (!fs.existsSync(src)) return;

    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFiltered(srcPath, destPath, filter);
        } else if (!filter || filter(entry.name)) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

/**
 * Copy entire directory
 */
function copyDir(src, dest) {
    copyFiltered(src, dest, null);
}

async function main() {
    console.log('📦 Aggregating dist assets...');

    // Clean dist
    const distDir = path.join(ROOT, 'dist');
    if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true });
    }

    // Create structure
    fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(distDir, 'fonts'), { recursive: true });
    fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(distDir, 'images'), { recursive: true });

    // Copy CSS from foundation
    console.log('  ✓ Copying CSS from tcds-foundation');
    const foundationDist = path.join(ROOT, 'packages/tcds-foundation/dist');
    for (const file of fs.readdirSync(foundationDist)) {
        if (file.endsWith('.css')) {
            fs.copyFileSync(
                path.join(foundationDist, file),
                path.join(distDir, 'css', file)
            );
        }
    }

    // Copy fonts from identity
    console.log('  ✓ Copying fonts from tcds-identity');
    const identityFonts = path.join(ROOT, 'packages/tcds-identity/dist/fonts');
    copyDir(identityFonts, path.join(distDir, 'fonts'));

    // Copy SVGs from identity images
    console.log('  ✓ Copying SVG images from tcds-identity');
    const identityImages = path.join(ROOT, 'packages/tcds-identity/dist/images');
    copyFiltered(
        identityImages,
        path.join(distDir, 'images'),
        (name) => name.endsWith('.svg')
    );

    // Copy JS from components
    console.log('  ✓ Copying JS from tcds-components');
    const componentsDist = path.join(ROOT, 'packages/tcds-components/dist');
    for (const file of fs.readdirSync(componentsDist)) {
        if (file.endsWith('.js')) {
            fs.copyFileSync(
                path.join(componentsDist, file),
                path.join(distDir, 'js', file)
            );
        }
    }

    console.log('✅ Dist aggregation complete!');
}

main().catch((error) => {
    console.error('❌ Dist aggregation failed:', error);
    process.exit(1);
});
