import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPaletteFill } from 'react-icons/bs';
import * as S from './ColorPicker.styled';
import OutsideClicker from '../OutsideClicker';
import { selectBrushColor } from '../../redux/toolOptions';

const options = [
  { name: 'Yellow', value: '#ffeb3b' },
  { name: 'Amber', value: '#ffc107' },
  { name: 'Orange', value: '#ff9800' },
  { name: 'DeepOrange', value: '#ff5722' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Lime', value: '#cddc39' },
  { name: 'LightGreen', value: '#8bc34a' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Teal', value: '#087f5b' },
  { name: 'Cyan', value: '#0b7285' },
  { name: 'LightBlue', value: '#03a9f4' },
  { name: 'Blue', value: '#1864ab' },
  { name: 'Indigo', value: '#364fc7' },
  { name: 'Grape', value: '#862e9c' },
  { name: 'Violet', value: '#4740A5' },
  { name: 'Red', value: '#c92a2a' },
  { name: 'Brown', value: '#795548' },
  { name: 'BlueGrey', value: '#607d8b' },
  { name: 'Grey', value: '#495057' },
  { name: 'black', value: '#000' },
];

const ColorPicker = () => {
  const dispatch = useDispatch();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const brushColor = useSelector(state => state.toolOptions.brushColor);

  const renderedOptions = options.map(option => {
    const active = brushColor === option.value ? true : false;

    return (
      <S.DropdownItem
        title={option.name}
        key={option.value}
        data-color={option.value}
        active={active}
        color={option.value}
        onClick={e => dispatch(selectBrushColor(e.target.dataset.color))}
      ></S.DropdownItem>
    );
  });

  return (
    <OutsideClicker onDismiss={() => setColorPickerOpen(false)}>
      <div>
        <S.DropdownBtn
          title="Select Color"
          onClick={() => setColorPickerOpen(prev => !prev)}
        >
          <S.ToolIcon color={brushColor}>
            <BsPaletteFill />
          </S.ToolIcon>
        </S.DropdownBtn>
        {colorPickerOpen && (
          <S.DropdownMenu role="menu">{renderedOptions}</S.DropdownMenu>
        )}
      </div>
    </OutsideClicker>
  );
};

export default ColorPicker;
