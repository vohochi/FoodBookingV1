export const getValidSrc = (src: string | File | null): string => {
    if (!src) {
      return '/images/default.jpg'; 
    }
    if (typeof src === 'string') {
      return src.startsWith('http') ? src : `/images/${src}`; 
    }
    if (src instanceof File) {
      return URL.createObjectURL(src); 
    }
    return '/images/default.jpg'; // Trường hợp fallback
  };
  