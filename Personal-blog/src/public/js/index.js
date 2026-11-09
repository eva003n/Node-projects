const logOutBtn = document.querySelector(".log-out");
 const form = document.querySelector(".form");
 const textBox = document.querySelector("textarea");
 const sendBtn = document.querySelector(".send-btn");

 form?.addEventListener("submit", (e) => {
   e.preventDefault();

   console.log(form);
 });

 sendBtn?.addEventListener("click", () => {
   fetch("/api/v1/comment", {
     method: "POST",
     body: {
       articleId: form.dataset.articleId,
       content: textBox.textContent,
     },
   })
     .then((res) => res.json())
     .then((data) => alert(data.message))
     .catch((error) => alert(error.message));
 });

logOutBtn.addEventListener("click", () => {
    fetch("/api/v1/auth/sign-out", {
        method: "DELETE"
    })
})