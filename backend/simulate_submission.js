import { prisma } from './lib/prisma.js';
import { runFullPipeline } from './services/pipelineService.js';

const run = async () => {
    // Get an existing user
    const user = await prisma.user.findFirst();
    if (!user) return console.log("No users found");

    console.log("Simulating PASTED_CODE in JavaScript");
    const newReview = await prisma.review.create({
        data: {
            userId: user.id,
            title: "Simulated Review",
            submissionType: "PASTED_CODE",
            language: "javascript",
            status: "PENDING",
            codeFiles: {
                create: [
                    {
                        fileName: "pasted_snippet.js",
                        extension: ".js",
                        language: "javascript",
                        content: "var x = 1;\nconsole.log(x);",
                        size: 25
                    },
                    {
                        fileName: "hello.py",
                        extension: ".py",
                        language: "python",
                        content: "def hello():\n  print('world')",
                        size: 29
                    }
                ]
            }
        },
        include: { codeFiles: true }
    });

    await runFullPipeline(newReview.id);
};

run().catch(console.error);
