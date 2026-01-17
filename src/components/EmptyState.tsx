import { motion } from "framer-motion"

const EmptyState = () => {
  return (
    <motion.div className="card flex justify-center items-center bg-[#8E1616] w-[50%] h-[26%] lg:w-[30%] lg:h-[60%] rounded-full" initial={{opacity: 0.5}} animate={{opacity: 1}} transition={{duration: 1, repeat: Infinity, repeatType: 'reverse'}}>
        <h1 className="text-xl lg:text-5xl font-extrabold">State Empty</h1>
    </motion.div>
  )
}

export default EmptyState