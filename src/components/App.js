import react, { Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Add Lazy Loading //
const DetailPage = react.lazy(() => import("./DetailPage"));
const HomePage = react.lazy(() => import("./HomePage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/weather-details/:cityName" element={<DetailPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
