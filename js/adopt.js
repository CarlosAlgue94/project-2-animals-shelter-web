document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("adopt-animals-container");
    const filterSelect = document.getElementById("animal-filter");

    if (!container) return;

    const lang = document.documentElement.lang || "en";
    const isRoot = lang === "en";
    const xmlPath = isRoot ? "xml/mascotes.xml" : "../xml/mascotes.xml";
    const imgPrefix = isRoot ? "assets/img/" : "../assets/img/";
    const currentYear = 2026;

    const labels = {
        en: { species: "Species", dog: "Dog", cat: "Cat", sex: "Sex", male: "Male", female: "Female", age: "Age", under1: "Under 1 year", year1: "1 year", years: "years", weight: "Weight", color: "Color", ask: "Ask about" },
        ca: { species: "Espècie", dog: "Gos", cat: "Gat", sex: "Sexe", male: "Mascle", female: "Femella", age: "Edat", under1: "Menys d'1 any", year1: "1 any", years: "anys", weight: "Pes", color: "Color", ask: "Pregunta per" },
        es: { species: "Especie", dog: "Perro", cat: "Gato", sex: "Sexo", male: "Macho", female: "Hembra", age: "Edad", under1: "Menos de 1 año", year1: "1 año", years: "años", weight: "Peso", color: "Color", ask: "Pregunta por" }
    }[lang] || {};

    try {
        const res = await fetch(xmlPath);
        if (!res.ok) throw new Error("Error cargando mascotes.xml");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(await res.text(), "application/xml");
        const mascotes = xmlDoc.querySelectorAll("mascota");

        mascotes.forEach((m) => {
            const id = m.getAttribute("id-mascota");
            const sexe = m.getAttribute("sexe");
            const nom = m.querySelector("nom-mascota")?.textContent || "";
            const foto = m.querySelector("foto-mascota")?.textContent || "";
            const pes = m.querySelector("pes-mascota")?.textContent || "";
            const color = m.querySelector("color-mascota")?.textContent || "";
            const birthDate = m.querySelector("data-naixement")?.textContent || "2026";

            const speciesCode = foto.includes("_cat") ? "cat" : "dog";
            const age = currentYear - parseInt(birthDate.slice(0, 4), 10);
            const ageGroup = age >= 7 ? "senior" : age === 0 ? "young" : "adult";

            const ageText = age === 0 ? labels.under1 : age === 1 ? `1 ${labels.year1.split(" ")[1] || "year"}` : `${age} ${labels.years}`;

            const article = document.createElement("article");
            article.className = "animal-card";
            article.id = id;
            article.dataset.species = speciesCode;
            article.dataset.age = ageGroup;

            article.innerHTML = `
                <img src="${imgPrefix}${foto}" alt="${nom}" class="animal-image">
                <h3>${nom}</h3>
                <ul>
                    <li><strong>${labels.species}: </strong>${speciesCode === "cat" ? labels.cat : labels.dog}</li>
                    <li><strong>${labels.sex}: </strong>${sexe === "mascle" ? labels.male : labels.female}</li>
                    <li><strong>${labels.age}: </strong>${ageText}</li>
                    <li><strong>${labels.weight}: </strong>${pes} kg</li>
                    <li><strong>${labels.color}: </strong>${color}</li>
                </ul>
                <a href="adoption-questionnaire.html?animal=${encodeURIComponent(nom)}" class="cta-button">${labels.ask} ${nom}</a>
            `;

            container.appendChild(article);
        });
    } catch (error) {
        console.error("Error cargando mascotas:", error);
    }

    if (filterSelect) {
        filterSelect.addEventListener("change", (event) => {
            const filter = event.target.value;
            const cards = container.querySelectorAll(".animal-card");

            cards.forEach((card) => {
                const show =
                    filter === "all" ||
                    card.dataset.species === filter ||
                    card.dataset.age === filter;
                card.hidden = !show;
            });
        });
    }
});