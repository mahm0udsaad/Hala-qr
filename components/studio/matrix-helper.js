import { Skia } from "@shopify/react-native-skia";

export const scale = (matrix, s, origin) => {
  "worklet";
  const scaledMatrix = Skia.Matrix(matrix.get());
  scaledMatrix.translate(origin.x, origin.y);
  scaledMatrix.scale(s, s);
  scaledMatrix.translate(-origin.x, -origin.y);
  scaledMatrix.concat(matrix);
  return scaledMatrix;
};

export const rotateZ = (matrix, theta, origin) => {
  "worklet";
  const rotatedMatrix = Skia.Matrix(matrix.get());
  rotatedMatrix.translate(origin.x, origin.y);
  rotatedMatrix.rotate(theta);
  rotatedMatrix.translate(-origin.x, -origin.y);
  rotatedMatrix.concat(matrix);
  return rotatedMatrix;
};

export const translate = (matrix, x, y) => {
  "worklet";
  const translatedMatrix = Skia.Matrix(matrix.get());
  translatedMatrix.translate(x, y);
  translatedMatrix.concat(matrix);
  return translatedMatrix;
};

export const toM4 = (m3) => {
  "worklet";
  const m = m3.get();
  return [
    m[0],
    m[1],
    0,
    m[2],
    m[3],
    m[4],
    0,
    m[5],
    0,
    0,
    1,
    0,
    m[6],
    m[7],
    0,
    m[8],
  ];
};
