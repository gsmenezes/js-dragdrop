//target apresenta o item que foi clicado - currentTarget apresenta o item que possui o evento
let areas = {
  a: null,
  b: null,
  c: null,
};

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

document.querySelectorAll(".area").forEach((area) => {
  area.addEventListener("dragover", dragOver);
  area.addEventListener("dragleave", dragLeave);
  area.addEventListener("drop", drop);
});

document
  .querySelector(".neutralArea")
  .addEventListener("dragover", dragOverNeutral);
document
  .querySelector(".neutralArea")
  .addEventListener("dragleave", dragLeaveNeutral);
document.querySelector(".neutralArea").addEventListener("drop", dropNeutral);

function dragStart(e) {
  e.currentTarget.classList.add("dragging");
}

function dragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

function dragOver(e) {
  if (e.currentTarget.querySelector(".item") === null) {
    e.preventDefault();
    e.currentTarget.classList.add("hover");
  }
}

function dragLeave(e) {
  e.currentTarget.classList.remove("hover");
}

function drop(e) {
  e.currentTarget.classList.remove("hover");

  if (e.currentTarget.querySelector(".item") === null) {
    //item só entra na area se não houver mais nenhum
    let dragItem = document.querySelector(".item.dragging");
    e.currentTarget.appendChild(dragItem); // adicione dentro do elemento mais um item
    updateAreas();
  }
}

function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add("hover");
}

function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove("hover");
}

function dropNeutral(e) {
  e.currentTarget.classList.remove("hover");
  let dragItem = document.querySelector(".item.dragging");
  e.currentTarget.appendChild(dragItem);
  updateAreas();
}

function updateAreas() {
  document.querySelectorAll(".area").forEach((area) => {
    let name = area.getAttribute("data-name");
    if (area.querySelector(".item") !== null) {
      areas[name] = area.querySelector(".item").innerHTML; //preencho meu objeto com o conteúdo do item
    } else {
      areas[name] = null;
    }
  });

  if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
    document.querySelector(".areas").classList.add("correct");
  } else {
    document.querySelector(".areas").classList.remove("correct");
  }
}
