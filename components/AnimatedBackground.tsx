// This is a React component - a reusable piece of UI
import styles from '../styles/AnimatedBackground.module.css';

// This creates 50 floating particles
const PARTICLE_COUNT = 50;

export default function AnimatedBackground() {
  // Array.from() creates an array with 50 items
  // We map over each item to create a particle
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => (
    <div
      key={index} // React needs unique keys for list items
      className={styles.particle}
      style={{
        // Each particle gets random position and animation delay
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }}
    />
  ));

  return (
    <div className={styles.animatedBackground}>
      {particles}
    </div>
  );
}
