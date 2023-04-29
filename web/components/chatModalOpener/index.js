import { useState } from 'react'
import Modal from 'react-modal'

import styles from "./styles.module.scss"
import CloseIcon from "../../images/icons/closeModal.svg"

const ChatModalOpener = () => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <div className={styles.chatBubbleWrapper} onClick={openModal}>
                What can I help you with?
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        position: 'fixed',
                        zIndex: 1020,
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(255, 255, 255, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        background: 'white',
                        width: '50rem',
                        maxWidth: 'calc(100vw - 2rem)',
                        maxHeight: 'calc(100vh - 2rem)',
                        overflowY: 'auto',
                        position: 'relative',
                        border: '1px solid #0F2E53',
                        borderRadius: '0.3rem',
                    }
                }}
            >
                <div className={styles.inputWrapper}>
                    <label>Ask me anything about your health?</label>
                    <input
                        // id={id}
                        // type={type}
                        // value={value}
                        onChange={() => { }}
                    />
                </div>
                <div className={styles.label}>
                    Not sure where to start?
                </div>
                <span
                    role="button"
                    tabIndex="0"
                    className={styles.dismiss}
                    onClick={closeModal}
                >
                    <img src={CloseIcon} alt="close icon" />
                </span>
            </Modal>
        </>
    )
}

export default ChatModalOpener
