import { appURL } from "@/config/url";
import { Top } from "@/components/pages/Top";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appURL.top} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
