//Variables
const button = document.getElementById("button");
const app = document.getElementById("root");
const input = document.getElementById("buscar");
const spinner = document.getElementById("spinner");
const pagina = document.getElementById("pagina");
let palabra = "";

//Eventos
button.addEventListener("click", pulsacion);

input.addEventListener("keyup", (e) => {
  palabra = e.target.value;
  console.log(palabra);
});

document.body.addEventListener("click", verMas);

//Funciones

async function pulsacion(e) {
  app.innerHTML = "";
  e.preventDefault();
  if (!palabra.trim()) {
    return;
  }
  if (palabra.includes(" ")) {
    palabra.replace(" ", "%20");
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
    recorrer(data);
  }, 1000);
}

async function verMas(e) {
  e.preventDefault();
  if (e.target.id === "verMas") {
    pagina.innerHTML = "";
    const titleArt = e.target.previousElementSibling.previousElementSibling.id;
    if (titleArt.includes(" ")) {
      titleArt.replace(" ", "_");
    }
    window.scrollTo(0, app.clientHeight);
    spinner.style.display = "block";
    window.scrollTo();

    const res = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/html/${titleArt}`
    );
    const text = await res.text();
    spinner.style.display = "none";
    pagina.innerHTML = text;
  }
}

const recorrer = (data) => {
  data.forEach((art) => {
    const div = document.createElement("div");
    const titulo = document.createElement("h2");
    titulo.id = art.title;
    const parrafo = document.createElement("p");
    const buttonVer = document.createElement("button");
    buttonVer.innerText = "Ver mas";
    buttonVer.id = "verMas";
    div.classList = "animate__animated animate__backInLeft";
    titulo.innerHTML = art.title;
    parrafo.innerHTML = art.snippet;
    div.appendChild(buttonVer);
    div.insertBefore(parrafo, buttonVer);
    div.insertBefore(titulo, parrafo);
    app.appendChild(div);
  });
};
