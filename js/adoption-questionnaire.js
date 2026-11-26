document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const animalName = params.get("animal");
    const animalInput = document.getElementById("liked-animal");

    if (animalName && animalInput) {
        animalInput.value = animalName;
    }
});