import { ESLint } from "eslint";
import js from "@eslint/js"; // <-- New import required for v9+

export const runStaticAnalysis = async (codeFiles) => {
    // Initialize ESLint with a base configuration
    // We use basic recommended rules so it works out of the box
    const eslint = new ESLint({
        overrideConfigFile: true, // Ignore any random config files in the project
        overrideConfig: [
            js.configs.recommended,
            {
                languageOptions: {
                    ecmaVersion: "latest",
                    sourceType: "module",
                }
            }
        ]
    });

    let rawOutput = [];
    let parsedFindings = [];
    let errorCount = 0;
    let warningCount = 0;

    for (const file of codeFiles) {
        // Only run ESLint on JavaScript/TypeScript files
        if (file.extension === '.js' || file.extension === '.ts' || file.language.toLowerCase() === 'javascript') {
            try {
                // Lint the text string directly from memory
                const results = await eslint.lintText(file.content, { filePath: file.fileName });
                rawOutput.push(...results);

                // Parse ESLint results into our Prisma Finding format
                for (const result of results) {
                    errorCount += result.errorCount;
                    warningCount += result.warningCount;

                    for (const message of result.messages) {
                        parsedFindings.push({
                            source: 'STATIC_ANALYSIS',
                            severity: message.severity === 2 ? 'HIGH' : 'MEDIUM', // ESLint 2=Error, 1=Warning
                            type: message.ruleId || 'Syntax Error',
                            title: `ESLint: ${message.ruleId || 'Parsing Error'}`,
                            description: message.message,
                            fileName: file.fileName,
                            lineNumber: message.line || null,
                        });
                    }
                }
            } catch (err) {
                console.error(`Failed to lint file ${file.fileName}:`, err);
            }
        }
    }

    return {
        summary: {
            totalFilesAnalyzed: codeFiles.length,
            errorCount,
            warningCount
        },
        rawOutput,
        findings: parsedFindings
    };
};