const textArea = document.getElementById("editor")
const clearBtn = document.getElementById("clear")


function saveText() {
    let text = textArea.value
    localStorage.setItem("savedText", text)
}

function loadText() {
    const savedText = localStorage.getItem("savedText")
    if (savedText) {
      textArea.value = savedText;
    }
  }

loadText()

textArea.onkeyup = () => {
    saveText()
}

clearBtn.onclick = () => {
    textArea.value = ''
    saveText()
}
