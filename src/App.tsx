import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VSLPage } from "@/pages/VSLPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { ThankYouPage } from "@/pages/ThankYouPage";
import { WorkbookPage } from "@/pages/WorkbookPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VSLPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/workbook" element={<WorkbookPage />} />
      </Routes>
    </BrowserRouter>
  );
}
