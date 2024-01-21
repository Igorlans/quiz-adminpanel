import classes from './backdrop.module.scss';

const Backdrop = ({children, onClick}) => {
    return (
        <div
            className={classes.backdrop}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Backdrop;