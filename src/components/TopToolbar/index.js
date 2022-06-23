import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgDropOpacity } from 'react-icons/cg';
import * as S from './TopToolbar.styled';
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
import ShapeBtn from '../ShapeBtn';
import { getResizedImageURL } from '../../utils';

const TopToolbar = ({
  tool,
  setTool,
  action,
  setAction,
  setImageUpload,
  boardName,
  renameBoard,
}) => {
  const dispatch = useDispatch();
  const opacity = useSelector(state => state.toolOptions.opacity);
  const [opacitySelectorOpen, setOpacitySelectorOpen] = useState(false);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2097152) {
      alert('File is too big. Maximum allowed size is 2MB.');
      return;
    }

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
      setTool('image');
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <S.TopStack>
      <S.ToolContainer main>
        <S.ToolLabel title="Selection">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('selection')}
            checked={tool === 'selection' ? true : false}
            number="1"
          >
            <SelectionIcon />
          </ShapeBtn>
        </S.ToolLabel>

        <S.ToolLabel title="Rectangle">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('rectangle')}
            checked={tool === 'rectangle' ? true : false}
            number="2"
          >
            <RectangleIcon />
          </ShapeBtn>
        </S.ToolLabel>
        <S.ToolLabel title="Ellipse">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('ellipse')}
            checked={tool === 'ellipse' ? true : false}
            number="3"
          >
            <EllipseIcon />
          </ShapeBtn>
        </S.ToolLabel>
        <S.ToolLabel title="Diamond">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('diamond')}
            checked={tool === 'diamond' ? true : false}
            number="4"
          >
            <DiamondIcon />
          </ShapeBtn>
        </S.ToolLabel>
        <S.ToolLabel title="Line">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('line')}
            checked={tool === 'line' ? true : false}
            number="5"
          >
            <svg viewBox="0 0 6 6">
              <line x1="0" y1="3" x2="6" y2="3" strokeLinecap="round"></line>
            </svg>
          </ShapeBtn>
        </S.ToolLabel>
        <S.ToolLabel title="Draw">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('pencil')}
            checked={tool === 'pencil' ? true : false}
            number="6"
          >
            <PencilIcon />
          </ShapeBtn>
        </S.ToolLabel>
        <S.ToolLabel title="Text">
          <ShapeBtn
            type="radio"
            name="editor-current-shape"
            handler={() => setTool('text')}
            checked={tool === 'text' ? true : false}
            number="7"
          >
            <TextIcon />
          </ShapeBtn>
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
            <BrushWidthSelector />
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
                onChange={e => renameBoard(e.target.value)}
                onFocus={() => setAction('renaming')}
                onBlur={e => {
                  !/(.|\s)*\S(.|\s)*/.test(e.target.value) &&
                    renameBoard('Untitled Board');
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
