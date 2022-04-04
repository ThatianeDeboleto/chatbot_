document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;



  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "O que eh")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "Como se chama");

  if (compare(prompts, replies, text)) { 

    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "Seja bem vindo(a)!"
  } else if (text.match(/(corona|covid|virus)/gi)) {

    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {

    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;

        break;
      }
    }
    if (replyFound) {

      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "usuario";
  userDiv.className = "usuario responsavel";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot responsivo";
  botText.innerText = "Digitando...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;


  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product)
  }, 2000
  )

}