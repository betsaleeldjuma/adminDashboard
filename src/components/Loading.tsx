import { motion } from "framer-motion"

const Loading = () => {
  return (
    <motion.div className="flex justify-center items-center bg-[#8E1616] w-[60%] h-[60%] rounded-full" initial={{opacity: 0.5}} animate={{opacity: 1}} transition={{duration: 1, repeat: Infinity, repeatType: 'reverse'}}>
        <h1 className="text-5xl font-extrabold">Loading...</h1>
    </motion.div>
  )
}

export default Loading