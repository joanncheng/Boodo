import React from 'react';
import { adjustElementCoordinates } from '../utils';

const SelectedBox = ({ element }) => {
  const { type } = element;
  const { x1, y1, x2, y2 } = adjustElementCoordinates(element);
  const width = x2 - x1 + 5;
  const height = y2 - y1 + 5;

  const drawSelector = () => {
    if (type === 'text' && !element.options.text) return;
    switch (type) {
      case 'pencil':
        return (
          <g>
            <circle
              id="selector"
              cx={element.points[0].x - 10}
              cy={element.points[0].y - 10}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
          </g>
        );
      case 'text':
        return (
          <g>
            <circle
              id="selector"
              cx={element.x1 - 10}
              cy={element.y1 - 10}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
          </g>
        );
      case 'line':
        return (
          <g>
            <circle
              id="selectorGrip_resize_nw"
              cx={x1 - 2.5}
              cy={y1 - 2.5}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
            <circle
              id="selectorGrip_resize_se"
              cx={x2 + 2.5}
              cy={y2 + 2.5}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
          </g>
        );
      case 'rectangle':
      case 'ellipse':
      case 'diamond':
      case 'image':
        return (
          <g>
            <rect
              x={x1 - 2.5}
              y={y1 - 2.5}
              width={width}
              height={height}
              strokeDasharray="10, 5"
              style={{ fill: 'none', strokeWidth: 1, stroke: '#000' }}
            />
            <circle
              id="selectorGrip_resize_nw"
              cx={x1 - 2.5}
              cy={y1 - 2.5}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
            <circle
              id="selectorGrip_resize_ne"
              cx={x2 + 2.5}
              cy={y1 - 2.5}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
            <circle
              id="selectorGrip_resize_se"
              cx={x2 + 2.5}
              cy={y2 + 2.5}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
            <circle
              id="selectorGrip_resize_sw"
              cx={x1 - 2.5}
              cy={y2 + 2.5}
              r={5}
              style={{ fill: '#fff', strokeWidth: 1, stroke: '#000' }}
            />
          </g>
        );
      default:
        throw new Error(`Type not recognized: ${element.type}`);
    }
  };
  return drawSelector();
};

export default SelectedBox;
