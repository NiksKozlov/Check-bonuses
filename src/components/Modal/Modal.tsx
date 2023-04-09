import React, {FC, PropsWithChildren, useEffect} from 'react';

import cn from 'classnames';
import {createPortal} from 'react-dom';

import style from './Modal.module.css';

type ModalProps = {
  active: boolean;
  close?: (val: boolean) => void;
  classNameModal?: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  active,
  children,
  close,
  classNameModal,
}): JSX.Element => {

  return createPortal(
    <div
      role="presentation"
      className={cn(style.modal, {[style.modal_active]: active})}
      onClick={() => {
        close?.(false);
      }}
    >
      <div
        role="presentation"
        className={cn(
          style.modal_content,
          {
            [style.modal_content_active]: active,
          },
          classNameModal,
        )}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

