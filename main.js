
  document.addEventListener("DOMContentLoaded", () => {
   const btn = document.getElementById("back");
   if (btn) {
     btn.addEventListener("click", () => {
       window.location.href = "index.html";
     });
   } else {
     console.error("Button with ID 'back-btn' not found.");
   }
 });


