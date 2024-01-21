import React, {useEffect, useState} from 'react';
import classes from "./cropper.module.scss";
import FileUploader from "./FileUploader/FileUploader";
import {IoMdClose} from "react-icons/io";
import plc from '../../assets/image_uploader_plus.svg'
const PhotoUploader = ({file, setFile, width = 290, height = 290, placeholder = plc}) => {
    const [image, setImage] = useState(null);
    const handleFileUpload = (file) => {
        setFile(file);
    }

    useEffect(() => {
        if (file) {
            if (file?.name) {
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl)
            }

        } else {
            setImage(null)
        }
    }, [file])

    return (
        <div style={{width, height}}>

            {image
                ?
                <div
                    className={classes.uploadImage}
                >
                    <div className={classes.overlay}>
                    </div>
                    <img src={image} alt={'uploader'} style={{width: width, height: height, objectFit: 'cover'}} />
                    <div
                        className={classes.close}
                        onClick={(e) => {
                            e.stopPropagation()
                            setImage(null)
                            setFile(null)
                        }}
                    >
                        <IoMdClose size={width > 200 ? '30px' : '20px'} />
                    </div>
                </div>
                :
                <FileUploader style={{width: width, height: height}} className={classes.uploadImage} handleFile={handleFileUpload}>
                    <img src={placeholder} alt={'uploader'} style={{width: width, height: height, objectFit: 'cover'}} />
                </FileUploader>
            }
        </div>
    );
};

export default PhotoUploader;