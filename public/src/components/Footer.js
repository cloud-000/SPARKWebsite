class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {

    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host { display: block; }

        footer {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          padding: 48px 24px 32px;
          color: #64748b;
        }

        .footer-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-container h3 {
          margin: 0 0 16px 0;
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #0f172a;
        }

        .footer-container p {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #64748b;
        }

        .footer-container ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-container li {
          margin-bottom: 10px;
        }

        .footer-container a {
          color: #475569;
          text-decoration: none;
          font-size: 0.9375rem;
          transition: color 150ms ease;
        }

        .footer-container a:hover {
          color: #4f46e5;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .footer-bottom b {
          color: #475569;
          font-weight: 600;
        }

        .footer-bottom div {
          margin-top: 4px;
          font-size: 0.8125rem;
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      </style>

      <footer>
        <div class="footer-container">
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/pages/index.html">Home</a></li>
              <li><a href="/pages/aboutUs/mission.html">Mission</a></li>
              <li><a href="/pages/aboutUs/chapters.html">Chapters</a></li>
              <li><a href="/pages/aboutUs/statistics.html">Our Statistics</a></li>
              <li><a href="/pages/volunteer.html">Volunteer</a></li>
              <li><a href="/pages/contactUs.html">Contact Us</a></li>
              <li><a href="https://github.com/StormBlackthorn/SPARKWebsite" target="_blank" rel="noopener noreferrer">GitHub Repo</a></li>
            </ul>
          </div>

          <div>
            <h3>Connect</h3>
            <ul>
              <li><a href="https://www.instagram.com/spark.stem/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h3>About SPARK</h3>
            <p>Inspiring STEM creativity through projects, innovation, and collaboration. Empowering the next generation of problem solvers and innovators.</p>
          </div>
        </div>

        <div class="footer-bottom">
          <b>© 2026 SPARK STEM Club</b> · All Rights Reserved
          <div>Website designed by Yo-cheng Liao and Videep Mannava</div>
        </div>
      </footer>
    `;

  }
}

customElements.define('footer-component', Footer);
