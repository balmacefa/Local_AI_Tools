import { IpcMain } from "electron";
import { AnalysisResult, Folder, ProjectAnalysis } from "electron/common_types";
import { Project, SourceFile, SyntaxKind } from "ts-morph";


export class TS_Project_Analyzer {
    private project: Project;
    private tsConfigPath: string;

    constructor(tsConfigPath: string) {
        this.tsConfigPath = tsConfigPath;
        this.project = new Project({
            tsConfigFilePath: this.tsConfigPath
        });
    }

    private analyzeFile(sourceFile: SourceFile): AnalysisResult {
        const filePath = sourceFile.getFilePath();
        const statements = sourceFile.getStatements();

        // Initialize counters
        let documentedCount = 0;
        let totalCount = 0;

        statements.forEach(statement => {

            // Narrowing down the statement type to those which can have JSDoc comments
            if (statement.isKind(SyntaxKind.FunctionDeclaration) ||
                statement.isKind(SyntaxKind.ClassDeclaration) ||
                statement.isKind(SyntaxKind.InterfaceDeclaration) ||
                statement.isKind(SyntaxKind.VariableStatement)) {

                // Increment the total statements count
                totalCount++;

                const jsDocs = statement.getJsDocs();
                if (jsDocs.length > 0) {
                    documentedCount++;
                }
            }
        });

        const coverage = (documentedCount / totalCount) * 100;

        return {
            filePath,
            coverage: coverage.toFixed(2) + '%',
            documentedCount,
            totalCount
        };
    }


    public analyzeProject(): ProjectAnalysis {
        const sourceFiles = this.project.getSourceFiles();
        const analysisResults = sourceFiles.map(this.analyzeFile);

        const totalDocumentedStatements = analysisResults.reduce((sum, file) => sum + file.documentedCount, 0);
        const totalStatements = analysisResults.reduce((sum, file) => sum + file.totalCount, 0);
        const totalCoverage = (totalDocumentedStatements / totalStatements) * 100;

        return {
            files: analysisResults,
            totalCoverage: totalCoverage.toFixed(2) + '%'
        };
    }
}



export const Setup_ipc_main__TS_Project_Analyzer = (ipcMain: IpcMain) => {

    ipcMain.handle('TS_Analyze_project', async (event, folder) => {
        try {
            const _foler = folder as Folder;
            const analyzer = new TS_Project_Analyzer(_foler.pathTsConfig);
            const analysisResults: ProjectAnalysis = analyzer.analyzeProject();
            return analysisResults;
        } catch (error) {
            console.error('Failed to analyze project:', error);
            throw error; // rethrow the error to the renderer process
        }
    });

}
// See main/index.ts
// See vite-env.d.ts
// See preload/index.ts