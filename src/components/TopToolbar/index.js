import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { BsPaletteFill } from 'react-icons/bs';
import { CgDropOpacity } from 'react-icons/cg';
import * as S from './TopToolbar.styled';
import { auth } from '../../firebase';
import { selectTool } from '../../redux/activeTool';
import { selectBrushColor, selectOpacity } from '../../redux/toolOptions';
import PencilIcon from '../../../public/images/icons/pencil.svg';
import SelectionIcon from '../../../public/images/icons/selection.svg';
import RectangleIcon from '../../../public/images/icons/rectangle.svg';
import EllipseIcon from '../../../public/images/icons/ellipse.svg';
import DiamondIcon from '../../../public/images/icons/diamond.svg';
import TextIcon from '../../../public/images/icons/text.svg';
import ImageIcon from '../../../public/images/icons/image.svg';
import AvatarIcon from '../../../public/images/icons/avatar.svg';
import ShapeActions from '../ShapeActions';
import OutsideClicker from '../OutsideClicker';
import FontSizeSelector from '../FontSizeSelector';
import { getResizedImageURL } from '../../utils';

const TopToolbar = ({
  brushColor,
  brushSize,
  opacity,
  tool,
  action,
  setImageUpload,
  user,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    // setTimeout(() => {
    //   URL.revokeObjectURL(img.src);
    // }, 1000 * 30);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        console.log('sign out error: ' + err.message);
      });
  };

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
        <S.ToolLabel title="Stroke">
          <S.ToolTypeColor
            type="color"
            value={brushColor}
            name="editor-current-color"
            onChange={e => dispatch(selectBrushColor(e.target.value))}
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
        <S.ToolLabel title="Opacity">
          <S.ComboBox>
            <S.ToolIcon>
              <CgDropOpacity className="opacity" />
            </S.ToolIcon>
            <S.ToolTypeRange
              type="range"
              name="opacity"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={e => dispatch(selectOpacity(e.target.value))}
            />
          </S.ComboBox>
        </S.ToolLabel>
        {tool === 'text' && action !== 'writing' && <FontSizeSelector />}
      </S.ToolContainer>
      <S.UserInfoWrapper>
        <S.UserIcon>
          <AvatarIcon />
        </S.UserIcon>
        <p>{user && user.email}</p>
        <S.LogoutBtn title="Sign out" onClick={handleSignOut} />
      </S.UserInfoWrapper>
    </S.TopStack>
  );
};

export default TopToolbar;
