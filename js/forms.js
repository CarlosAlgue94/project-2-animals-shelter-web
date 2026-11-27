document.addEventListener("DOMContentLoaded", () => {
    // 1. Autocompletar el animal elegido desde la URL (?animal=...)
    const params = new URLSearchParams(window.location.search);
    const animalName = params.get("animal");
    const animalInput = document.getElementById("liked-animal");

    if (animalName && animalInput) {
        animalInput.value = animalName;
    }

    // 2. Mensaje de confirmación al enviar cuestionario de adopción o voluntariado
    const lang = document.documentElement.lang || "en";
    const messages = {
        en: {
            adoptionTitle: "Thank you for taking the first step!",
            adoptionBody: (name) => `We have received your adoption questionnaire, ${name}. Our team will review your answers carefully and contact you within 48 hours to arrange a visit.`,
            volunteerTitle: "Welcome to the Nous Colls family!",
            volunteerBody: (name) => `Thank you for offering your time, ${name}. We have received your volunteer application and will get in touch soon to coordinate your welcome session.`
        },
        ca: {
            adoptionTitle: "Gràcies per fer el primer pas!",
            adoptionBody: (name) => `Hem rebut el teu qüestionari d'adopció, ${name}. El nostre equip revisarà les teves respostes amb cura i es posarà en contacte amb tu en menys de 48 hores.`,
            volunteerTitle: "Benvingut/da a la família de Nous Colls!",
            volunteerBody: (name) => `Gràcies per oferir el teu temps, ${name}. Hem rebut la teva sol·licitud de voluntariat i aviat ens posarem en contacte amb tu per coordinar la benvinguda.`
        },
        es: {
            adoptionTitle: "¡Gracias por dar el primer paso!",
            adoptionBody: (name) => `Hemos recibido tu cuestionario de adopción, ${name}. Nuestro equipo revisará tus respuestas con cariño y se pondrá en contacto contigo en menos de 48 horas.`,
            volunteerTitle: "¡Bienvenido/a a la familia de Nous Colls!",
            volunteerBody: (name) => `Gracias por ofrecer tu tiempo, ${name}. Hemos recibido tu solicitud de voluntariado y pronto nos pondremos en contacto contigo para coordinar la bienvenida.`
        }
    };

    const copy = messages[lang] || messages.en;
    const adoptionForm = document.getElementById("adoption-form");
    const volunteerForm = document.getElementById("volunteer-form");

    const handleFormSubmit = (form, title, bodyFn, nameInputId) => {
        if (!form) return;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const userName = document.getElementById(nameInputId)?.value.trim() || "";

            const feedbackBox = document.createElement("div");
            feedbackBox.className = "form-success-message";
            feedbackBox.setAttribute("role", "status");
            feedbackBox.innerHTML = `
                <h3>${title}</h3>
                <p>${bodyFn(userName)}</p>
            `;

            form.replaceWith(feedbackBox);
            feedbackBox.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    };

    handleFormSubmit(adoptionForm, copy.adoptionTitle, copy.adoptionBody, "name");
    handleFormSubmit(volunteerForm, copy.volunteerTitle, copy.volunteerBody, "volunteer-name");
});