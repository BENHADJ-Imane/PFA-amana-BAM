import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      Conçu &amp; développé par la Digital Factory B.A.M - Version 3.1 © Barid
      Al Maghrib - {year}
    </footer>
  );
}

export default Footer;