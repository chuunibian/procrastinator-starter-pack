import { GeminiResponse } from "../types";

interface Props {
  response: GeminiResponse | null;
}

function PredictionDisplay(prop: Props) {

  if(prop.response !== null){
    return (<ShowResults response={prop.response}/>);
  }else{
    return (<NoResults/>);
  }
}

function NoResults() {
  return(
    <div className="bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-3xl shadow-xl p-6 border border-indigo-900 h-full min-h-96">
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold font-mono text-indigo-800 ml-3">Exam Topic Predictions</h2>
    </div>

    <div className="mb-4">
      <p className="text-gray-600 font-mono italic">No Data Uploaded...</p>
    </div>
  </div>
  );
}

function ShowResults(prop: Props) {
  // Placeholder data to simulate Gemini API response
  const placeholderTerms = [
    { term: "Photosynthesis", confidence: 0.94 },
    { term: "Cellular Respiration", confidence: 0.89 },
    { term: "Mitochondria", confidence: 0.85 },
    { term: "DNA Replication", confidence: 0.82 },
    { term: "Protein Synthesis", confidence: 0.78 },
    { term: "Meiosis", confidence: 0.76 },
    { term: "Genetic Inheritance", confidence: 0.73 },
    { term: "Ecosystem Dynamics", confidence: 0.69 }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-3xl shadow-xl p-6 border border-indigo-900 h-full min-h-96">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold font-mono text-indigo-800 ml-3">Exam Topic Predictions</h2>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 font-mono italic">Parsed out important topics from uploaded slide text:</p>
      </div>

      <div className="space-y-3">
        {prop.response?.gemini_response.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100 flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium font-mono text-gray-800">{index + 1}.</span>
              <span className="ml-3 font-semibold font-mono text-indigo-700">{item}</span>
            </div>
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${1 * 100}%` }}></div>
              </div>
              <span className="text-sm text-gray-600">{Math.round(1 * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-indigo-50 rounded-xl p-4 border border-indigo-200">
        <h3 className="text-lg font-semibold font-mono text-indigo-700 mb-2">Study Recommendation</h3>
        <p className="text-gray-700 font-mono">
          Listed above are various terms that are deemed as the most important
        </p>
      </div>
    </div>
  );
}

export default PredictionDisplay;