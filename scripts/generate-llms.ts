#!/usr/bin/env node

import { LLMSTxtGenerator } from 'llms-txt-generator-geo-ai';
import { llmsTxtConfig } from '../llms-txt.config';

async function generateLLMSTxt() {
  try {
    console.log('🚀 Generating LLMS.txt file for Israel...');
    
    const generator = new LLMSTxtGenerator({
      geoData: llmsTxtConfig.geoData,
      outputDir: llmsTxtConfig.outputDir,
      filename: llmsTxtConfig.filename
    });

    const outputPath = await generator.generate();
    
    console.log(`✅ LLMS.txt file generated successfully!`);
    console.log(`📁 Location: ${outputPath}`);
    console.log(`🌐 You can access it at: http://localhost:3000/llms.txt`);
    
  } catch (error) {
    console.error('❌ Error generating LLMS.txt:', error);
    process.exit(1);
  }
}

generateLLMSTxt();