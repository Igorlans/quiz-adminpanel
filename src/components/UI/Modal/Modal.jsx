import classes from "./modal.module.scss";

const Modal = ({ isOpen, onClose, children, className, style }) => {

    const activeClasses = [classes.modal, classes.open].join(' ')
    const contentClasses = [classes.content, className].join(' ')
    const contentActiveClasses = [classes.content, className, classes.open].join(' ')

    return (
        <div className={isOpen ? activeClasses : classes.modal}>
            <div className={classes.overlay} onClick={onClose}></div>
            <div className={isOpen ? contentActiveClasses : contentClasses} style={style}>
                {children}
            </div>
        </div>
    );
};

export default Modal;