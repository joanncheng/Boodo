import React, { useState } from 'react';
import SaveFileIcon from '../../public/images/icons/saveFile.svg';
import Modal from './Modal';
import { imageSaver } from '../utils';
import BottomToolbarBtn from './BottomToolbarBtn';

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

      <BottomToolbarBtn
        title="Save as image"
        handler={() => {
          setSelectedElement(null);
          setModalOpen(true);
        }}
      >
        <SaveFileIcon />
      </BottomToolbarBtn>
    </>
  );
};

export default SaveAsImageBtn;
