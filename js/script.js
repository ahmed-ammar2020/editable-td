"use strict";
const table = document.querySelector("table");
const tds = document.querySelectorAll("td");

table.addEventListener("click", function (event) {
  let td = event.target.closest("td");
  if (!td) return;
  // disable events on all td except for the clicked one
  for (let tableTd of tds) {
    if (tableTd == td) continue;
    tableTd.style.pointerEvents = "none";
  }
  // creating the form to appear over the clicked td => each td has its own form
  let form = document.createElement("form");
  let textArea = document.createElement("textarea");
  let div = document.createElement("div");
  let okBtn = document.createElement("button");
  let cancelBtn = document.createElement("button");
  okBtn.append("OK");
  cancelBtn.append("Cancel");
  div.append(okBtn, cancelBtn);
  textArea.classList.add("textarea");
  form.classList.add("form");
  form.append(textArea, div);
  document.body.append(form);
  // getting td document-relative coords and styles
  let tdCoords = td.getBoundingClientRect();
  tdCoords = {
    ...tdCoords,
    top: tdCoords.top + window.scrollY,
    bottom: tdCoords.bottom + window.scrollY,
    left: tdCoords.left + window.scrollX,
    right: tdCoords.right + window.scrollX,
  };
  let tdStyles = getComputedStyle(td);
  // positioning the created form over the clicked td
  form.style.top = tdCoords.top + "px";
  form.style.left = tdCoords.left + "px";
  // width and height of the textarea
  textArea.style.width = tdStyles.width;
  textArea.style.height = tdStyles.height;
  // focusing the textarea
  textArea.focus();
  // putting the html of clicked td on the textarea value
  textArea.value = td.innerHTML;
  // handling clicking on ok and cancel buttons after editing the textarea value
  okBtn.addEventListener("click", function (event) {
    event.preventDefault();
    td.innerHTML = textArea.value;
    form.remove();
    for (let tableTd of tds) {
      tableTd.style.pointerEvents = "";
    }
  });
  cancelBtn.addEventListener("click", function (event) {
    event.preventDefault();
    form.remove();
    for (let tableTd of tds) {
      tableTd.style.pointerEvents = "";
    }
  });
});
