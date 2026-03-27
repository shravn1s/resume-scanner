import { useState } from "react";
import axios from "axios";

export default function ResumeMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can only upload up to 4 PDF files.");
      return;
    }
    setSelectedFiles(files);
  };

  const handleMatch = async () => {
    if (!jobDescription || selectedFiles.length === 0) {
      alert("Please provide a job description and at least one resume.");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:8000/match", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.results) {
        setResults(response.data.results);
      } else {
        setResults([]);
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error matching resumes:", error);
      alert("Failed to match resumes.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-[#F3F3F3] text-[#2b2b2b] font-sans">
      <h1 className="text-4xl font-semibold mb-6 text-center">HireWise</h1>

      {/* Job Description */}
      <textarea
        className="w-full max-w-2xl block mx-auto p-4 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700 bg-[#F3F3F3]"
        placeholder="Paste the job description here..."
        rows={6}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* File Input */}
      <div className="flex justify-center mb-6">
        <label
          htmlFor="resumeUpload"
          className="cursor-pointer flex flex-col items-center rounded border border-gray-300 p-6 text-gray-900 shadow-sm hover:shadow-lg transition sm:p-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
          </svg>
          <span className="font-medium">Upload your file(s)</span>
          <span className="mt-2 text-sm text-gray-600">(Max 4 PDF files)</span>
          <input
            type="file"
            id="resumeUpload"
            multiple
            accept="application/pdf"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Match Button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={handleMatch}
          className="bg-[#2b2b2b] text-white px-6 py-2 rounded-md hover:bg-[#1a1a1a] transition"
        >
          Match Resumes
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center px-4">
          {results.map((res, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="radial-progress text-lg text-[#2b2b2b]"
                style={{
                  "--value": res.match_score,
                  "--size": "6rem",
                  "--thickness": "0.6rem",
                }}
                role="progressbar"
                aria-valuenow={res.match_score}
              >
                {res.match_score}%
              </div>
              <div className="mt-2 text-center text-sm font-medium">
                {res.filename}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
