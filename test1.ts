interface Point {
    x: number;
    y: number;
  }
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

const obj:Backpack<Point> = {
    add: (obj) => {},
    get: () => {
        return {
            y: 3,
            x: 4,
        }
    },
}