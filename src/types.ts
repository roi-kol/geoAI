import * as fs from "fs-extra";
import * as path from "path";

export interface UserAgentRule {
  userAgent: string;
  disallow: string[];
}
export interface Document {
  title: string;
  url: string;

}

export interface GeoData {
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

export interface LLMSTxtConfig {
  geoData: GeoData;
  outputDir?: string;
  filename?: string;
}

export interface LLMSTxtOptions {
  outputDir?: string;
  filename?: string;
  geoData?: GeoData;
}

export interface GenerationResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}

export class LLMSTxtGenerator {
  private options: Required<LLMSTxtOptions>;

  constructor(options: LLMSTxtOptions = {}) {
    this.options = {
      outputDir: options.outputDir || process.cwd(),
      filename: options.filename || "llms.txt",
      geoData: options.geoData || {},
    };
  }


  private generateContent(): string {
    const { geoData } = this.options;

    // Generate User-agent rules section
    let userAgentSection = "";
    if (geoData.userAgentRules && geoData.userAgentRules.length > 0) {
      userAgentSection =
        geoData.userAgentRules
          .map((rule) => {
            const disallowLines = rule.disallow
              .map((path) => `Disallow: ${path}`)
              .join("\n");
            return `User-agent: ${rule.userAgent}\n${disallowLines}`;
          })
          .join("\n\n") + "\n\n";
    }

    const content = `# LLMs.txt for GEO

## user-agent rules
${userAgentSection}

## Geographic Information
Location: ${geoData.location || "Not specified"}
Coordinates: ${geoData.coordinates || "Not specified"}
Country: ${geoData.country || "Not specified"}
Region: ${geoData.region || "Not specified"}
Timezone: ${geoData.timezone || "Not specified"}

#request-attribution
Request-Attribution: ${geoData.requestAttribution || "yes"}

# contact details for license or questions
Contact: ${geoData.contact || "webmaster@yourdomain.com"}

# additional information
${geoData.additionalInfo || "No additional information provided"}

# allow training for ai models
Allow-Training: ${geoData.allowTraining || "No"}

# allow data collection
Allow-Data-Collection: ${geoData.allowDataCollection || "No"}

# allow data sharing
Allow-Data-Sharing: ${geoData.allowDataSharing || "No"}

# allow data usage
Allow-Data-Usage: ${geoData.allowDataUsage || "No"}

# allow data storage
Allow-Data-Storage: ${geoData.allowDataStorage || "No"}

# allow data deletion
Allow-Data-Deletion: ${geoData.allowDataDeletion || "No"}

# allow data modification
Allow-Data-Modification: ${geoData.allowDataModification || "No"}

# documents
${geoData.documents?.map((document) => `[${document.title}](${document.url})`).join("\n")}

#host
Host: ${geoData.host || "Not specified"}
#sitemap
Sitemap: ${geoData.sitemap || "Not specified"}
#license and terms of use
License: ${geoData.license || "Not specified"}

## Generated Information
Generated at: ${new Date().toISOString()}
Generator: llms-txt-generator-geo-ai
`;

    return content;
  }

  public async generate(): Promise<string> {
    try {
      const content = this.generateContent();

      const outputPath = path.join(
        this.options.outputDir,
        this.options.filename
      );

      await fs.ensureDir(path.dirname(outputPath));
      await fs.writeFile(outputPath, content, "utf8");

      console.log(
        `✅ ${this.options.filename} generated successfully at: ${outputPath}`
      );
      return outputPath;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Error generating llms.txt:", errorMessage);
      throw error;
    }
  }

  public updateGeoData(geoData: Partial<GeoData>): void {
    this.options.geoData = { ...this.options.geoData, ...geoData };
  }

  public getConfig(): Required<LLMSTxtOptions> {
    return { ...this.options };
  }
}

// Default export for easier importing
export default LLMSTxtGenerator;

// Utility function for quick generation
export async function generateLLMSTxt(
  options?: LLMSTxtOptions
): Promise<string> {
  const generator = new LLMSTxtGenerator(options);
  return generator.generate();
}
