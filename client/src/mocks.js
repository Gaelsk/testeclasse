const CATEGORIES = [
  "Toutes",
  "Science",
  "Anglais",
  "Mathématiques",
  "Français",
  "Philosophie",
  "Comptabilité",
  "Biologie",
  "Informatique"
];

const COURSES = [
  { title: "Anglais des affaires", description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Anglais", format: "Video" },
  {
    title: "Maîtriser les intégrales",
    description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Mathématiques",
    format: "PDF"
  },
  { title: "Apprenez les questions tag", description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Anglais", format: "Video" },
  {
    title: "Le présent simple de l'indicatif",
    description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Français",
    format: "Video"
  },
  { title: "If clauses pour les nuls", description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Anglais", format: "Audio" },
  { title: "Etudier l'organisme humain", description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "SVT", format: "PDF" },
  { title: "Le règne de Béhanzin", description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Hitoire", format: "PDF" },
  { title: "Maîtriser les atômes", description: "Comme son nom l'indique, un logiciel de présentation de diaporama a pour fonction principale de « présenter » du contenu multimédia. Autrement dit, il fait subir à des contenus en toutes formes des transformations de toutes sortes (mise en forme, gestion de l'affichage, etc.) en vue d'une utilisation spécifique. Vous ne présentez pas un diaporama en entreprise de la même manière que vous présentez un diaporama entre amis ! Présenter des contenus multimédia, ce n'est donc pas simplement les rendre jolies mais c'est leur créer une association pour les rendre utilisables", category: "Physique", format: "Video" }
];

export { CATEGORIES, COURSES };
