import { runStaticAnalysis } from './services/eslintService.js';
import { analyzeComplexity } from './services/complexityService.js';

const test = async () => {
  const codeFiles = [
    {
      fileName: 'pasted_snippet.txt',
      extension: '.txt',
      language: 'javascript',
      content: 'var x = 1;\nconsole.log(x);',
    },
    {
      fileName: 'app.js',
      extension: '.js',
      language: 'javascript',
      content: 'function test() { return 1; }',
    }
  ];

  console.log('Running static analysis...');
  const res = await runStaticAnalysis(codeFiles);
  console.log('Static Result:', JSON.stringify(res, null, 2));
  
  console.log('Running complexity...');
  const comp = analyzeComplexity(codeFiles);
  console.log('Complexity Result:', JSON.stringify(comp, null, 2));
};

test().catch(console.error);
