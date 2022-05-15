import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectSize } from '../../redux/brushOptions';
import * as S from './ShapeActions.styled';

const ShapeActions = ({ brushColor, brushSize }) => {
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
                onChange={() => dispatch(selectSize(1))}
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
                onChange={() => dispatch(selectSize(3))}
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
                onChange={() => dispatch(selectSize(6))}
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

export default ShapeActions;
