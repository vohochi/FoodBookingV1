'use client'

import Link from 'next/link';
import { Button } from '@mui/material';
import { FaCartShopping } from "react-icons/fa6";
import React, { useState } from 'react';

const GoToCartButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link href="/user/cart" passHref>
        <Button
          variant="contained"
          aria-label="Go to cart"
          sx={{
            position: 'fixed',
            border: '2px solid #cda45e',
            borderRadius: '20px',
            padding: '15px',
            fontSize: '24px',
            display: 'flex',
            bottom: '30px',
            right: '30px',
            zIndex: '99999',
            backgroundColor: 'transparent',
            color: '#fff',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#b59a4d',
            },
          }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
          <FaCartShopping style={{
            transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)', 
            transition: 'transform 0.8s ease',
          }} />
        </Button>
      </Link>
    </>
  );
};

export default GoToCartButton;
