/**
 * Let's make a game 🕹
 */
{
  const Directions = {
    UP: { x: 0, y: 1 },
    DOWN: { x: 0, y: -1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
  } as const;

  type Position = {
    x: number;
    y: number;
  };

  type DirectionKeys = keyof typeof Directions;

  const movePosition = (function movePosition() {
    const position: Position = {
      x: 0,
      y: 0,
    };

    const getPosition = () => ({ ...position });

    const setPosition = (dx: number, dy: number) => {
      position.x += dx;
      position.y += dy;
    };

    const move = (action: DirectionKeys) => {
      const { x, y } = Directions[action];

      setPosition(x, y);
    };

    return {
      getPosition,
      move,
    };
  })();

  console.log(movePosition.getPosition()); // { x: 0, y: 0}
  movePosition.move("UP");
  console.log(movePosition.getPosition()); // { x: 0, y: 1}
  movePosition.move("DOWN");
  console.log(movePosition.getPosition()); // { x: 0, y: 0}
  movePosition.move("LEFT");
  console.log(movePosition.getPosition()); // { x: -1, y: 0}
  movePosition.move("RIGHT");
  console.log(movePosition.getPosition()); // { x: 0, y: 0}
}
