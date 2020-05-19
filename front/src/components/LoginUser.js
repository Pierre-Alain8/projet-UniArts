import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "../css/loginUser.css";
import decode from "jwt-decode";

const LoginUser = (props) => {
  // Les states
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Les méthodes
  const handleChange = (event) => {
    // l'évenement permettant de ciblier les valeurs des inputs
    const { name, value } = event.target;
    setValues({ ...values, [name]: value }, console.log(name));
    // récupération des valeurs de manières indépendantes
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = values;

    fetch(`http://localhost:5000/user/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError("Veuillez entrez un password valide");
        } else {
          console.log(res);
        }

        if (res.status === 200) {
          res.json().then((res) => {
            localStorage.setItem("token", res.token);

            let getToken = localStorage.getItem("token");
            const decoded = decode(getToken);
            console.log(decoded);

            if (decoded.role === "Artiste") {
              props.history.push("/OfficeUser");
              console.log(res.token);
            } else if (decoded.role === "Admin") {
              props.history.push("/ArtsUnit/power/admin/auth");
              console.log(res.token);
            }
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="section-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <label>
          Email :
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
        </label>

        <label>
          password :
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
        </label>

        <button className="button-login" type="submit">
          Connexion
        </button>

        <div>
          <Link to="/RegisterUser">
            <p>Vous n'avez pas de compte ?</p>
          </Link>
        </div>

        <div className="errorLogin">
          <p>{error}</p>
        </div>
      </form>
    </section>
  );
};

export default withRouter(LoginUser);
