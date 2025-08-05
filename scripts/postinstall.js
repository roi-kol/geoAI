#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function postInstall() {
  try {
    // Get the user's project root (where they ran npm install)
    const userProjectRoot = process.env.INIT_CWD || process.cwd();
    
    // Check if we're in a node_modules installation
    if (__dirname.includes('node_modules')) {
      console.log('🚀 Setting up llms-txt-generator-geo-ai...');
      
      // Check if project uses TypeScript
      const tsConfigPath = path.join(userProjectRoot, 'tsconfig.json');
      const isTypeScriptProject = await fs.pathExists(tsConfigPath);
      
      // Create configuration file (TypeScript or JavaScript)
      const configExtension = isTypeScriptProject ? '.ts' : '.js';
      const configPath = path.join(userProjectRoot, `llms-txt.config${configExtension}`);
      
      if (!await fs.pathExists(configPath)) {
        let configContent;
        
        if (isTypeScriptProject) {
          configContent = `import { LLMSTxtConfig } from 'llms-txt-generator-geo-ai';

const config: LLMSTxtConfig = {
  geoData: {
    location: 'Your Location',
    coordinates: 'lat, lng',
    country: 'Your Country',
    region: 'Your Region',
    timezone: 'Your Timezone',
    additionalInfo: 'Any additional geographic information',
    requestAttribution: 'Your Request Attribution',
    allowTraining: 'No',
    allowDataCollection: 'No',
    allowDataSharing: 'No',
    allowDataUsage: 'No',
    allowDataStorage: 'No',
    allowDataDeletion: 'No',
    allowDataModification: 'No',
    contact: 'me@geo.ai',
    userAgentRules: [
      {
        userAgent: '*',
        disallow: ['/premium/', '/drafts/']
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/private/', '/admin/']
      },
      {
        userAgent: 'OpenAI',
        disallow: ['/private/']
      },
    ]
  },
  outputDir: './', // Output directory for llms.txt
  filename: 'llms.txt' // Output filename
};

export default config;
`;
        } else {
          configContent = `module.exports = {
  geoData: {
    location: 'Your Location',
    coordinates: 'lat, lng',
    country: 'Your Country',
    region: 'Your Region',
    timezone: 'Your Timezone',
    additionalInfo: 'Any additional geographic information',
    requestAttribution: 'Your Request Attribution',
    allowTraining: 'No',
    allowDataCollection: 'No',
    allowDataSharing: 'No',
    allowDataUsage: 'No',
    allowDataStorage: 'No',
    allowDataDeletion: 'No',
    allowDataModification: 'No',
    contact: 'me@geo.ai',
    userAgentRules: [
      {
        userAgent: '*',
        disallow: ['/premium/', '/drafts/']
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/private/', '/admin/']
      },
      {
        userAgent: 'OpenAI',
        disallow: ['/private/']
      },
    ]
  },
  outputDir: './', // Output directory for llms.txt
  filename: 'llms.txt' // Output filename
};
`;
        }
        
        await fs.writeFile(configPath, configContent);
        console.log(`📄 Created llms-txt.config${configExtension} in your project`);
      }
      
      // Create package.json script if package.json exists
      const packageJsonPath = path.join(userProjectRoot, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        
        if (!packageJson.scripts) {
          packageJson.scripts = {};
        }
        
        if (!packageJson.scripts['generate-llms-txt']) {
          packageJson.scripts['generate-llms-txt'] = 'generate-llms-txt';
          await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
          console.log('📝 Added "generate-llms-txt" script to your package.json');
        }
      }
      
      // Create TypeScript declaration file if needed
      if (isTypeScriptProject) {
        const typesDir = path.join(userProjectRoot, '@types', 'llms-txt-generator-geo-ai');
        await fs.ensureDir(typesDir);
        console.log('📦 TypeScript project detected - types are included in the package');
      }
      
      console.log('✅ Setup complete! Run "npm run generate-llms-txt" to generate your llms.txt file');
      console.log(`📋 Edit llms-txt.config${configExtension} to customize your GEO data`);
    }
  } catch (error) {
    console.error('❌ Post-install setup failed:', error.message);
  }
}

postInstall();