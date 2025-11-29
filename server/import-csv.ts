#!/usr/bin/env tsx

/**
 * PropertyRegister.ie CSV Import Utility
 * 
 * Usage: npx tsx server/import-csv.ts [year] [csv-file-path]
 * Example: npx tsx server/import-csv.ts 2025 attached_assets/PPR-2025.csv
 */

import { readFileSync } from 'fs';
import { storage } from './storage';

async function importCSV(year: number, csvFilePath: string) {
  try {
    console.log(`Starting import for year ${year} from ${csvFilePath}`);
    
    // Read CSV file with proper encoding handling
    let csvData = readFileSync(csvFilePath, 'latin1') // Read as latin1 to handle Windows-1252
      .replace(/^\uFEFF/, ''); // Remove BOM if present
    
    // Convert Windows-1252 Euro symbol (0x80) to proper UTF-8
    csvData = csvData.replace(/\x80/g, '€'); // Convert Windows-1252 Euro to UTF-8
    
    // Convert back to UTF-8 properly
    csvData = Buffer.from(csvData, 'latin1').toString('utf-8');
    console.log(`Read ${csvData.length} characters from ${csvFilePath}`);
    
    // Import to database
    const importedCount = await storage.importPropertyRegisterCSV(csvData, year);
    
    console.log(`✅ Successfully imported ${importedCount} properties for ${year}`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error importing CSV:`, error);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: npx tsx server/import-csv.ts [year] [csv-file-path]');
  console.error('Example: npx tsx server/import-csv.ts 2025 attached_assets/PPR-2025.csv');
  process.exit(1);
}

const year = parseInt(args[0]);
const csvFilePath = args[1];

if (isNaN(year) || year < 2000 || year > 2030) {
  console.error('Invalid year. Please provide a year between 2000 and 2030');
  process.exit(1);
}

importCSV(year, csvFilePath);