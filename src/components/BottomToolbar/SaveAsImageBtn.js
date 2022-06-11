import React, { useState } from 'react';
import * as S from './BottomToolbar.styled';
import SaveFileIcon from '../../../public/images/icons/saveFile.svg';
import Modal from '../Modal';
import { imageSaver } from '../../utils';

const SaveAsImageBtn = ({ svgRef, setSelectedElement }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalActions = (
    <div
      className="buttons"
      onClick={e => {
        const { format } = e.target.dataset;
        svgRef.current.childNodes.forEach(node => {
          node.childNodes.forEach(node => (node.style.cursor = 'default'));
        });
        format && imageSaver.save(format, svgRef.current);
        setModalOpen(false);
      }}
    >
      <button
        className="primaryBtn squareBtn"
        title="Export to PNG"
        data-format="png"
      >
        PNG
      </button>
      <button
        className="redBtn squareBtn"
        title="Export to SVG"
        data-format="svg"
      >
        SVG
      </button>
    </div>
  );

  return (
    <>
      {modalOpen ? (
        <Modal
          title="Save as image"
          modalActions={modalActions}
          onDismiss={() => setModalOpen(false)}
        />
      ) : null}
      <S.ToolTypeButton
        title="Save as image"
        onClick={() => {
          setSelectedElement(null);
          setModalOpen(true);
        }}
      >
        <S.ToolIcon>
          <SaveFileIcon />
        </S.ToolIcon>
      </S.ToolTypeButton>
    </>
  );
};

export default SaveAsImageBtn;
