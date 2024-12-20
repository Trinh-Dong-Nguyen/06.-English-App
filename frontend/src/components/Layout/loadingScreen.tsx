import { useSelector } from "react-redux"
import styles from "./styles.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { selectUserHandling } from "@/features/user/store/selectors"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.5,
    },
  },
}

const child = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
}

export default function LoadingScreen({ message = "Đang tải dữ liệu..." }: { message?: string }) {
  const handling = useSelector(selectUserHandling)
  return (
    <motion.div
      variants={container}
      transition={{ duration: 1 }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.container}
    >
      <AnimatePresence>
        {handling && (
          <motion.div
            className={styles.loader}
            variants={child}
            animate="visible"
            exit="exit"
            transition={{ duration: 2 }}
          />
        )}
        {handling && (
          <motion.span
            className={styles.message}
            variants={child}
            animate="visible"
            exit="exit"
            transition={{ duration: 2 }}
          >
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
