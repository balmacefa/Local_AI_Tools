import { useState } from "react";
import { AnalysisResult, Folder, ProjectAnalysis } from "../../common_types";

interface TS_AnalizerRenderResultsProps {
  folder: Folder;
}

export const TS_AnalizerRenderResults: React.FC<
  TS_AnalizerRenderResultsProps
> = ({ folder }) => {
  const [analysisResults, setAnalysisResults] =
    useState<ProjectAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeProject = async () => {
    try {
      setLoading(true);
      const results: ProjectAnalysis =
        await window.electronAPI.TS_Analyze_project(folder);
      setAnalysisResults(results);
    } catch (error) {
      console.error("Error fetching analysis results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ...other TypeScript specific UI... */}
      <button
        className="w-full mb-4 p-2 bg-green-500 text-white rounded"
        onClick={handleAnalyzeProject}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Project - File tree and JSDoc coverage"}
      </button>

      {analysisResults && (
        <>
          <h3>Analysis Results</h3>
          <p>Total Coverage: {analysisResults.totalCoverage}</p>
          <table className="w-full">
            <thead>
              <tr>
                <th>File Path</th>
                <th>Coverage</th>
                <th>Documented Count</th>
                <th>Total Count</th>
              </tr>
            </thead>
            <tbody>
              {analysisResults.files.map(
                (file: AnalysisResult, index: number) => (
                  <tr key={index}>
                    <td>{file.filePath}</td>
                    <td>{file.coverage}</td>
                    <td>{file.documentedCount}</td>
                    <td>{file.totalCount}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
