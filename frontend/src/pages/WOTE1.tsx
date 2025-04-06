import { useState } from "react";
import FileUploader from "../components/FileUploader";
import WOEHeader from "../components/WOEHeader";
import PredictionDisplay from "../components/PredictionDisplay";
import { GeminiResponse } from "../types";

function WOTE1() {
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);

  return (
    <div className="pt-20 flex flex-col min-h-screen">
      <div className="container mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-8 mt-3">
          <div className="lg:flex-shrink-0 lg:max-w-xl">
            <WOEHeader/>
            <FileUploader onResponseReceived={setGeminiResponse}/>
          </div>
          <div className="flex-grow mt-8 lg:mt-0">
            <PredictionDisplay response={geminiResponse}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WOTE1;
