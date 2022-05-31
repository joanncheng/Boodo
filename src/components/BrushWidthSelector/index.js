import React from 'react';
import { useDispatch } from 'react-redux';
import { selectBrushSize } from '../../redux/toolOptions';
import * as S from './BrushWidthSelector.styled';

const BrushWidthSelector = ({ brushColor, brushSize }) => {
  const dispatch = useDispatch();

  return (
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
  );
};

export default BrushWidthSelector;
