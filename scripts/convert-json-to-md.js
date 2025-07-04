import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jobsDir = path.join(__dirname, '../src/content/jobs');

// Read all JSON files in the jobs directory
const jsonFiles = fs.readdirSync(jobsDir).filter(file => file.endsWith('.json'));

jsonFiles.forEach(jsonFile => {
  const jsonPath = path.join(jobsDir, jsonFile);
  const mdFile = jsonFile.replace(/\.json$/, '.md');
  const mdPath = path.join(jobsDir, mdFile);
  
  try {
    // Read the JSON file
    const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    
    // Create frontmatter from JSON
    const frontmatter = Object.entries(jsonContent)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:\n${value.map(item => `  - "${item}"`).join('\n')}`;
        }
        return `${key}: "${value}"`;
      })
      .join('\n');
    
    // Create markdown content
    const mdContent = `---\n${frontmatter}\n---\n\n## Role Overview\nAdd your job description here.`;
    
    // Write the markdown file
    fs.writeFileSync(mdPath, mdContent);
    console.log(`Converted ${jsonFile} to ${mdFile}`);
    
    // Optionally delete the original JSON file
    // fs.unlinkSync(jsonPath);
    
  } catch (error) {
    console.error(`Error processing ${jsonFile}:`, error);
  }
});
