import { motion } from "framer-motion"

const ErrorState = () => {
  return (
    <motion.div className="flex justify-center items-center bg-[#8E1616] w-[60%] h-[60%] rounded-full" initial={{opacity: 0.5}} animate={{opacity: 1}} transition={{duration: 1, repeat: Infinity, repeatType: 'reverse'}}>
        <h1 className="text-5xl font-extrabold">Error State</h1>
    </motion.div>
  )
}

export default ErrorState