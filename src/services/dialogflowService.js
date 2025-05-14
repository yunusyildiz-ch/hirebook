export async function getDialogflowResponse(message) {
  try {
    const response = await fetch("https://us-central1-qatip-note-app.cloudfunctions.net/dialogflowAPI/api/dialogflow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get response from Dialogflow. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data from Dialogflow:", data);
    return data.reply || "Sorry, no response from the bot.";
  } catch (error) {
    console.error("Error fetching dialogflow response:", error);
    return "Connection error. Please try again.";
  }
}





