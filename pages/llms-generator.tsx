import { useState } from 'react';
import { LLMSGenerator } from 'llms-txt-generator-geo-ai';
import { llmsTxtConfig } from '../llms-txt.config';

export default function LLMSGeneratorPage() {
  const [message, setMessage] = useState<string>('');

  const handleGenerate = (outputPath: string) => {
    setMessage(`✅ LLMS.txt generated successfully at: ${outputPath}`);
    // The file will be accessible at /llms.txt since it's in the public directory
    console.log('File available at: /llms.txt');
  };

  const handleError = (error: Error) => {
    setMessage(`❌ Error: ${error.message}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>LLMS.txt Generator for Israel</h1>
      
      <LLMSGenerator
        initialGeoData={llmsTxtConfig.geoData}
        onGenerate={handleGenerate}
        onError={handleError}
      />
      
      {message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '4px' 
        }}>
          {message}
        </div>
      )}
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>How to view your generated file:</h3>
        <ol>
          <li>Generate the LLMS.txt file using the form above</li>
          <li>Visit <a href="/llms.txt" target="_blank">/llms.txt</a> to view the generated file</li>
          <li>Or run the script: <code>npm run generate-llms</code></li>
        </ol>
      </div>
    </div>
  );
}