export const calculateMenuPosition = (x, y) => {
    const menuWidth = 200;
    const menuHeight = 150;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    return {
      x: Math.min(x, screenWidth - menuWidth),
      y: Math.min(y, screenHeight - menuHeight),
    };
  };