import classes from './modal.module.scss';
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({children, isVisible, handleClose}) => {

    return (
        isVisible && (
            <Backdrop onClick={handleClose}>
                <div
                    onClick={e => e.stopPropagation()}
                    className={classes.modal}
                >
                    {children}
                </div>
            </Backdrop>
        )
    );
};

export default Modal;