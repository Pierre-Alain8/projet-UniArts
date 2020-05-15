import * as Yup from "yup";

const validateRegister = () => {
  return Yup.object().shape({
    email: Yup.string().email().required("une adresse mail est requis"),
    lastName: Yup.string()
      .required("Un nom est requis")
      .min(2, "nom trop court")
      .max(50, "nom trop long"),
    firstName: Yup.string()
      .required("Un prénom est requis")
      .min(2, "prénom trop court")
      .max(50, "prénom trop long"),

    pseudo: Yup.string()
      .required("Un pseudo est requis")
      .min(2, "pseudo trop court")
      .max(15, "pseudo trop long"),

    password: Yup.string()
      .required("Un mot de passe est requis")
      .matches(
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        "Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères"
      ),

    password2: Yup.string()
      .oneOf([Yup.ref("password"), null])
      .required('Votre password ne correspond pas au précédent"'),
  });

  //   const errors = {};
  //   const regexPassword = new RegExp(
  //     /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[A-Za-z\d@$!%*#?&]{8,}$/
  //   );
  //   const regexEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/);

  //   if (!values.email) {
  //     errors.email = "une adresse mail est requis";
  //   } else if (!regexEmail.test(values.email)) {
  //     errors.email = "email invalide";
  //   }

  //   if (!values.lastName) {
  //     errors.lastName = "Un nom est requis";
  //   }

  //   if (!values.firstName) {
  //     errors.firstName = "Un prénom est requis";
  //   }

  //   if (!values.pseudo) {
  //     errors.pseudo = "Un pseudo est requis";
  //   }

  //   if (!values.password) {
  //     errors.password = "Un mot de passe est requis";
  //   } else if (!regexPassword.test(values.password)) {
  //     errors.password =
  //       "Votre password doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 caractère numérique et de plus de 8 caractères";
  //   }

  //   if (values.password !== values.password2) {
  //     errors.password2 = "Votre password ne correspond pas au précédent";
  //   }
  //   return errors;
};

export default validateRegister;
