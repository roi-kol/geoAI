# LLMs.txt Generator

A TypeScript/React npm package that automatically generates `llms.txt` files for GEO (Geographic) purposes with full type safety.

## Installation

```bash
npm install llms-txt-generator-geo-ai
```

## Usage

After installation, the package will automatically:

1. Create a `llms-txt.config.ts` (or `.js`) configuration file in your project
2. Add a script to your `package.json`
3. Provide full TypeScript support with type definitions

### Generate llms.txt file

```bash
npm run llms-txt-generator-geo-ai
```

### TypeScript Configuration

Edit the `llms-txt.config.ts` file in your project root:

```typescript
import { LLMSTxtConfig } from 'llms-txt-generator-geo-ai';

const config: LLMSTxtConfig = {
  geoData: {
    location: 'San Francisco, CA',
    coordinates: '37.7749, -122.4194',
    country: 'United States',
    region: 'California',
    timezone: 'America/Los_Angeles',
    additionalInfo: 'Silicon Valley tech hub'
    requestAttribution: 'Your Request Attribution',
    allowTraining: 'No',
    allowDataCollection: 'No',
    allowDataSharing: 'No',
    allowDataUsage: 'No',
    allowDataStorage: 'No',
    allowDataDeletion: 'No',
    allowDataModification: 'No',
    contact: 'me@geo.ai'
  },
  outputDir: './', // Output directory
  filename: 'llms.txt' // Output filename
};

export default config;
```

**Note:** TypeScript config files require `ts-node` to be installed. If you encounter errors, either:

1. Install ts-node: `npm install -D ts-node`
2. Use JavaScript config instead (`llms-txt.config.js`)

### JavaScript Configuration

For JavaScript projects, use `llms-txt.config.js`:

```javascript
module.exports = {
  geoData: {
    location: "San Francisco, CA",
    coordinates: "37.7749, -122.4194",
    country: "United States",
    region: "California",
    timezone: "America/Los_Angeles",
    additionalInfo: "Silicon Valley tech hub",
  },
  outputDir: "./",
  filename: "llms.txt",
};
```

### NextJs Configuration

For JavaScript projects, use `llms-txt.config.js`:

```javascript
module.exports = {
  geoData: {
    location: "Tel Aviv, Israel",
    coordinates: "32.0853, 34.7818",
    country: "Israel",
    region: "Tel Aviv District",
    timezone: "Asia/Jerusalem",
    additionalInfo: "This is a sample configuration for llms.txt ",
    requestAttribution: "No",
    allowTraining: "No",
    allowDataCollection: "No",
    allowDataSharing: "No",
    allowDataUsage: "No",
    allowDataStorage: "No",
    allowDataDeletion: "No",
    allowDataModification: "No",
    contact: "me@geo.ai",
    host: "https://www.mysite.com",
    license : "your license and tearm of use"
    sitemap: "https://www.mysite.com/sitemap,xml",
    documents:[
      {
        title:"API Refernce",
        url: "https://www.mysite.com/docs/api-refernce",
      }
      {
        title:"Frequently Asked Questions",
        url: "https://www.mysite.com/docs/faq",
      }
    ]
    userAgentRules: [
      {
        userAgent: "*",
        disallow: ["/premium/", "/drafts/"],
      },
      {
        userAgent: "Googlebot",
        disallow: ["/private/", "/admin/"],
      },
      {
        userAgent: "OpenAI",
        disallow: ["/private/"],
      },
    ],

  },
  outputDir: "./public",
  filename: "llms.txt",
};
```

### Programmatic Usage (TypeScript)

```typescript
import {
  LLMSTxtGenerator,
  GeoData,
  generateLLMSTxt,
} from "llms-txt-generator-geo-ai";

// Using the class
const generator = new LLMSTxtGenerator({
  geoData: {
    location: "New York, NY",
    coordinates: "40.7128, -74.0060",
    country: "United States",
    region: "New York",
    timezone: "America/New_York",
  },
});

await generator.generate();

// Using the utility function
await generateLLMSTxt({
  geoData: {
    location: "London, UK",
    coordinates: "51.5074, -0.1278",
    country: "United Kingdom",
    region: "England",
    timezone: "Europe/London",
  },
});
```

### React Component Usage

```tsx
import React from "react";
import { LLMSGenerator } from "llms-txt-generator-geo-ai/dist/components/LLMSGenerator";

function App() {
  const handleGenerate = (outputPath: string) => {
    console.log("Generated at:", outputPath);
  };

  const handleError = (error: Error) => {
    console.error("Generation failed:", error);
  };

  return (
    <LLMSGenerator
      initialGeoData={{
        location: "Tokyo, Japan",
        coordinates: "35.6762, 139.6503",
      }}
      onGenerate={handleGenerate}
      onError={handleError}
    />
  );
}
```

## TypeScript Types

```typescript
interface UserAgentRule {
  userAgent: string;
  disallow: string[];
}
export interface Document {
  title: string;
  url: string;

}

interface GeoData {
  location?: string;
  coordinates?: string;
  country?: string;
  region?: string;
  timezone?: string;
  additionalInfo?: string;
  requestAttribution?: string;
  allowTraining?: string;
  allowDataCollection?: string;
  allowDataSharing?: string;
  allowDataUsage?: string;
  allowDataStorage?: string;
  allowDataDeletion?: string;
  allowDataModification?: string;
  contact?: string;
  userAgentRules?: UserAgentRule[];
  host?: string;
  sitemap?: string;
  license?: string;
  documents?: Document[];
}

interface LLMSTxtOptions {
  outputDir?: string;
  filename?: string;
  geoData?: GeoData;
}

interface LLMSTxtConfig {
  geoData: GeoData;
  outputDir?: string;
  filename?: string;
}
```

## API Reference

### `LLMSTxtGenerator`

#### Constructor

```typescript
new LLMSTxtGenerator(options?: LLMSTxtOptions)
```

#### Methods

- `generate(): Promise<string>` - Generate the llms.txt file and return the output path
- `updateGeoData(geoData: Partial<GeoData>): void` - Update GEO data
- `getConfig(): Required<LLMSTxtOptions>` - Get current configuration

### Utility Functions

- `generateLLMSTxt(options?: LLMSTxtOptions): Promise<string>` - Quick generation function

## Build Scripts

If you're contributing to this package:

```bash
# Install dependencies
npm install 

# Build TypeScript
npm run generate-llms-txt
npm run build

# Watch mode during development AT http://localhost:3000/llms.txt
npm run dev

```

## Features

- ✅ Full TypeScript support with type definitions
- ✅ Automatic post-install setup
- ✅ Configurable GEO data with type safety
- ✅ CLI command support
- ✅ Programmatic API
- ✅ React component included
- ✅ Customizable output location
- ✅ JavaScript compatibility
- ✅ NextJS support

## Output Example

The generated `llms.txt` file will contain:

```
# LLMs.txt for GEO

## Geographic Information
Location: Tel Aviv, Israel
Coordinates: 32.0853, 34.7818
Country: Israel
Region: Tel Aviv District
Timezone: Asia/Jerusalem

## Generated Information
Generated at: 2025-08-05T10:29:02.028Z
Generator: llms-txt-generator-geo-ai

## Additional Data
This is a sample configuration for llms.txt
Request-Attribution: No
Allow-Training: No
Allow-Data-Collection: No
Allow-Data-Sharing: No
Allow-Data-Usage: No
Allow-Data-Storage: No
Allow-Data-Deletion: No
Allow-Data-Modification: No
Contact: me@geo.ai


## user-agent rules
User-agent: *
Disallow: /premium/
Disallow: /drafts/

User-agent: Googlebot
Disallow: /private/
Disallow: /admin/

User-agent: OpenAI
Disallow: /private/
---
This file was automatically generated for GEO purposes.
```

## License

MIT
