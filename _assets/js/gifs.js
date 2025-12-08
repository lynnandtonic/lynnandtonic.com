function toggleGif(event, gifUrl) {
  event.preventDefault();
  const img = event.target.querySelector('img') ?? event.target;
  if (img.src !== gifUrl) {
    img.src = gifUrl;
  }
}

const copyButtonLabel = "Copy markdown";

// you can use a class selector instead if you, or the syntax highlighting library adds one to the 'pre'. 
let blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("button");
    button.innerText = copyButtonLabel;
    button.addEventListener("click", copyCode);
    block.appendChild(button);
  }
});

async function copyCode(event) {
  const button = event.srcElement;
  const pre = button.parentElement;
  let code = pre.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  
  button.innerText = "Copied!";
  
  setTimeout(()=> {
    button.innerText = copyButtonLabel;
  },2000)
}
