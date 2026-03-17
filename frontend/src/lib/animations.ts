/** Shared framer-motion animation variants used across pages */

export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const } },
};
