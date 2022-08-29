document.querySelectorAll(".load-image").forEach((item) => {
  item.addEventListener("click", (event) => {
    const href = event.target.getAttribute("href");
    event.preventDefault();
    const newImage = document.createElement("img");
    newImage.setAttribute("width", event.target.getAttribute("data-width"));
    newImage.setAttribute("height", event.target.getAttribute("data-height"));
    newImage.setAttribute("src", href);
    document.body.insertBefore(newImage, event.target);
    event.target.remove();
  });
});

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
