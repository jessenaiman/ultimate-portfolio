import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config

const Generation = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    type: column.text(),
    prompt: column.text(),
    result: column.text(), // URL for image, generated text for text
    createdAt: column.date({ default: new Date() })
  }
});

export default defineDb({
  tables: { Generation },
});