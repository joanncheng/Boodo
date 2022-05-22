import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './FontSizeSelector.styled';
import OutsideClicker from '../OutsideClicker';
import { selectFontSize } from '../../redux/fontSize';

const options = [12, 14, 18, 24, 30, 36, 48, 60, 72, 96, 120];

const FontSizeSelector = () => {
  const dispatch = useDispatch();
  const [fontSizeSelectorOpen, setFontSizeSelectorOpen] = useState(false);
  const fontSize = useSelector(state => state.fontSize);

  const renderedOptions = options.map(option => {
    const active = fontSize === option ? true : false;

    return (
      <S.DropdownItem
        key={option}
        data-size={option}
        active={active}
        onClick={e => {
          dispatch(selectFontSize(+e.target.dataset.size));
          setFontSizeSelectorOpen(false);
        }}
      >
        {option}
      </S.DropdownItem>
    );
  });

  return (
    <OutsideClicker onDismiss={() => setFontSizeSelectorOpen(false)}>
      <S.Dropdown>
        <S.DropdownBtn
          onClick={e => {
            e.preventDefault();
            setFontSizeSelectorOpen(prev => !prev);
          }}
        >
          {fontSize} pt
        </S.DropdownBtn>
        {fontSizeSelectorOpen && (
          <S.DropdownMenu role="menu">{renderedOptions}</S.DropdownMenu>
        )}
      </S.Dropdown>
    </OutsideClicker>
  );
};

export default FontSizeSelector;
