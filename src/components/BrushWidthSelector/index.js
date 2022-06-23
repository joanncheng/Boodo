import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrushSize } from '../../redux/toolOptions';
import OutsideClicker from '../OutsideClicker';
import * as S from './BrushWidthSelector.styled';
import { ToolIcon } from '../TopToolbar/TopToolbar.styled';

const BrushWidthSelector = () => {
  const dispatch = useDispatch();
  const brushColor = useSelector(state => state.toolOptions.brushColor);
  const brushSize = useSelector(state => state.toolOptions.brushSize);
  const [brushSelectorOpen, setBrushSelectorOpen] = useState(false);

  return (
    <OutsideClicker onDismiss={() => setBrushSelectorOpen(false)}>
      <ToolIcon
        onClick={e => {
          e.preventDefault();
          setBrushSelectorOpen(prev => !prev);
        }}
      >
        <svg viewBox="0 0 100 100">
          <line x1="0" y1="15" x2="100" y2="15" strokeWidth="5"></line>
          <line x1="0" y1="45" x2="100" y2="45" strokeWidth="10"></line>
          <line x1="0" y1="80" x2="100" y2="80" strokeWidth="20"></line>
        </svg>
      </ToolIcon>
      {brushSelectorOpen && (
        <S.ActionsWrapper>
          <S.Fieldset>
            <legend>Stroke width</legend>
            <S.ActionList>
              <div>
                <label title="Thin">
                  <S.ShapeTypeRadio
                    type="radio"
                    name="stroke-width"
                    onChange={() => dispatch(selectBrushSize(1))}
                    checked={brushSize === 1 ? true : false}
                    onClick={e => {
                      e.stopPropagation();
                      setBrushSelectorOpen(false);
                    }}
                  />
                  <S.ActionIcon>
                    <svg focusable="false" role="img" viewBox="0 0 40 20">
                      <path
                        d="M8 10H32"
                        stroke={brushColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      ></path>
                    </svg>
                  </S.ActionIcon>
                </label>
              </div>
              <div>
                <label title="Bold">
                  <S.ShapeTypeRadio
                    type="radio"
                    name="stroke-width"
                    onChange={() => dispatch(selectBrushSize(3))}
                    checked={brushSize === 3 ? true : false}
                    onClick={e => {
                      e.stopPropagation();
                      setBrushSelectorOpen(false);
                    }}
                  />
                  <S.ActionIcon>
                    <svg focusable="false" role="img" viewBox="0 0 40 20">
                      <path
                        d="M8 10H32"
                        stroke={brushColor}
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                      ></path>
                    </svg>
                  </S.ActionIcon>
                </label>
              </div>
              <div>
                <label title="Extra bold">
                  <S.ShapeTypeRadio
                    type="radio"
                    name="stroke-width"
                    onChange={() => dispatch(selectBrushSize(6))}
                    checked={brushSize === 6 ? true : false}
                    onClick={e => {
                      e.stopPropagation();
                      setBrushSelectorOpen(false);
                    }}
                  />
                  <S.ActionIcon>
                    <svg focusable="false" role="img" viewBox="0 0 40 20">
                      <path
                        d="M8 10H32"
                        stroke={brushColor}
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                      ></path>
                    </svg>
                  </S.ActionIcon>
                </label>
              </div>
            </S.ActionList>
          </S.Fieldset>
        </S.ActionsWrapper>
      )}
    </OutsideClicker>
  );
};

export default BrushWidthSelector;
