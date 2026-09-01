import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "Flawless Study Helper" });
});

app.post("/study", (req, res) => {
  const { question, mode } = req.body || {};

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "A question is required." });
  }

  // Placeholder response. We will connect your AI provider here next.
  if (mode === "hint") {
    return res.json({
      hint: "Backend connected! The AI hint system will be connected in the next step."
    });
  }

  return res.json({
    explanation: "Backend connected! The AI explanation system will be connected in the next step."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Flawless backend running on port ${PORT}`);
});
