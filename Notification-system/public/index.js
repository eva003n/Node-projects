const subscribeBtn = document.getElementById("sub-btn");
const unsubscribeBtn = document.getElementById("unsub-btn");

if ("serviceWorker" in navigator && "PushManager" in window) {
  {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((serviceworkerregistration) => {
        console.info("Service worker registered successfully");
        console.info(serviceworkerregistration);
      })
      .catch((err) => {
        console.error(`Error registering service worker ${err.message}`);
        console.error(err);

        subscribeBtn.disabled = false;
      });
  }
} else {
  console.error("Browser does not support service workers or push messages.");
}

subscribeBtn.addEventListener("click", subscribeButtonHandler);
unsubscribeBtn.addEventListener("click", unsubscribeButtonHandler);

subscribeBtn.disabled = true;
const result = await Notification.requestPermission()
if(result === "denied") {
    console.error("The user explicitly denied the permission request.");
    return;
}
if(result === "granted") {
      console.info('The user accepted the permission request.');

}