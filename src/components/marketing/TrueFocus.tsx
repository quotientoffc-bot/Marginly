import { motion } from "framer-motion";

export default function TrueFocus({ sentence }: { sentence: string }) {
  const words = sentence.split(" ");
  
  return (
    <div className="flex flex-wrap justify-center gap-4 py-20">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(20px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-medium tracking-tight text-white"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
