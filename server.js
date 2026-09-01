import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "Flawless Study Helper",
    message: "Backend is online."
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "Flawless Study Helper" });
});

function makeStudyResponse(question, mode) {
  const q = question.trim();

  if (mode === "explain") {
    return {
      explanation:
        `Let's work through this as a study problem:\n\n` +
        `1. Identify what the question is asking.\n` +
        `2. Look for the important facts or numbers in the question.\n` +
        `3. Choose the rule, formula, or idea that applies.\n` +
        `4. Work through the steps and check that the result makes sense.\n\n` +
        `Your question was: "${q}"\n\n` +
        `If you want a more specific explanation, make sure the full question and any answer choices are selected.`
    };
  }

  return {
    hint:
      `💡 Hint: Start by identifying exactly what the question is asking you to find. ` +
      `Then use the key information in the question and the rule or concept from your lesson. ` +
      `Don't worry about getting it immediately—work through it one step at a time.\n\n` +
      `Question: "${q}"`
  };
}

app.post("/study", (req, res) => {
  const { question, mode = "hint" } = req.body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "A question is required." });
  }

  if (question.length > 5000) {
    return res.status(400).json({ error: "Please select a shorter question." });
  }

  const result = makeStudyResponse(question, mode);
  return res.json(result);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Flawless backend running on port ${PORT}`);
});
