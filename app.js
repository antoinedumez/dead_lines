// Tableau contenant les informations sur les différentes deadlines
const deadlines = [
    { title: 'TITRE Résumé de dossier', date: '2023-08-04' },
    { title: 'TITRE Dossier professionnel + Dossier projet', date: '2023-08-28' },
    { title: 'TITRE Passage', date: '2023-09-04' },
    { title: 'Site vitrine', date: '2023-04-30' },
    { title: 'Site devis', date: '2023-07-01' },
];
deadlines.sort((a, b) => {
    const dateA = new Date(a.date);
    const remainingTimeA = calculateTimeRemaining(dateA);
    const dateB = new Date(b.date);
    const remainingTimeB = calculateTimeRemaining(dateB);

    return remainingTimeA.days - remainingTimeB.days;
});
// Sélectionnez l'élément parent où vous voulez insérer les divs
const deadlinesContainer = document.querySelector('#deadlines-container');
// Parcourir le tableau et créer les divs
deadlines.forEach((deadline) => {
    const targetDate = new Date(deadline.date);
    const remainingTime = calculateTimeRemaining(targetDate);
    const deadlineDiv = createDeadlineDiv(deadline.title, remainingTime);
    deadlinesContainer.appendChild(deadlineDiv);
});
// Calculer le nombre de jours restants
function calculateTimeRemaining(targetDate) {
    const currentDate = new Date();
    const remainingTimeMs = targetDate - currentDate;
    // Calculer le nombre de jours
    const daysRemaining = Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24));
    // Calculer le nombre de semaines
    const weeksRemaining = Math.floor(daysRemaining / 7);
    // Calculer le nombre de mois
    const monthsRemaining = Math.floor((currentDate.getMonth() - targetDate.getMonth() + 12 * (currentDate.getFullYear() - targetDate.getFullYear())) * -1);

    return {
        days: daysRemaining,
        weeks: weeksRemaining,
        months: monthsRemaining,
    };
}
// Fonction pour créer une div avec les informations fournies
function createDeadlineDiv(title, remainingTime) {
    const bootstrapClass = getBootstrapClassForRemainingDays(remainingTime.days);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="h-100 p-3 m-5 bg-body-tertiary border rounded-3 d-flex flex-column" >
        <h2 class="ms-3 mb-3 text-primary ${bootstrapClass}">${title}</h2>
        <div class="d-flex flex-column flex-md-row gap-3 gap-md-5 justify-content-between mt-3 mx-5">
            <div class="d-flex flex-column align-items-center">
                <h6>Nombre de jours restants</h6>
                <p>${remainingTime.days}</p>   
            </div>
            <div class="d-flex flex-column align-items-center">
                <h6>Nombre de semaines restants</h6>
                <p>${remainingTime.weeks}</p>
            </div>
            <div class="d-flex flex-column align-items-center">
                <h6>Nombre de mois restants</h6>
                <p>${remainingTime.months}</p>
            </div>
        </div>
    </div>
  `;
    return div;
}
function getBootstrapClassForRemainingDays(days) {
    if (days <= 14) {
        return 'text-danger';
    } else if (days <= 31) {
        return 'text-warning';
    } else if (days <= 60) {
        return 'text-primary';
    } else {
        return 'text-success';
    }
}