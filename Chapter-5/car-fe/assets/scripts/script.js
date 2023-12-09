const sidebarToggle = document.getElementById("sidebar-toggle");
sidebarToggle.addEventListener("click", () => {
  let toggleClick = document.getElementById("sidebar").classList.toggle("collapsed");
  let content = document.querySelector(".main");

  if (toggleClick) {
    content.style.transition = "all 0.35s ease-in-out";
    content.style.marginLeft = "70px";
  } else {
    content.style.transition = "all 0.35s ease-in";
    content.style.marginLeft = "0";
  }
});
