import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CgDropOpacity } from 'react-icons/cg';
import * as S from './TopToolbar.styled';
import { selectTool } from '../../redux/activeTool';
import { selectOpacity } from '../../redux/toolOptions';
import PencilIcon from '../../../public/images/icons/pencil.svg';
import SelectionIcon from '../../../public/images/icons/selection.svg';
import RectangleIcon from '../../../public/images/icons/rectangle.svg';
import EllipseIcon from '../../../public/images/icons/ellipse.svg';
import DiamondIcon from '../../../public/images/icons/diamond.svg';
import TextIcon from '../../../public/images/icons/text.svg';
import ImageIcon from '../../../public/images/icons/image.svg';
import BrushWidthSelector from '../BrushWidthSelector';
import OutsideClicker from '../OutsideClicker';
import FontSizeSelector from '../FontSizeSelector';
import ColorPicker from '../ColorPicker';
import Tooltip from '../Tooltip';
import { getResizedImageURL } from '../../utils';

const TopToolbar = ({
  brushColor,
  brushSize,
  opacity,
  tool,
  action,
  setAction,
  setImageUpload,
  boardName,
  setBoardName,
}) => {
  const dispatch = useDispatch();
  const [brushSelectorOpen, setBrushSelectorOpen] = useState(false);
  const [opacitySelectorOpen, setOpacitySelectorOpen] = useState(false);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = function () {
      const resizedImageURL = getResizedImageURL(img);
      setImageUpload({
        file,
        width: img.width,
        height: img.height,
        originalImageURL: img.src,
        resizedImageURL,
      });
      dispatch(selectTool('image'));
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <S.TopStack>
      <S.ToolContainer main>
        <S.ToolLabel title="Selection">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('selection'))}
            checked={tool === 'selection' ? true : false}
          />
          <S.ToolIcon>
            <SelectionIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Rectangle">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('rectangle'))}
            checked={tool === 'rectangle' ? true : false}
          />
          <S.ToolIcon>
            <RectangleIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Ellipse">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('ellipse'))}
            checked={tool === 'ellipse' ? true : false}
          />
          <S.ToolIcon>
            <EllipseIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Diamond">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('diamond'))}
            checked={tool === 'diamond' ? true : false}
          />
          <S.ToolIcon>
            <DiamondIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Line">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('line'))}
            checked={tool === 'line' ? true : false}
          />
          <S.ToolIcon>
            <svg viewBox="0 0 6 6">
              <line x1="0" y1="3" x2="6" y2="3" strokeLinecap="round"></line>
            </svg>
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Draw">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('pencil'))}
            checked={tool === 'pencil' ? true : false}
          />
          <S.ToolIcon>
            <PencilIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Text">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('text'))}
            checked={tool === 'text' ? true : false}
          />
          <S.ToolIcon>
            <TextIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Insert image">
          <S.ToolTypeFile
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            active={tool === 'image' ? true : false}
          />
          <S.ToolIcon>
            <ImageIcon />
          </S.ToolIcon>
        </S.ToolLabel>
      </S.ToolContainer>
      <S.ToolContainer>
        <S.ShapeActions>
          <S.ToolLabel title="Stroke">
            <ColorPicker />
          </S.ToolLabel>
          <S.ToolLabel title="Stroke width">
            <OutsideClicker onDismiss={() => setBrushSelectorOpen(false)}>
              <S.ToolIcon onClick={() => setBrushSelectorOpen(prev => !prev)}>
                <svg viewBox="0 0 100 100">
                  <line x1="0" y1="15" x2="100" y2="15" strokeWidth="5"></line>
                  <line x1="0" y1="45" x2="100" y2="45" strokeWidth="10"></line>
                  <line x1="0" y1="80" x2="100" y2="80" strokeWidth="20"></line>
                </svg>
              </S.ToolIcon>
              {brushSelectorOpen && (
                <BrushWidthSelector
                  brushColor={brushColor}
                  brushSize={brushSize}
                />
              )}
            </OutsideClicker>
          </S.ToolLabel>
          <S.ToolLabel title="Opacity">
            <OutsideClicker onDismiss={() => setOpacitySelectorOpen(false)}>
              <S.ToolIcon onClick={() => setOpacitySelectorOpen(prev => !prev)}>
                <CgDropOpacity className="opacity" />
              </S.ToolIcon>
              {opacitySelectorOpen && (
                <S.OpacitySelector>
                  <S.ToolTypeRange
                    type="range"
                    name="opacity"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={e => dispatch(selectOpacity(e.target.value))}
                  />
                </S.OpacitySelector>
              )}
            </OutsideClicker>
          </S.ToolLabel>
          {tool === 'text' && action !== 'writing' && <FontSizeSelector />}
        </S.ShapeActions>
        <S.OtherActions>
          <S.BoardName>
            <Tooltip content="Rename the board" position="bottom">
              <S.BoardNameInput
                type="text"
                value={boardName}
                onChange={e => setBoardName(e.target.value)}
                onFocus={() => setAction('renaming')}
                onBlur={e => {
                  !/(.|\s)*\S(.|\s)*/.test(e.target.value) &&
                    setBoardName('Untitled Board');
                  setAction('none');
                }}
              />
            </Tooltip>
          </S.BoardName>
          <S.LogoLink to="/myBoards" title="Back to boards">
            <S.LogoIcon />
          </S.LogoLink>
        </S.OtherActions>
      </S.ToolContainer>
    </S.TopStack>
  );
};

export default TopToolbar;
