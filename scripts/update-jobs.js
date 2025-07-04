import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jobsDir = join(__dirname, '../src/content/jobs');

// Read all job files
const jobFiles = readdirSync(jobsDir).filter(file => file.endsWith('.md'));

jobFiles.forEach(file => {
  if (file === 'cover.md' || file === 'resume.md' || file === 'remote-cover.md') {
    return; // Skip non-job files
  }

  const filePath = join(jobsDir, file);
  const content = readFileSync(filePath, 'utf8');
  
  // Extract the frontmatter and body
  const frontmatterEnd = content.indexOf('---', 3);
  const frontmatter = content.slice(4, frontmatterEnd).trim();
  let body = content.slice(frontmatterEnd + 3).trim();
  
  // Parse the frontmatter
  const frontmatterLines = frontmatter.split('\n');
  const frontmatterObj = {};
  
  frontmatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      frontmatterObj[key.trim()] = value.startsWith('"') ? value.slice(1, -1) : value;
    }
  });
  
  // Create new frontmatter with all required fields
  const newFrontmatter = {
    title: frontmatterObj.title || 'Senior Developer',
    employer: frontmatterObj.employer || 'Company Name',
    description: frontmatterObj.description || 'Key responsibilities and achievements',
    date: frontmatterObj.date || '2020-01-01',
    endDate: frontmatterObj.endDate || '2022-12-31',
    location: frontmatterObj.location || 'Remote',
    employmentType: frontmatterObj.employmentType || 'Full-time',
    technologies: frontmatterObj.technologies || 'JavaScript, React, Node.js',
    skills: frontmatterObj.skills || JSON.stringify(['Full-stack Development', 'Problem Solving'])
  };
  
  // Format the new frontmatter
  const newFrontmatterString = Object.entries(newFrontmatter)
    .map(([key, value]) => `${key}: ${typeof value === 'string' && value.startsWith('[') ? value : JSON.stringify(value)}`)
    .join('\n');
  
  // Format the body if it's just bullet points
  if (body.startsWith('- ') && !body.includes('##')) {
    const bulletPoints = body.split('\n').filter(line => line.trim().startsWith('-'));
    
    // Group bullet points into categories if there are many
    if (bulletPoints.length > 5) {
      body = `## Role Overview
As a ${newFrontmatter.title} at ${newFrontmatter.employer}, I was responsible for ${newFrontmatter.description.toLowerCase()}.

## Key Achievements
${bulletPoints.slice(0, 5).join('\n')}

## Technologies Used
- JavaScript, React, Node.js
- Modern web development tools and practices`;
    } else {
      body = `## Role Overview
${bulletPoints.join('\n')}`;
    }
  }
  
  // Write the updated file
  const newContent = `---
${newFrontmatterString}
---

${body}`;
  
  writeFileSync(filePath, newContent);
  console.log(`Updated ${file}`);
});

console.log('All job files have been updated!');
