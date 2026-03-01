import React, { useState, useCallback, ChangeEvent } from 'react';
import { LLMSTxtGenerator, GeoData } from '../types';

interface LLMSGeneratorProps {
  initialGeoData?: GeoData;
  onGenerate?: (outputPath: string) => void;
  onError?: (error: Error) => void;
}

export const LLMSGenerator: React.FC<LLMSGeneratorProps> = ({
  initialGeoData = {},
  onGenerate,
  onError
}) => {
  const [geoData, setGeoData] = useState<GeoData>(initialGeoData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof GeoData, value: string) => {
    setGeoData((prev: GeoData) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleInputChangeEvent = useCallback((field: keyof GeoData, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleInputChange(field, (e.target as HTMLInputElement | HTMLTextAreaElement).value);
  }, [handleInputChange]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const generator = new LLMSTxtGenerator({
        geoData,
        filename: 'llms.txt'
      });
      
      const outputPath = await generator.generate();
      setLastGenerated(outputPath);
      onGenerate?.(outputPath);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      onError?.(err);
    } finally {
      setIsGenerating(false);
    }
  }, [geoData, onGenerate, onError]);

  return (
    <div className="llms-generator">
      <h2>LLMS.txt Generator for GEO</h2>
      
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={geoData.location || ''}
          onChange={(e) => handleInputChangeEvent('location', e)}
          placeholder="e.g., San Francisco, CA"
        />
      </div>

      <div className="form-group">
        <label htmlFor="coordinates">Coordinates:</label>
        <input
          id="coordinates"
          type="text"
          value={geoData.coordinates || ''}
          onChange={(e) => handleInputChangeEvent('coordinates', e)}
          placeholder="e.g., 37.7749, -122.4194"
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          type="text"
          value={geoData.country || ''}
          onChange={(e) => handleInputChangeEvent('country', e)}
          placeholder="e.g., United States"
        />
      </div>

      <div className="form-group">
        <label htmlFor="region">Region:</label>
        <input
          id="region"
          type="text"
          value={geoData.region || ''}
          onChange={(e) => handleInputChangeEvent('region', e)}
          placeholder="e.g., California"
        />
      </div>

      <div className="form-group">
        <label htmlFor="timezone">Timezone:</label>
        <input
          id="timezone"
          type="text"
          value={geoData.timezone || ''}
          onChange={(e) => handleInputChangeEvent('timezone', e)}
          placeholder="e.g., America/Los_Angeles"
        />
      </div>

      <div className="form-group">
        <label htmlFor="additionalInfo">Additional Info:</label>
        <textarea
          id="additionalInfo"
          value={geoData.additionalInfo || ''}
          onChange={(e) => handleInputChangeEvent('additionalInfo', e)}
          placeholder="Any additional geographic information"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="requestAttribution">Request Attribution:</label>
        <input
          id="requestAttribution"
          type="text"
          value={geoData.requestAttribution || ''}
          onChange={(e) => handleInputChangeEvent('requestAttribution', e)}
          placeholder="e.g., GEO AI"
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowTraining">Allow Training:</label>
        <input
          id="allowTraining"
          type="text"
          value={geoData.allowTraining || ''}
          placeholder="e.g., No"
          onChange={(e) => handleInputChangeEvent('allowTraining', e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowDataCollection">Allow Data Collection:</label>
        <input
          id="allowDataCollection"
          type="text"
          value={geoData.requestAttribution || ''}
          onChange={(e) => handleInputChangeEvent('allowDataCollection', e)}
          placeholder="e.g., No"
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowDataSharing">Allow Data Sharing:</label>
        <input
          id="allowDataSharing"
          type="text"
          value={geoData.allowDataSharing || ''}
          placeholder="e.g., No"
          onChange={(e) => handleInputChangeEvent('allowDataSharing', e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowDataUsage">Allow Data Usage:</label>
        <input
          id="allowDataUsage"
          type="text"
          value={geoData.allowDataUsage || ''}
          placeholder="e.g., No"
          onChange={(e) => handleInputChangeEvent('allowDataUsage', e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowDataStorage">Allow Data Storage:</label>
        <input
          id="allowDataStorage"
          type="text"
          value={geoData.allowDataStorage || ''}
          placeholder="e.g., No"
          onChange={(e) => handleInputChangeEvent('allowDataStorage', e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowDataDeletion">Allow Data Deletion:</label>
        <input
          id="allowDataDeletion"
          type="text"
          value={geoData.allowDataDeletion || ''}
          placeholder="e.g., No"
          onChange={(e) => handleInputChangeEvent('allowDataDeletion', e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="allowDataModification">Allow Data Modification:</label>
        <input
          id="allowDataModification"
          type="text"
          value={geoData.allowDataModification || ''}
          placeholder="e.g., No"
          onChange={(e) => handleInputChangeEvent('allowDataModification', e)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact">Contact:</label>
        <input
          id="contact"
          type="text"
          value={geoData.contact || ''}
          onChange={(e) => handleInputChangeEvent('contact', e)}
          placeholder="e.g., support@geo.ai"
        />
      </div>

      <div className="form-group">
        <label htmlFor="host">Host:</label>
        <input
          id="host"
          type="text"
          value={geoData.host || ''}
          onChange={(e) => handleInputChangeEvent('host', e)}
          placeholder="e.g., https://www.mysite.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="sitemap">Sitemap:</label>
        <input
          id="sitemap"
          type="text"
          value={geoData.sitemap || ''}
          onChange={(e) => handleInputChangeEvent('sitemap', e)}
          placeholder="e.g., https://www.mysite.com/sitemap,xml"
        />
      </div>
      <div className="form-group">
        <label htmlFor="license">License:</label>
        <input
          id="license"
          type="text"
          value={geoData.license || ''}
          onChange={(e) => handleInputChangeEvent('license', e)}
          placeholder="e.g., your license and tearm of use"
        />
      </div>
      <div className="form-group">
        <label htmlFor="language">Language:</label>
        <input
          id="language"
          type="text"
          value={geoData.language || ''}
          onChange={(e) => handleInputChangeEvent('language', e)}
          placeholder="e.g., en"
        />
      </div>
      <div className="form-group">
        <label htmlFor="documents">Documents:</label>
        <textarea
          id="documents"
          value={geoData.documents?.map((document) => `[${document.title}](${document.url})`).join('\n') || ''}
          onChange={(e) => handleInputChangeEvent('documents', e)}
          placeholder="e.g., [API Refernce](https://www.mysite.com/docs/api-refernce)\n[Frequently Asked Questions](https://www.mysite.com/docs/faq)"
          rows={3}
        />
      </div>
      <button 
        onClick={handleGenerate} 
        disabled={isGenerating}
        className="generate-button"
      >
        {isGenerating ? 'Generating...' : 'Generate LLMS.txt'}
      </button>

      {lastGenerated && (
        <div className="success-message">
          ✅ Generated successfully at: {lastGenerated}
        </div>
      )}

      <style>{`
        .llms-generator {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        input, textarea {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        .generate-button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .generate-button:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
        .success-message {
          margin-top: 15px;
          padding: 10px;
          background: #d4edda;
          color: #155724;
          border-radius: 4px;
          border: 1px solid #c3e6cb;
        }
      `}</style>
    </div>
  );
};