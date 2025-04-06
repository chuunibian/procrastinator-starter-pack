import { useState } from "react";
import FileUploader from "./components/FileUploader";
import TopNavBar from "./components/TopNavBar";
import WOEHeader from "./components/WOEHeader";

function App() {
  const [geminiResponse, setGeminiResponse] = useState<any>(null);

  return (
    <div className="pt-20 flex flex-col min-h-screen">
      <TopNavBar/>
      <WOEHeader/>
      <FileUploader onResponseReceived={setGeminiResponse}/>

    </div>
  );
}

export default App;



{/* <div className="pt-20 flex flex-col min-h-screen">
<TopNavBar/>
<main className="flex-grow">
<WOEHeader/>
<p>what</p>

</main>
</div> */}



// return (
//   <div className="flex min-h-screen bg-gray-50">
//     {/* Left column */}
//     <div className="w-1/2 p-8 flex flex-col justify-center">
//       <div className="bg-white shadow-lg rounded-2xl p-8">
//         <WOEHeader />
//         <FileUploadComponent />
//         {/* Add more input stuff here */}
//       </div>
//     </div>

//     {/* Right column */}
//     <div className="w-1/2 p-8 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full h-full flex items-center justify-center text-gray-700">
//         {/* Output response goes here */}
//         Output will appear here.
//       </div>
//     </div>
//   </div>
// );