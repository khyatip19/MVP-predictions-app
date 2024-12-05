import React from 'react';
import { motion } from 'framer-motion';

export default function PodiumStep({ podium, winner, winnerIndex }) {
  const offset = podium.length - winnerIndex;

  // Use a fallback image if `image_url` is missing
  const imageUrl = winner.image_url || 'https://via.placeholder.com/150'; // Placeholder image

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        placeContent: 'center',
      }}
    >
      <motion.div
        style={{
          alignSelf: 'center',
          marginBottom: '.25rem',
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 1 + (offset + 2),
              duration: 0.75,
            },
          },
        }}
      >
        {/* Increase image size for players */}
        <img
          src={imageUrl}
          alt={winner.player_name}
          style={{
            borderRadius: '50%',
            height: '10rem', // Increased size
            width: '10rem', // Increased size
            objectFit: 'cover',
          }}
        />
      </motion.div>
      <motion.div
        style={{
          backgroundColor: 'rgba(219,39,119,1)',
          borderColor: 'rgba(190,24,93,1)',
          borderTopLeftRadius: '.5rem',
          borderTopRightRadius: '.5rem',
          marginBottom: -1,
          placeContent: 'center',
          width: '6rem', // Increased width of the podium bars
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: {
            height: 100 * (offset / podium.length), // Increased height for podium bars
            opacity: 1,
            transition: {
              delay: 1 + offset,
              duration: 2,
              ease: 'backInOut',
            },
          },
        }}
      >
        <span style={{ alignSelf: 'flex-end', color: 'white' }}>
          {winnerIndex + 1}
        </span>
      </motion.div>
    </div>
  );
}
