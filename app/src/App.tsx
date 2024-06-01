import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Top } from "@/components/pages/Top";
import { appURL } from "@/config/url";

function App() {
  return (
    <BrowserRouter basename={appURL.base}>
      <Routes>
        <Route path={appURL.top} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
