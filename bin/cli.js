#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function runCLI() {
  try {
    const cwd = process.cwd();
    
    // Check for TypeScript or JavaScript config
    const tsConfigPath = path.join(cwd, 'llms-txt.config.ts');
    const jsConfigPath = path.join(cwd, 'llms-txt.config.js');
    
    let config = {
      geoData: {
        location: 'Default Location',
        coordinates: '0, 0',
        country: 'Unknown',
        region: 'Unknown',
        timezone: 'UTC',
        additionalInfo: 'Generated with default settings',
        requestAttribution: 'Generated with default settings',
        allowTraining: 'No',
        allowDataCollection: 'No',
        allowDataSharing: 'No',
        allowDataUsage: 'No',
        allowDataStorage: 'No',
        allowDataDeletion: 'No',
        allowDataModification: 'No',
        host: 'https://www.mysite.com',
        sitemap: 'https://www.mysite.com/sitemap,xml',
        license: 'your license and tearm of use',
        contact: 'me@geo.ai',
        documents: [
          {
            title: 'API Refernce',
            url: 'https://www.mysite.com/docs/api-refernce'
          },
          {
            title: 'Frequently Asked Questions',
            url: 'https://www.mysite.com/docs/faq'
          }
        ],
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
          {
            userAgent: 'Anthropic',
            disallow: ['/premium/', '/drafts/']
          },
          
        ]
      },
      outputDir: cwd,
      filename: 'llms.txt'
    };
    
    let configLoaded = false;
    
    // Try to load TypeScript config first
    if (await fs.pathExists(tsConfigPath)) {
      try {
        console.log('📄 TypeScript config detected');
        
        // Try to register ts-node if available
        let userConfig;
        try {
          require('ts-node/register');
          delete require.cache[require.resolve(tsConfigPath)];
          userConfig = require(tsConfigPath);
        } catch (tsNodeError) {
          // ts-node not available, suggest using JavaScript config
          console.warn('⚠️  ts-node not available. TypeScript config files require ts-node to be installed.');
          console.warn('💡 Please either:');
          console.warn('   1. Install ts-node: npm install -D ts-node');
          console.warn('   2. Use llms-txt.config.js instead of llms-txt.config.ts');
          throw new Error('TypeScript config requires ts-node');
        }
        
        config = { ...config, ...userConfig };
        console.log('📄 Using configuration from llms-txt.config.ts');
        configLoaded = true;
      } catch (error) {
        console.warn('⚠️  Error loading TypeScript config:', error.message);
        if (error.message.includes('ts-node')) {
          console.log('📄 Falling back to default settings...');
        }
      }
    }
    // Try JavaScript config
    else if (await fs.pathExists(jsConfigPath)) {
      try {
        console.log('📄 JavaScript config detected');
        delete require.cache[require.resolve(jsConfigPath)];
        const userConfig = require(jsConfigPath);
        config = { ...config, ...userConfig };
        console.log('📄 Using configuration from llms-txt.config.js');
        configLoaded = true;
      } catch (error) {
        console.warn('⚠️  Error loading config file:', error.message);
      }
    }
    
    if (!configLoaded) {
      console.log('📄 No config file found, using default settings');
      console.log('💡 Create llms-txt.config.js or llms-txt.config.ts to customize your settings');
    }
    
    // Generate content
    console.log('📄 Generating content...');
    const content = generateContent(config.geoData);
    console.log(content);
    const outputPath = path.join(config.outputDir, config.filename);
    console.log('📍 Output path:', outputPath);
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, content, 'utf8');
    
    console.log(`✅ ${config.filename} generated successfully!`);
    console.log(`📍 Location: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function generateContent(geoData) {
  return `# LLMs.txt for GEO

## Geographic Information
Location: ${geoData.location || 'Not specified'}
Coordinates: ${geoData.coordinates || 'Not specified'}
Country: ${geoData.country || 'Not specified'}
Region: ${geoData.region || 'Not specified'}
Timezone: ${geoData.timezone || 'Not specified'}

## Generated Information
Generated at: ${new Date().toISOString()}
Generator: llms-txt-generator-geo-ai

## Additional Data
${geoData.additionalInfo || 'No additional information provided'}
Request-Attribution: ${geoData.requestAttribution || 'Not specified'}
Allow-Training: ${geoData.allowTraining || 'No'}
Allow-Data-Collection: ${geoData.allowDataCollection || 'No'}
Allow-Data-Sharing: ${geoData.allowDataSharing || 'No'}
Allow-Data-Usage: ${geoData.allowDataUsage || 'No'}
Allow-Data-Storage: ${geoData.allowDataStorage || 'No'}
Allow-Data-Deletion: ${geoData.allowDataDeletion || 'No'}
Allow-Data-Modification: ${geoData.allowDataModification || 'No'}

# Contact
Contact: ${geoData.contact || 'me@geo.ai'}

# Host
Host: ${geoData.host || 'Not specified'}

# Sitemap
Sitemap: ${geoData.sitemap || 'Not specified'}
# License and Terms of Use
> ${geoData.license || 'Not specified'}

## user-agent rules
${geoData.userAgentRules.map((rule) => `User-agent: ${rule.userAgent}\n${rule.disallow.map((path) => `Disallow: ${path}`).join('\n')}`).join('\n\n')}
---
This file was automatically generated for GEO purposes.
`;
}

runCLI();