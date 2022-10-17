import React, {ReactNode, useCallback, useContext, useState} from 'react';
import LoginModal from "../Modals/LoginModal";
import RegModal from "../Modals/RegModal";

type ProviderProps = {
    children: ReactNode
}

const ModalContext = React.createContext();
ModalContext.displayName = 'ModalContext';

export const MODALS = {
    'NONE': 'NONE',
    'LOGIN': 'LOGIN',
    'REG': 'REG',
};

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
                    case MODALS.NONE:
                    default:
                        return null;
                }
            }}
        </ModalContext.Consumer>
    );
}

export function ModalContextProvider({children}:ProviderProps) {
    const [currentModal, setCurrentModal] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const showModal = useCallback(
        (newModal, newModalProps = {}) => {
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