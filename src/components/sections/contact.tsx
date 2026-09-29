import { profile } from "@/data/content";
import { ContactForm } from "./contact-form";
import { Reveal } from "@/components/ui/reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import styles from "./contact.module.css";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: MailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/ashespokhrel",
    href: profile.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "@virrous",
    href: profile.github,
    icon: GitHubIcon,
    external: true,
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className={styles.section}
    >
      <div className="shell">
        <div className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>
            <span aria-hidden="true" className="eyebrow-dots" />
            Contact
          </p>
          <h2 id="contact-title" className={styles.title}>
            Have a problem worth solving?
          </h2>
          <p className={styles.lede}>
            If there is a real operational problem behind your idea, I would
            like to hear about it. The most useful first message is a short
            description of how things work today and where they break down.
          </p>
        </div>

        <Reveal>
          <ul className={styles.channels}>
            {channels.map((channel) => (
              <li key={channel.label} className={styles.channelCell}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className={styles.channelLink}
                >
                  <channel.icon className={styles.channelIcon} />
                  <span className={styles.channelLabel}>{channel.label}</span>
                  <span className={styles.channelValue}>{channel.value}</span>
                  {channel.external ? (
                    <span className="sr-only">(opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.formCard}>
            <p className={`eyebrow ${styles.formEyebrow}`}>
              <span aria-hidden="true" className="eyebrow-dots" />
              Send a message
            </p>
            <h3 className={styles.formTitle}>
              Tell me what you are working on.
            </h3>
            <div className={styles.form}>
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
