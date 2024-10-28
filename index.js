// Get elements from the DOM
const open = document.getElementById("open");
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");
const afterPromptResponse = document.getElementById("openai-response");

// Ask the chat API anything using text
open.addEventListener("click", async () => {
  try {
    console.log("here");
    const askChatAPI = async () => {
      const promptText = document.getElementById("openai-prompt").value;

      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: promptText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }''

      const data = await response.json();
      afterPromptResponse.innerText = data.response;

      console.log(afterPromptResponse.innerText);
    };
    await askChatAPI();
    modal_container.classList.add("show");
  } catch (error) {
    const message = error?.message ?? "Something went wrong";
    console.warn(message);
    alert(message);
  }
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});
