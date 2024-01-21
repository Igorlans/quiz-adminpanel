import React, { useState } from "react";
import classes from "./cropper.module.scss";
import FileUploader from "./FileUploader/FileUploader";
import CropDialog from "./CropDialog/CropDialog";
import { IoMdClose } from "react-icons/io";

const Cropper = ({
    file,
    setFile,
    aspect,
    width = 290,
    height = 290,
    placeholder = "/image_uploader_plus.svg",
}) => {

    const [image, setImage] = useState(file || null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleFileUpload = (file) => {
        // const imageUrl = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        setIsModalVisible(true);
    };

    return (
        <div style={{ alignSelf: "flex-start" }}>
            {isModalVisible && (
                <CropDialog
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    setFile={setFile}
                    aspectRatio={aspect}
                    isVisible={isModalVisible}
                    setIsVisible={setIsModalVisible}
                    setNewImage={setImage}
                />
            )}
            {image ? (
                <div
                    className={classes.uploadImage}
                    style={{
                        width: width,
                        height: height
                    }}
                    onClick={() => {
                        setIsModalVisible(true);
                        // setSelectedImage(image)
                    }}
                >
                    <div className={classes.overlay}></div>
                    <img
                        src={image || selectedImage}
                        alt={"uploader"}
                        width={width}
                        height={height}
                        style={{ objectFit: "cover" }}
                    />
                    <div
                        className={classes.close}
                        onClick={(e) => {
                            e.stopPropagation();
                            setImage(null);
                            setFile(null);
                        }}
                    >
                        <IoMdClose size={width > 200 ? "30px" : "20px"} />
                    </div>
                </div>
            ) : (
                <FileUploader
                    style={{ width: width, height: height }}
                    className={classes.uploadImage}
                    handleFile={handleFileUpload}
                >
                    <img
                        style={{ objectFit: "cover" }}
                        src={placeholder}
                        alt={"uploader"}
                        width={width}
                        height={height}
                    />
                </FileUploader>
            )}
        </div>
    );
};

export default Cropper;
