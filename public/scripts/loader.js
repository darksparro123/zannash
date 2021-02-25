function loadspinner() {
    var element = document.querySelector(".main");
    const container = document.createElement("div");
    const tag = document.createElement("div");
    container.classList.add("loader-container");
    tag.classList.add("loader");
    element.appendChild(container);
    container.appendChild(tag);
}

function stopspinner() {
    const tag = document.querySelector(".loader-container");
    tag.remove();
}