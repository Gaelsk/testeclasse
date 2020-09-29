export default function(err) {
  switch (err) {
    case "Email is already taken.":
      return "Cet email est déjà utilsé";
    case "Please provide your email":
      return "Veuillez saisir votre adresse email";
    case "Please provide your password.":
      return "Veuillez saisir votre mot de passe";

    default:
      break;
  }
}
