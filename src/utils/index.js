import React from 'react';
import rough from 'roughjs/bundled/rough.esm';
import { getStroke } from 'perfect-freehand';
import { TEXTAREA_LINE_HEIGHT } from '../config';

const namespace = 'http://www.w3.org/2000/svg';
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
        if (!nextPoint) {
          return (
            checkOnLine(point.x, point.y, point.x, point.y, x, y, 10) !== null
          );
        } else {
          return (
            checkOnLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) !==
            null
          );
        }
      });
      return betweenAnyPoint ? 'inside' : null;
    case 'text':
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;
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
      return { id, x1, y1, x2, y2, type, roughElement };
    case 'rectangle':
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
        roughness: 2,
        stroke: options.brushColor,
        strokeWidth: options.brushSize,
      });
      return { id, x1, y1, x2, y2, type, roughElement };
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
      return { id, x1, y1, x2, y2, type, roughElement };
    case 'pencil':
      return { id, type, options, points: [{ x: x1, y: y1 }] };
    case 'text':
      return { id, x1, y1, x2, y2, type, options, text: '' };
    default:
      throw new Error(`Type not recognized: ${type}`);
  }
};

export const drawElement = element => {
  switch (element.type) {
    case 'pencil':
      const d = getSvgPathFromStroke(
        getStroke(element.points, { size: element.options.brushSize * 4 })
      );
      return (
        <path
          key={element.id}
          namespace={namespace}
          id={element.id}
          d={d}
          stroke={element.options.brushColor}
          fill={element.options.brushColor}
        ></path>
      );
    case 'line':
    case 'rectangle':
    case 'ellipse':
      const [pathInfoObj] = generator.toPaths(element.roughElement);
      return (
        <path
          key={element.id}
          namespace={namespace}
          id={element.id}
          {...pathInfoObj}
        ></path>
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
      const text = element.text.split('\n');

      return (
        <text key={element.id} namespace={namespace} {...attrObj}>
          {text.map((row, index) => (
            <tspan
              key={index}
              x={element.x1}
              y={element.y1 + index * TEXTAREA_LINE_HEIGHT}
            >
              {row}
            </tspan>
          ))}
        </text>
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
  } else if (type === 'rectangle' || type === 'ellipse') {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  }
};

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
  const CanvasPoint = SVGPoint.matrixTransform(CTM);
  return { x: CanvasPoint.x, y: CanvasPoint.y };
};
