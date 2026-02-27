"use client";
import Image from "next/image";
import "./about.css";
import "./competences.css";
import "./home.css";
import "./proj.css";
import "./contact.css";
import "./header.css";
import "./footer.css";
import React, { useEffect, useState } from "react";

export default function About() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Message envoyé ✅");
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Erreur ❌");
    }
  };

  // ✅ useEffect doit être ici, pas dans handleSubmit
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLSpanElement>(".bio .line");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          (entry.target as HTMLElement).style.animationPlayState = "running";
          }
        });
      },
      { threshold: 0.5 }
    );

    lines.forEach((line) => {
      line.style.animationPlayState = "paused";
      observer.observe(line);
    });

    return () => observer.disconnect();
  }, []);

  const skills = {
    web: ["HTML / CSS / JS", "Tailwind", "React Native", "PHP", "Figma", "Next.js"],
    Base_de_données: ["SQL", "MongoDB", "Merise"],
    programation: ["Python", "C", "JavaScript"],
    Autres: ["Github", "Cisco"],
  };

 const skillLevels: Record<string, string> = {
  "html-css-js": "85%",
  tailwind: "60%",
  "react-native": "70%",
  php: "50%",
  figma: "60%",
  "next-js": "80%",
  sql: "80%",
  mongodb: "50%",
  merise: "80%",
  python: "60%",
  c: "50%",
  javascript: "65%",
  github: "85%",
  cisco: "50%",
};


  const createId = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <div className="portfolio-container">
      {/* SECTION HOME */}
      <section id="home" className="home" aria-label="Présentation">
        <div className="hero-wrap">
          <div className="hero-left">
            <h1>
              <span className="accent">Frontend</span>
              <br />
              Developer.
            </h1>
            <p className="lead">
              Passionné par la création d'expériences web engageantes et conviviales grâce à un développement front-end innovant.
            </p>
          </div>

          <div className="hero-right">
            <h2 className="name">TOUKO SANAMA</h2>
          </div>
        </div>

        <div className="info">
          <article className="card">
            <h3>Design</h3>
            <p>
              Initiation au design d’interfaces avec Figma, création de maquettes simples et fonctionnelles.
              Je développe progressivement mes compétences en UI/UX afin d’améliorer l’expérience utilisateur.
            </p>
          </article>

          <article className="card">
            <h3>Développement web</h3>
            <p>
              Je conçois des sites modernes et responsives en HTML, CSS et JavaScript.
              J’intègre des maquettes Figma et j’explore les bases de React et des frameworks CSS
              pour améliorer l’expérience utilisateur.
            </p>
          </article>
        </div>
      </section>

      {/* SECTION ABOUT */}
      <section id="abt" className="abt">
        <h2>À propos de moi</h2>
        <div className="line-separator">
          <div className="bio">
            <span className="line">
              Étudiant en deuxième année de bachelor Coding & Digital Innovation, je consolide actuellement mes compétences en développement web (HTML, CSS, JavaScript) et en data science (Python, SQL, analyse de données).
            </span>

            <span className="line">
              J'ai déjà mené plusieurs projets académiques, notamment la création d'un site web responsive pour un atelier dans le cadre d'une bourse au projet.
            </span>

            <span className="line">
              Ces expériences m'ont permis de savoir travailler en respectant les exigences du client, mieux coopérer avec l'utilisation de GitHub comme outil de gestion de code et développer une capacité d'apprentissage rapide.
            </span>

            <span className="line">
              Je recherche un stage ou une mission afin d'appliquer ces compétences en conditions réelles et de continuer à progresser dans ces domaines.
            </span>
          </div>

          <div className="profile-pic">
            <Image
              src="/profile-pic.png"
              alt="Profile picture"
              width={400}
              height={400}
              className="rotate"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION COMPETENCES */}
      <section id="competences" className="competences">
        <h2>Compétences</h2>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, list]) => (
            <div className="box" key={category}>
              <h3>{category}</h3>

              {list.map((skill) => {
                const id = createId(skill);
                const level = skillLevels[id] || "50%";

                return (
                  <div className="skill" key={id} style={{ "--level": level } as any}>
                    <span className="label">{skill}</span>
                    <div className="bar">
                      <div className="fill">
                        <span className="percentage">{level}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION REALISATIONS */}
      <section id="realisations" className="realisations">
        <h2>Réalisations</h2>

        <div className="projects-grid">
          <div className="project-card">
            <video src="/secu.mp4" className="project-video" width={500} height={300} autoPlay loop muted playsInline />
            <h3>Sécurité web</h3>
            <p>
              Application web faite en PHP qui permet de gérer les articles d'un catalogue de films avec ajout d'un mot de passe sécurisé.
            </p>
            <a href="https://github.com/Touko74/securis-_un_site_web.git" target="_blank" rel="noopener noreferrer" className="github-link">
              Voir le repository
            </a>
          </div>

          <div className="project-card">
            <video src="/demo.mp4" className="project-video" width={500} height={300} autoPlay loop muted playsInline />
            <h3>memotech</h3>
            <p>
              Add-on Blender qui offre un menu avec tous les raccourcis clavier pour faciliter l'apprentissage du logiciel.
            </p>
            <a href="https://github.com/Touko74/memotech.git" target="_blank" rel="noopener noreferrer" className="github-link">
              Voir le repository
            </a>
          </div>

          <div className="project-card">
            <video src="/mood.mp4" className="project-video" width={500} height={300} autoPlay loop muted playsInline />
            <h3>Développement créatif</h3>
            <p>
              Un site web qui transmet différents moods à travers des animations et interactions créatives, conçu pour offrir une expérience immersive.
            </p>
            <a href="https://github.com/Touko74/Creativ_dev.git" target="_blank" rel="noopener noreferrer" className="github-link">
              Voir le repository
            </a>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT */}
     <section id="contact" className="contact">
  <div className="contact-container">
    <h2>Contact</h2>
    <p className="contact-subtitle">
Vous avez un projet, une opportunité de stage ou d'alternance ?
N'hésitez pas à me contacter via le formulaire ci-dessous.
Je suis toujours ouvert aux nouvelles collaborations et je vous répondrai rapidement.
    </p>

    <form onSubmit={handleSubmit} className="contact-form">
      <div className="input-group">
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <textarea
          name="message"
          placeholder="Votre message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="contact-btn">
        Envoyer le message
      </button>
    </form>
  </div>
</section>
    </div>
  );
}
