import React from 'react';
import rough from 'roughjs/bundled/rough.esm';
import { getStroke } from 'perfect-freehand';
import { saveSvgAsPng, svgAsDataUri } from 'save-svg-as-png';

const generator = rough.generator();

// Turn the points returned from perfect-freehand into SVG path data.
const getSvgPathFromStroke = stroke => {
  if (!stroke.length) return '';

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ['M', ...stroke[0], 'Q']
  );

  d.push('Z');
  return d.join(' ');
};

const getDiamondPoints = element => {
  // Here add 1 to avoid numbers to be 0, or rough.js will throw an error
  const { x1, y1, x2, y2 } = element;
  const width = x2 - x1;
  const height = y2 - y1;
  const topX = Math.floor(width / 2) + 1;
  const topY = 0;
  const rightX = width;
  const rightY = Math.floor(height / 2) + 1;
  const bottomX = topX;
  const bottomY = height;
  const leftX = 0;
  const leftY = rightY;

  return [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY];
};

const getNearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const getDistance = (a, b) =>
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

const checkOnLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = getDistance(a, b) - (getDistance(a, c) + getDistance(b, c));
  return Math.abs(offset) < maxDistance ? 'inside' : null;
};

const getPositionWithinElement = (x, y, element) => {
  const { type, x1, y1, x2, y2 } = element;
  switch (type) {
    case 'rectangle':
    case 'ellipse':
    case 'diamond':
    case 'image':
      const topLeft = getNearPoint(x, y, x1, y1, 'tl');
      const topRight = getNearPoint(x, y, x2, y1, 'tr');
      const bottomLeft = getNearPoint(x, y, x1, y2, 'bl');
      const bottomRight = getNearPoint(x, y, x2, y2, 'br');
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    case 'line':
      const start = getNearPoint(x, y, x1, y1, 'start');
      const end = getNearPoint(x, y, x2, y2, 'end');
      const onLine = checkOnLine(x1, y1, x2, y2, x, y);
      return start || end || onLine;
    case 'pencil':
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        return (
          checkOnLine(
            point.x,
            point.y,
            nextPoint ? nextPoint.x : point.x,
            nextPoint ? nextPoint.y : point.y,
            x,
            y,
            35
          ) !== null
        );
      });
      return betweenAnyPoint ? 'inside' : null;
    case 'text':
      if (!/(.|\s)*\S(.|\s)*/.test(element.options.text)) return null;
      return x >= x1 - 15 && x <= x2 && y >= y1 - 15 && y <= y2
        ? 'inside'
        : null;
    default:
      throw new Error(`Type not recognized: ${type}`);
  }
};

export const getElementAtPosition = (x, y, elements) => {
  return elements
    .map(element => {
      if (element.type === 'text' && document.getElementById(element.id)) {
        const { width, height } = document.getElementById(element.id).getBBox();
        element.x2 = element.x1 + width;
        element.y2 = element.y1 + height;
      }
      return {
        ...element,
        position: getPositionWithinElement(x, y, element),
      };
    })
    .find(element => element.position !== null);
};

export const createSVGElement = (id, x1, y1, x2, y2, type, options) => {
  let roughElement;
  switch (type) {
    case 'line':
      roughElement = generator.line(x1, y1, x2, y2, {
        roughness: 2,
        stroke: options.brushColor,
        strokeWidth: options.brushSize,
      });
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        options: { ...options, roughElement },
      };
    case 'rectangle':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
        roughness: 2,
        stroke: options.brushColor,
        strokeWidth: options.brushSize,
      });
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        options: { ...options, roughElement },
      };
    case 'ellipse':
      const width = x2 - x1;
      const height = y2 - y1;
      roughElement = generator.ellipse(
        x1 + width / 2,
        y1 + height / 2,
        width,
        height,
        {
          roughness: 0.5,
          stroke: options.brushColor,
          strokeWidth: options.brushSize,
        }
      );
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        options: { ...options, roughElement },
      };
    case 'diamond': {
      const [topX, topY, rightX, rightY, bottomX, bottomY, leftX, leftY] =
        getDiamondPoints({ x1, y1, x2, y2 });
      roughElement = generator.polygon(
        [
          [topX + x1, topY + y1],
          [rightX + x1, rightY + y1],
          [bottomX + x1, bottomY + y1],
          [leftX + x1, leftY + y1],
        ],
        {
          roughness: 2,
          stroke: options.brushColor,
          strokeWidth: options.brushSize,
        }
      );
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        options: { ...options, roughElement },
      };
    }
    case 'pencil':
      return { id, type, options, points: [{ x: x1, y: y1 }] };
    case 'text':
      if (!options.text) options.text = '';
      return { id, x1, y1, x2, y2, type, options };
    case 'image':
      return { id, x1, y1, x2, y2, type, options };
    default:
      throw new Error(`Type not recognized: ${type}`);
  }
};

export const drawElement = element => {
  switch (element.type) {
    case 'pencil':
      let size = element.options.brushSize;
      if (size <= 1) {
        size *= 8;
      } else if (size <= 3) {
        size *= 6;
      } else {
        size *= 5;
      }
      const d = getSvgPathFromStroke(
        getStroke(element.points, {
          size,
          thinning: 0.8,
        })
      );

      return (
        <g key={element.id}>
          <path
            id={element.id}
            d={d}
            stroke={element.options.brushColor}
            fill={element.options.brushColor}
            style={{ opacity: element.options.opacity }}
          ></path>
        </g>
      );
    case 'line':
    case 'rectangle':
    case 'ellipse':
    case 'diamond':
      const [pathInfoObj] = generator.toPaths(element.options.roughElement);
      return (
        <g key={element.id}>
          <path
            id={element.id}
            {...pathInfoObj}
            style={{ opacity: element.options.opacity }}
          ></path>
        </g>
      );
    case 'text':
      const attrObj = {
        id: element.id,
        x: element.x1,
        y: element.y1,
        stroke: element.options.brushColor,
        fill: element.options.brushColor,
        dominantBaseline: 'hanging',
      };
      if (!element.options.text) return;
      const text = element.options.text.split('\n');
      return (
        <text key={element.id} {...attrObj}>
          {text.map((row, index) => (
            <tspan
              key={index}
              x={element.x1}
              y={element.y1 + index * element.options.fontSize * 1.3}
              style={{
                whiteSpace: 'pre',
                userSelect: 'none',
                fontSize: element.options.fontSize,
                opacity: element.options.opacity,
              }}
            >
              {row}
            </tspan>
          ))}
        </text>
      );
    case 'image':
      return (
        <g key={element.id}>
          <image
            href={element.options.url}
            x={element.x1}
            y={element.y1}
            width={element.x2 - element.x1}
            height={element.y2 - element.y1}
            style={{ opacity: element.options.opacity }}
          />
        </g>
      );
    default:
      throw new Error(`Type not recognized: ${element.type}`);
  }
};

export const setCursorForPosition = position => {
  switch (position) {
    case 'tl':
    case 'br':
    case 'start':
    case 'end':
      return 'nwse-resize';
    case 'tr':
    case 'bl':
      return 'nesw-resize';
    default:
      return 'move';
  }
};

export const resizeCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case 'tl':
    case 'start':
      return { x1: clientX, y1: clientY, x2, y2 };
    case 'tr':
      return { x1, y1: clientY, x2: clientX, y2 };
    case 'bl':
      return { x1: clientX, y1, x2, y2: clientY };
    case 'br':
    case 'end':
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
};

export const adjustElementCoordinates = element => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === 'line') {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  } else if (type === 'rectangle' || type === 'ellipse' || type === 'diamond') {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    return { x1, y1, x2, y2 };
  }
};

export const isAdjustmentRequired = type =>
  ['line', 'rectangle', 'ellipse', 'diamond'].includes(type);

export const convertToSVGCoords = ({ x, y }, svg) => {
  const clientPoint = svg.createSVGPoint();
  clientPoint.x = x;
  clientPoint.y = y;
  const CTM = svg.getScreenCTM();
  const SVGPoint = clientPoint.matrixTransform(CTM.inverse());
  return { x: SVGPoint.x, y: SVGPoint.y };
};

export const convertToCanvasCoords = ({ x, y }, svg) => {
  const SVGPoint = svg.createSVGPoint();
  SVGPoint.x = x;
  SVGPoint.y = y;
  const CTM = svg.getScreenCTM();
  const canvasPoint = SVGPoint.matrixTransform(CTM);
  return { x: canvasPoint.x, y: canvasPoint.y };
};

export const getSVGMovement = (x, y, movementX, movementY, svg) => {
  const SVGPoint = convertToSVGCoords({ x, y }, svg);
  const newSVGPoint = convertToSVGCoords(
    { x: x + movementX, y: y + movementY },
    svg
  );

  return { dx: SVGPoint.x - newSVGPoint.x, dy: SVGPoint.y - newSVGPoint.y };
};

export const getResizedImageURL = image => {
  const canvas = document.createElement('canvas');
  const MAX_WIDTH = 120;
  const MAX_HEIGHT = 120;
  const width = image.width;
  const height = image.height;

  let canvasWidth, canvasHeight;
  if (width > height) {
    if (width > MAX_WIDTH) {
      canvasHeight = (height * MAX_WIDTH) / width;
      canvasWidth = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      canvasWidth = (width * MAX_HEIGHT) / height;
      canvasHeight = MAX_HEIGHT;
    }
  }
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.getContext('2d').drawImage(image, 0, 0, canvasWidth, canvasHeight);
  return canvas.toDataURL('image/png', 0.5);
};

export const imageSaver = {
  save(format, svg) {
    this.format = format;
    this.svg = svg;
    this.parseImage();
  },

  parseImage() {
    const options = {
      excludeUnusedCss: true,
      backgroundColor: '#fff',
    };

    if (this.format === 'png') {
      saveSvgAsPng(
        this.svg,
        `Boodo_${new Date().toLocaleDateString()}.png`,
        options
      );
    } else if (this.format === 'svg') {
      svgAsDataUri(this.svg, options).then(uri => this.downloadImage(uri));
    }
  },

  downloadImage(href) {
    const downloadLink = document.createElement('a');
    downloadLink.href = href;
    downloadLink.download = `Boodo_${new Date().toLocaleDateString()}.${
      this.format
    }`;
    const revokeURL = () => {
      setTimeout(() => {
        URL.revokeObjectURL(href);
      }, 1500);
    };
    downloadLink.addEventListener('click', revokeURL);
    downloadLink.click();
    downloadLink.removeEventListener('click', revokeURL);
  },
};
