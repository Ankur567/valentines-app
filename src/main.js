
function showToast() {
    const toastContainer = document.getElementById("toast-container");

    // Create toast element
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = "hiii hello";

    // Append to container
    toastContainer.appendChild(toast);

    // Remove toast after 3.5 seconds
    setTimeout(() => {
        toast.remove();
    }, 3500);
}
