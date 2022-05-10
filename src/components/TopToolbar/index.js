import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsPaletteFill } from 'react-icons/bs';
import * as S from './TopToolbar.styled';
import { selectTool } from '../../redux/activeTool';
import { selectColor } from '../../redux/brushOptions';
import PencilIcon from '../../../public/images/icons/pencil.svg';
import SelectionIcon from '../../../public/images/icons/selection.svg';
import RectangleIcon from '../../../public/images/icons/rectangle.svg';
import EllipseIcon from '../../../public/images/icons/ellipse.svg';
import ArrowIcon from '../../../public/images/icons/arrow.svg';
import TextIcon from '../../../public/images/icons/text.svg';
import ImageIcon from '../../../public/images/icons/image.svg';
import AvatarIcon from '../../../public/images/icons/avatar.svg';
import ShapeActions from '../ShapeActions';
import OutsideClicker from '../OutsideClicker';

const TopToolbar = ({ brushColor, brushSize, tool }) => {
  const dispatch = useDispatch();
  console.log(brushColor);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <S.TopStack>
      <S.ToolContainer>
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
        <S.ToolLabel title="Arrow">
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('arrow'))}
            checked={tool === 'arrow' ? true : false}
          />
          <S.ToolIcon>
            <ArrowIcon />
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
          <S.ToolTypeRadio
            type="radio"
            name="editor-current-shape"
            onChange={() => dispatch(selectTool('insertImage'))}
            checked={tool === 'insertImage' ? true : false}
          />
          <S.ToolIcon>
            <ImageIcon />
          </S.ToolIcon>
        </S.ToolLabel>
        <S.ToolLabel title="Stroke">
          <S.ToolTypeColor
            type="color"
            name="editor-current-color"
            onChange={e => dispatch(selectColor(e.target.value))}
          />

          <BsPaletteFill className="palette-icon" color={brushColor} />
        </S.ToolLabel>
        <S.ToolLabel title="Stroke width">
          <OutsideClicker onDismiss={() => setDropdownOpen(false)}>
            <S.ToolIcon
              onClick={e => {
                e.preventDefault();
                setDropdownOpen(prev => !prev);
              }}
            >
              <svg viewBox="0 0 100 100">
                <line x1="0" y1="15" x2="100" y2="15" strokeWidth="5"></line>
                <line x1="0" y1="45" x2="100" y2="45" strokeWidth="10"></line>
                <line x1="0" y1="80" x2="100" y2="80" strokeWidth="20"></line>
              </svg>
            </S.ToolIcon>
            {dropdownOpen && (
              <ShapeActions
                brushColor={brushColor}
                brushSize={brushSize}
                setDropdownOpen={setDropdownOpen}
              />
            )}
          </OutsideClicker>
        </S.ToolLabel>
      </S.ToolContainer>
      <S.UserInfoWrapper>
        <S.UserIcon>
          <AvatarIcon />
        </S.UserIcon>
        <p>test@test.com</p>
        <S.LogoutBtn title="Sign out" />
      </S.UserInfoWrapper>
    </S.TopStack>
  );
};

export default TopToolbar;