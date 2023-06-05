import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const CardStack = () => {
  const [cards, setCards] = useState(['Card 1', 'Card 2', 'Card 3']);

  const cardDragged = (index) => {
    const draggedCard = cards[index];
    setCards((prevCards) => {
      const newCards = prevCards.filter((_, i) => i !== index);
      return [...newCards, draggedCard];
    });
  };

  const renderCards = () => {
    return cards.map((card, index) => (
      <DraggableCard key={index} index={index} onDrag={cardDragged}>
        {card}
      </DraggableCard>
    ));
  };

  return <div id="card-container" className='h-full w-full'>{renderCards()}</div>;
};

const DraggableCard = ({ children, index, onDrag }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0], [0.5, 1]);
  const rotate = useTransform(x, [-100, 90], [-50, 45]);

  const handleDrag = (event, info) => {
    const { point } = info;
    if (point.x < -50) {
      onDrag(index);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, opacity, rotate }}
      onDragEnd={handleDrag}
      onDragPropagation ="true"
    >
      <div className={``}>
        {children}
      </div>
    </motion.div>
  );
};

export default CardStack;
