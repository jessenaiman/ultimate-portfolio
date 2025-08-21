import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Directory containing the posts
const postsDir = path.join(__dirname, '../src/content/posts');

// Function to normalize frontmatter
function normalizeFrontmatter() {
  const files = fs.readdirSync(postsDir);
  files.forEach(file => {
    if (!file.match(/\.(md|mdx)$/)) return;
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data;

    // Rename 'tag' to 'tags'
    if (data.tag) {
      data.tags = Array.isArray(data.tag) ? data.tag : [data.tag];
      delete data.tag;
    }

    // Ensure tags is an array
    if (data.tags && !Array.isArray(data.tags)) {
      data.tags = [data.tags];
    }

    // Migrate 'date' to 'pubDate' if necessary
    if (!data.pubDate && data.date) {
      data.pubDate = data.date;
      delete data.date;
    }

    // Standardize pubDate to ISO string
    if (data.pubDate) {
      const d = new Date(data.pubDate);
      data.pubDate = d.toISOString();
    }

    // Convert nested image object to thumbnail string, if present
    if (data.image) {
      if (data.image.url) {
        data.thumbnail = data.image.url;
      }
      // Remove the original image field after migration
      delete data.image;
    }

    // Write back the file with updated frontmatter
    const newContent = matter.stringify(parsed.content, data);
    fs.writeFileSync(filePath, newContent);
    console.log(`Normalized frontmatter in: ${file}`);
  });
  console.log('Frontmatter normalization complete.');
}

// Run normalization
normalizeFrontmatter();
