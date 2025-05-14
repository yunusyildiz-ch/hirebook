import { SessionsClient } from "@google-cloud/dialogflow";
import express from "express";
import cors from "cors";
import functions from "firebase-functions";

const app = express();
app.use(cors({ origin: true }));  // Tüm kaynaklara izin ver
app.use(express.json());

// Ortam değişkenini kullanıyoruz
const projectId = functions.config().project.id;
const sessionId = "qatip-session";
const languageCode = "en";

// Anahtar dosyasını belirtiyoruz
const client = new SessionsClient({
  keyFilename: "./config/dialogflow-key.json",
});

app.post("/api/dialogflow", async (req, res) => {
  const { message } = req.body;
  const sessionPath = client.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  try {
    const responses = await client.detectIntent(request);
    const result = responses[0].queryResult;
    console.log("Dialogflow response:", result);
    res.json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error("Error during Dialogflow request:", error);
    res.status(500).json({ error: "Dialogflow error" });
  }
});

export const dialogflowAPI = functions.https.onRequest(app);




