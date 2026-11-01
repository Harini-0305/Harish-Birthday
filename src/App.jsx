import { useEffect, useState } from "react";
import "./App.css";

const BIRTHDAY = new Date("2026-11-10T00:00:00");
const PASSCODE = "1003";

// Add your own photos inside public/photos/
// Add your own videos inside public/videos/
const memories = [
  {
    type: "image",
    src: "/photos/photo1.jpg",
    title: "Our Beautiful Memory 💗",
    caption: "That little moment with you means so much to me.",
    secondLine: "I wish I could live this memory again with you. 🥹",
  },
 {
  type: "image",
  src: "/photos/photo2.jpg",
  title: "Our Little Birthday Shopping Date 🛍️💗",
  caption: "One week before your birthday, we went shopping together.",
  secondLine: "Even a simple shopping day becomes a beautiful memory with you, Harish. ❤️",
},
 {
  type: "image",
  src: "/photos/photo3.jpg",
  title: "A Birthday Filled With Love ❤️🎂",
  caption: "November 10, 2025 — a beautiful day celebrating my favourite person.",
  secondLine: "Seeing you happy is one of my favourite feelings, Harish. ❤️",
},
  {
  type: "image",
  src: "/photos/photo4.jpg",
  title: "A Little Trip, A Lifetime of Memories 🕌❤️",
  caption: "Exploring the beautiful Taj Mahal together, laughing and enjoying every little moment.",
  secondLine: "The place was beautiful, but having you beside me made the day even more special, Harish. 💗",
},
{
  type: "image",
  src: "/photos/photo5.jpg",
  title: "Lost in the Mountains, Found in Your Love 🏔️❤️",
  caption: "Our Manali trip was filled with happiness, fun and unforgettable moments. ❄️",
  secondLine: "The snowy mountains were beautiful, but every moment with you was even more special. My favourite travel partner, Harish! ❤️",
},
{
  type: "image",
  src: "/photos/photo6.jpg",
  title: "15 Days Later, Back Together Again 🌊❤️",
  
  caption: "After 15 days, finally got to see you again!",
   date: "31-10-2026",
  secondLine: "The beach and every little moment with you made yesterday unforgettable, Harish. 🥹",
},
];

function getTimeLeft() {
  const distance = BIRTHDAY.getTime() - Date.now();

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function App() {
  const [introNumber, setIntroNumber] = useState(3);
  const [introFinished, setIntroFinished] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [letterOpen, setLetterOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const introTimer = setInterval(() => {
      setIntroNumber((current) => {
        if (current <= 1) {
          clearInterval(introTimer);
          setTimeout(() => setIntroFinished(true), 500);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(introTimer);
  }, []);

  function unlockSurprise(event) {
    event.preventDefault();

    if (passcode === PASSCODE) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Oops! Wrong passcode, my love. Try again 💗");
    }
  }

  return (
    <main className="website">
      {!introFinished ? (
        <section className="intro-screen">
          <div className="floating-heart">💗</div>
          <p className="eyebrow">A little surprise for my favourite person</p>
          <h1>{introNumber > 0 ? introNumber : "💋"}</h1>
          <p>Something special is waiting for you, Harish...</p>
        </section>
      ) : (
        <>
          <header className="hero">
            <div className="sparkle">✦　♡　✦</div>
            <p className="eyebrow">Made with all my love</p>
            <h1>Happy Birthday to My Favourite Person</h1>
            <p className="hero-names">Harini <span>♥</span> Harish</p>
            <p className="hero-text">
              A little website, a million feelings, and one very special person.
            </p>
            <a className="primary-button" href="#surprise">
              Open Your Surprise 💌
            </a>
            <div className="heart-decoration" aria-hidden="true">
              ♡　♥　♡　♥　♡
            </div>
          </header>

          <section className="countdown section-card">
            <p className="eyebrow">The special day is coming</p>
            <h2>Counting down to your birthday 🎂</h2>
            <div className="countdown-grid">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div className="count-box" key={unit}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{unit}</span>
                </div>
              ))}
            </div>
            <p className="small-note">November 10, 2026 · Your special day ❤️</p>
          </section>

          <section className="lock-section section-card" id="surprise">
            <div className="lock-icon">🔐</div>
            <p className="eyebrow">Only for you, Thangoo</p>
            <h2>Enter Our Secret Passcode</h2>
            <p>One little secret opens a whole lot of love. 💕</p>

            {!unlocked ? (
              <form className="passcode-form" onSubmit={unlockSurprise}>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="Enter secret passcode"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  aria-label="Secret passcode"
                  required
                />
                <button className="primary-button" type="submit">
                  Unlock My Love 💗
                </button>
                {error && <p className="error-message">{error}</p>}
              </form>
            ) : (
              <div className="unlocked-message">
                <div className="big-heart">💖</div>
                <h2>Happy Birthday, Harish!</h2>
                <p>Happy Birthday, my Thangoo. This little world is all for you!</p>
                <a className="primary-button" href="#memories">
                  Enter Our Memories 🌸
                </a>
              </div>
            )}
          </section>

          {unlocked && (
            <>
              <section className="section-card" id="memories">
                <p className="eyebrow">Our little world</p>
                <h2>Our Memories Together 📸</h2>
                <p className="section-intro">
                  Every photo, every video, every little moment — a piece of us.
                </p>

                <div className="memory-grid">
                  {memories.map((memory, index) => (
                    <article className="memory-card" key={memory.src}>
                      {memory.type === "video" ? (
                        <video
                          className="memory-media"
                          src={memory.src}
                          controls
                          preload="metadata"
                          playsInline
                        >
                          Your browser does not support this video.
                        </video>
                      ) : (
                        <img
                          className="memory-media"
                          src={memory.src}
                          alt={memory.title}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <div className="memory-caption">
                        <span className="memory-number">
                          MEMORY {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3>{memory.title}</h3>
                        <p>{memory.caption}</p>
                        <p>{memory.secondLine}</p>
                      </div>
                    </article>
                  ))}
                </div>
                
              </section>

              <section className="section-card love-letter">
                <div className="letter-icon">💌</div>
                <p className="eyebrow">From my heart to yours</p>
                <h2>A Letter for My Thangoo</h2>
                <p>
                  To the person who means so much to me — Happy Birthday,
                  Harish. ❤️
                </p>

                {!letterOpen ? (
                  <button
                    className="primary-button"
                    onClick={() => setLetterOpen(true)}
                  >
                    Read My Love Letter 💗
                  </button>
                ) : (
                  <div className="letter-content">
                    <p>
                      Happy Birthday, my love, my Harish, my Thangoo. 🥹❤️
                      You are such an important part of my life, and I feel so
                      lucky to have you beside me.
                    </p>
                    <p>
                      This is our second birthday since we became committed,
                      and I hope we get to celebrate many, many more birthdays
                      together. I want to make more memories with you, laugh
                      with you, and be beside you through every chapter of life.
                    </p>
                    <p>
                      Even if we fight or misunderstand each other sometimes,
                      please remember that I want us to talk, understand each
                      other, and find our way back to each other. I don't want
                      small problems to become bigger than our love.
                    </p>
                    <p>
                      Please be honest with me, take care of my heart, and
                      don't give up on us without talking things through. I
                      love you more than these words can explain, and I want
                      to keep choosing you, today and always. 💕
                    </p>
                    <p className="signature">
                      Forever with love,<br />
                      Your Harini 💋
                    </p>
                    <button
                      className="secondary-button"
                      onClick={() => setLetterOpen(false)}
                    >
                      Close Letter ♡
                    </button>
                  </div>
                )}
              </section>

              
              <section className="section-card secret-section">
                <div className="secret-icon">🤫</div>
                <p className="eyebrow">One last little secret</p>
                <h2>A Secret Message for You</h2>
                {!secretOpen ? (
                  <button
                    className="primary-button"
                    onClick={() => setSecretOpen(true)}
                  >
                    Open My Secret 💋
                  </button>
                ) : (
                  <div className="secret-message">
                    <p>
                      If I could make one birthday wish, it would be to see you
                      happy, hold your hand, and celebrate so many more
                      birthdays by your side. You are my favourite hello and
                      my hardest goodbye. I love you, Harish. Always us. ❤️🌙
                    </p>
                    <div className="big-heart">💗</div>
                  </div>
                )}
              </section>

              <footer className="footer">
                <div className="sparkle">♡ ✨ ♡</div>
                <h2>Happy Birthday, Thangoo! 🎂</h2>
                <p>Made with endless love by Harini, just for you.</p>
                <p className="footer-small">Harini ♥ Harish · Always & Forever</p>
              </footer>
            </>
          )}
        </>
      )}
    </main>
  );
}