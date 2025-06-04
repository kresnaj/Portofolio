'use server';

import fs from 'fs/promises';
import path from 'path';

export async function getFirstImageFromFolder(folderName: string): Promise<string> {
  try {
    const folderPath = path.join(process.cwd(), 'public', 'certificate', folderName);
    const files = await fs.readdir(folderPath);
    
    // Filter hanya file gambar
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    
    // Sort untuk memastikan konsistensi urutan
    imageFiles.sort();
    
    if (imageFiles.length > 0) {
      return `/certificate/${folderName}/${imageFiles[0]}`;
    }
    
    return '/placeholder.png'; // Default image jika tidak ada gambar
  } catch (error) {
    console.error(`Error reading certificate folder ${folderName}:`, error);
    return '/placeholder.png';
  }
}