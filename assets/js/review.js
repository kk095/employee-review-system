function starClick(e) {
  // function will run when click on stars
  let starId = parseInt(e.target.getAttribute("id"));
  document.querySelector("#star").value = starId;
  for (let i = 1; i <= starId; i++) {
    let ele = document.getElementById(i);
    ele.classList.remove("far");
    ele.classList.add("fas");
    ele.classList.add("star_class");
  }
  for (let i = starId + 1; i <= 5; i++) {
    let ele = document.getElementById(i);
    ele.classList.add("far");
    ele.classList.remove("fas");
    ele.classList.remove("star_class");
  }
  console.log(document.querySelector("#star").value);
}
