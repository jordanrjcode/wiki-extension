const button = document.getElementById("button");
button.addEventListener("click", pulsacion);
const app = document.getElementById("root");
const input = document.getElementById("buscar");
const spinner = document.getElementById("spinner");
let palabra = "";

input.addEventListener("keyup", (e) => {
  palabra = e.target.value;
  console.log(palabra);
});

async function pulsacion(e) {
  app.innerHTML = "";

  e.preventDefault();
  if (!palabra.trim()) {
    return;
  }

  if (palabra.includes(" ")) {
    palabra.replace(" ", "_");
  }
  button.classList.add("animate__heartBeat");

  spinner.style.display = "block";
  setTimeout(async () => {
    const uri = `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${palabra}`;
    const api = await fetch(uri);
    const res = await api.json();
    button.classList.remove("animate__heartBeat");
    spinner.style.display = "none";
    const data = res.query.search;
    data.forEach((art) => {
      const div = document.createElement("div");
      const titulo = document.createElement("h2");
      const parrafo = document.createElement("p");
      div.classList = "animate__animated animate__backInLeft";

      titulo.innerHTML = art.title;
      parrafo.innerHTML = art.snippet;
      div.appendChild(parrafo);
      div.insertBefore(titulo, parrafo);
      app.appendChild(div);
    });
  }, 2000);
}

console.log("hola");
