import express from "express";
import cors from "cors";

const app=express(), PORT=process.env.PORT||10000;
app.use(cors()); app.use(express.json({limit:"12mb"}));

app.get("/",(_q,r)=>r.json({ok:true,service:"Flawless Screen Study Helper"}));
app.get("/health",(_q,r)=>r.json({ok:true,service:"Flawless Screen Study Helper"}));

app.post("/study",(req,res)=>{
 const {mode,question,answer}=req.body||{};
 if(mode==="screen_help"){
   return res.json({result:
    "🧠 Screen Help\\n\\nI can help you work through the visible problem. Start by identifying what the question asks, list the information you are given, choose the rule/formula that fits, and work through one step at a time.\\n\\nFor a real AI explanation of the captured screen, connect an AI vision provider to this endpoint using a server-side API key."});
 }
 if(!question?.trim()) return res.status(400).json({error:"A question is required."});
 if(!answer?.trim()) return res.status(400).json({error:"Enter your answer so I can check your work."});
 return res.json({result:
  "⚠️ I can't reliably verify this answer from text alone. Compare each step with the rule/example from your lesson and check that your final answer directly answers the question."});
});
app.listen(PORT,"0.0.0.0",()=>console.log(`Flawless backend running on port ${PORT}`));
