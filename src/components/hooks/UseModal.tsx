import React, { ReactNode, useCallback, useContext, useState } from 'react';
import EditModal from '../Modals/EditModal';
import LoginModal from "../Modals/LoginModal";
import RegModal from "../Modals/RegModal";

type ProviderProps = {
    children: ReactNode
}

export const MODALS = {
    'NONE': 'NONE',
    'LOGIN': 'LOGIN',
    'REG': 'REG',
    'EDIT': 'EDIT',
};

const ModalContext = React.createContext({currentModal: "", modalProps: {}, showModal: (input: string) => {},title:{}});
ModalContext.displayName = 'ModalContext';

export function Modals() {
    return (
        <ModalContext.Consumer>
            {(context) => {
                const onClose = () => context.showModal(MODALS.NONE);
                switch (context.currentModal) {
                    case MODALS.LOGIN:
                        return <LoginModal onClose={onClose} {...context.modalProps}/>;
                    case MODALS.REG:
                        return <RegModal onClose={onClose} {...context.modalProps}/>;
                    case MODALS.EDIT:
                        return <EditModal onClose={onClose} {...context.modalProps}/>;
                    case MODALS.NONE:
                    default:
                        return null;
                }
            }}
        </ModalContext.Consumer>
    );
}

export function ModalContextProvider({children}:ProviderProps) {
    const [currentModal, setCurrentModal] = useState("");
    const [modalProps, setModalProps] = useState({});
    const showModal = useCallback(
        (newModal :any, newModalProps = {}) => {
            setModalProps(newModalProps);
            setCurrentModal(newModal);
        },
        [setCurrentModal, setModalProps]
    );
    return (
        <ModalContext.Provider value={{currentModal, showModal, modalProps}}>
            {children}
            <Modals/>
        </ModalContext.Provider>
    );
}

export function useModals() {
    return useContext(ModalContext);
}