
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel = ({ images, carName }) => {
  const [[page, direction], setPage] = useState([0, 0]);

    console.log(images)

  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        Нет изображений
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-2xl bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="w-full h-full absolute"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
        <img
          className="w-full h-full object-contain"
          alt={`${carName} - изображение ${imageIndex + 1}`}
          src={images[imageIndex]} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 hover:bg-black/60 text-white border-none"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 hover:bg-black/60 text-white border-none"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === imageIndex ? "bg-primary" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Перейти к изображению ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
