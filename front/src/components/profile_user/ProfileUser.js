import React from "react";
import { withRouter } from "react-router-dom";

const ProfileUser = () => {
  return (
    <section className="section-profile">
      <div className="avatar-contain">
        <img className="avatar" src="" alt="avatar" />
      </div>

      <article>
        <p> à propos de l'artiste</p>
      </article>
    </section>
  );
};

export default withRouter(ProfileUser);
