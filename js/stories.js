document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("before-after-stories-container");
    if (!container) return;

    const lang = document.documentElement.lang || "en";
    const isRoot = lang === "en";
    const xmlPath = isRoot ? "xml/mascotes.xml" : "../xml/mascotes.xml";
    const imgPrefix = isRoot ? "assets/img/" : "../assets/img/";

    const textTemplates = {
        en: {
            before: "Before",
            after: "After",
            stories: {
                "adopted-1": {
                    title: "Bimba: From a fearful corner to forest trail leader",
                    before: "Bimba arrived at Nous Colls trembling at every sudden noise, diagnosed with severe abandonment anxiety.",
                    after: (owner, city) => `After gentle walks through the woods with our volunteers, she found her confidence. Today she lives in ${city} with ${owner}, leading weekend mountain hikes.`
                },
                "adopted-2": {
                    title: "Nina: A peaceful second chance at age nine",
                    before: "When her previous guardian could no longer care for her, Nina felt disoriented and stopped eating during her first days in the cattery.",
                    after: (owner, city) => `${owner} fell in love with her calm gaze during an open house day. Now Nina rules the sofa in ${city} with soft purrs every evening.`
                },
                "adopted-3": {
                    title: "Bruc: Growing up strong after a rough start",
                    before: "Rescued near a rural road when he was barely a month old, Bruc needed nutritional recovery and patient care.",
                    after: (owner, city) => `Adopted by ${owner} in ${city}, he now spends his days exploring the garden and playing non-stop.`
                }
            }
        },
        ca: {
            before: "Abans",
            after: "Després",
            stories: {
                "adopted-1": {
                    title: "Bimba: D'un racó tímid a liderar rutes pel bosc",
                    before: "La Bimba va arribar a Nous Colls tremolant davant qualsevol soroll sobtat, diagnosticada amb ansietat per abandonament.",
                    after: (owner, city) => `Amb passejades pacients pel bosc amb els voluntaris, va recuperar la confiança. Avui viu a ${city} amb l'${owner} i encapçala les seves excursions de cap de setmana.`
                },
                "adopted-2": {
                    title: "Nina: Una segona oportunitat tranquil·la als nou anys",
                    before: "Quan la seva anterior cuidadora ja no se'n va poder fer càrrec, la Nina es va sentir desorientada i va deixar de menjar els primers dies a la gatera.",
                    after: (owner, city) => `La ${owner} es va enamorar de la seva mirada dolça en una jornada de portes obertes. Ara la Nina és la reina del sofà a ${city}.`
                },
                "adopted-3": {
                    title: "Bruc: Créixer fort després d'un inici difícil",
                    before: "Rescatat prop d'un camí rural amb tot just un mes de vida, en Bruc va necessitar recuperació nutricional i molta cura.",
                    after: (owner, city) => `Adoptat per en ${owner} a ${city}, ara passa els dies explorant el jardí i jugant sense parar.`
                }
            }
        },
        es: {
            before: "Antes",
            after: "Después",
            stories: {
                "adopted-1": {
                    title: "Bimba: De un rincón tímido a liderar rutas por el bosque",
                    before: "Bimba llegó a Nous Colls temblando ante cualquier ruido repentino, diagnosticada con ansiedad por abandono.",
                    after: (owner, city) => `Con paseos pacientes por el bosque junto a los voluntarios, recuperó la confianza. Hoy vive en ${city} con ${owner}, encabezando sus excursiones de fin de semana.`
                },
                "adopted-2": {
                    title: "Nina: Una segunda oportunidad tranquila a los nueve años",
                    before: "Cuando su anterior cuidadora ya no pudo hacerse cargo de ella, Nina se sintió desorientada y dejó de comer sus primeros días en la gatera.",
                    after: (owner, city) => `${owner} se enamoró de su mirada dulce en una jornada de puertas abiertas. Ahora Nina es la reina del sofá en ${city}.`
                },
                "adopted-3": {
                    title: "Bruc: Crecer fuerte tras un comienzo difícil",
                    before: "Rescatado cerca de un camino rural con apenas un mes de vida, Bruc necesitó recuperación nutricional y muchos cuidados.",
                    after: (owner, city) => `Adoptado por ${owner} en ${city}, ahora pasa los días explorando el jardín y jugando sin parar.`
                }
            }
        }
    };

    const currentLangData = textTemplates[lang] || textTemplates.en;

    try {
        const res = await fetch(xmlPath);
        if (!res.ok) throw new Error("Error cargando mascotes.xml");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(await res.text(), "application/xml");
        const adoptedPets = xmlDoc.querySelectorAll('mascota[id-mascota^="adopted-"]');

        adoptedPets.forEach((pet, index) => {
            const id = pet.getAttribute("id-mascota");
            const name = pet.querySelector("nom-mascota")?.textContent || "";
            const photo = pet.querySelector("foto-mascota")?.textContent || "";
            const ownerName = pet.querySelector("propietari-mascota > nom-propietari")?.textContent || "";
            const address = pet.querySelector("propietari-mascota > adreca")?.textContent || "";
            const city = address.split(",").pop()?.trim() || "";

            const article = document.getElementById(`before-after-story-${index + 1}`);
            const copy = currentLangData.stories[id];

            if (article && copy) {
                article.innerHTML = `
                    <img src="${imgPrefix}${photo}" alt="${name}" class="story-image">
                    <h3>${copy.title}</h3>
                    <p><strong>${currentLangData.before}:</strong> ${copy.before}</p>
                    <p><strong>${currentLangData.after}:</strong> ${copy.after(ownerName, city)}</p>
                `;
            }
        });
    } catch (error) {
        console.error("Error cargando historias desde XML:", error);
    }
});