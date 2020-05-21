import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import styled from "styled-components";
import validateRegister from "../../validations/ValidateRegister";
import "../../css/registerUser.css";

const ErrorsForm = styled.span`
  color: red;
  text-align: center;
  font-size: 0.7em;
  font-family: "Muli", sans-serif;
`;

const RegisterUser = (props) => {
  return (
    <section className="section-register">
      <article className="presentation-uniarts">
        <h1>Un collectif d'artises francophones...</h1>

        <p>
          UniArts est un collectif ayant pour but de mettre en avant divers
          artistes francophones meritent plus de visibilités, UniArtsts
          présentera chacun des artistes qui souhaitent rejoindre le collectif.
        </p>

        <p>
          Car oui...Libre à vous de le rejoindre comme bon vous semble. Il vous
          sera aussi possible de présenter vos projets, indiquer les liens où on
          peut découvrir vos travaux, suivre votre activité !
        </p>
      </article>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          pseudo: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={validateRegister}
        onSubmit={(values) => {
          console.log("hello");
          fetch(`http://localhost:5000/user/register`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
          })
            .then((res) => {
              switch (res.status) {
                case 200:
                  console.log(res);
                  props.history.push("/LoginUser");
                  break;

                default:
                  break;
              }
              return res.json();
            })
            .catch((errors) => {
              console.log(errors);
            });

          console.log(values);
        }}
      >
        {(props) => {
          const {
            values,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit} className="form-register">
              <h2>REGISTER</h2>

              <label>
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                />
              </label>
              {errors.email && <ErrorsForm>{errors.email}</ErrorsForm>}

              <label>
                Nom:
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </label>
              {errors.lastName && <ErrorsForm>{errors.lastName}</ErrorsForm>}

              <label>
                Prénom:
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </label>
              <span className="errors-register-form">
                {errors.firstName && (
                  <ErrorsForm>{errors.firstName}</ErrorsForm>
                )}
              </span>

              <label>
                Pseudo:
                <input
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  placeholder="Enter your pseudo"
                  value={values.pseudo}
                  onChange={handleChange}
                />
              </label>
              <span className="errors-register-form">
                {errors.pseudo && <ErrorsForm>{errors.pseudo}</ErrorsForm>}
              </span>

              <label>
                Password:
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
              </label>

              {errors.password && <ErrorsForm>{errors.password}</ErrorsForm>}

              <label>
                Password confirm:
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Confirm your password"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && (
                  <ErrorsForm>{errors.password2}</ErrorsForm>
                )}
              </label>

              <button
                className="button-register"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>

              <div>
                <Link to="/loginUser">
                  <p>Vous avez déjà un compte ?</p>
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </section>
  );
};

export default withRouter(RegisterUser);
