import {useRef, useState} from 'react';
import classes from './fileUploader.module.css';
import {Button} from "@mui/material";

const FileUploader = ({className, handleFile, label, outerFileName, style, children, showName = false}) => {
    const hiddenFileInput = useRef(null);
    const [fileName, setFileName] = useState(outerFileName || '');
    const getClasses = () => {
        if (className) {
            return [classes.fileUploader, className].join(' ')
        } else {
            return classes.fileUploader;
        }
    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    function truncateString(str, num) {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            setFileName(event.target.files[0].name)
            handleFile(fileUploaded);
        }
    };

    return (
        <div>
            {label &&
                <span style={{fontWeight: 500, marginBottom: 10}}>{label}</span>
            }
            <div style={style} className={getClasses()}>
                {
                    showName &&
                    <span>{!fileName ? "Назва фото" : truncateString(fileName, 15)}</span>

                }
                {children ?
                    <div onClick={handleClick}>
                        {children}
                    </div>
                    :
                    <Button onClick={handleClick}>
                        {fileName ? 'Змінити фото' : 'Додати фото'}
                    </Button>
                }

                <input
                    ref={hiddenFileInput}
                    style={{display: "none"}}
                    accept="image/*"
                    onChange={handleChange}
                    type='file'
                />
            </div>
        </div>

    );
};

export default FileUploader;