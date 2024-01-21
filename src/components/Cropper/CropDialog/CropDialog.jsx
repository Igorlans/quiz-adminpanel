import classes from "./cropDialog.module.scss";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { Button, Slider } from "@mui/material";
import styled from "@emotion/styled";
import getCroppedImg from "../cropImage";
import Modal from "../Modal/Modal";
import { fetchBlobFromUrl } from "../fetchBlobFromUrl";
import { v4 as uuidv4 } from "uuid";
// import {fetchBlobFromUrl} from "@/components/adminpanel/utils/fetchBlobFromUrl";
const StyledSlider = styled(Slider)({
    color: "#9DCA39",
    "& .MuiSlider-thumb": {
        "&.Mui-focused, &.Mui-focusVisible, &:hover, &.Mui-active": {
            color: "#9DCA39",
            boxShadow: "0 0 0 8px rgba(157,202,57,0.24)",
        }, // change the color of the thumb
    },
});

const CropDialog = ({
    setFile,
    aspectRatio,
    selectedImage,
    isVisible,
    setIsVisible,
    setNewImage,
}) => {
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [aspect, setAspect] = useState(aspectRatio || 3 / 2);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(1);
    const onCropChange = (cropValue) => {
        setCrop(cropValue);
    };
    const onZoomChange = (zoomValue) => {
        setZoom(zoomValue);
    };
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(
            selectedImage,
            croppedAreaPixels
        );
        setNewImage(croppedImageUrl);
        const blob = await fetchBlobFromUrl(croppedImageUrl);
        const newFile = new File([blob], `${uuidv4()}.jpeg`, {
            type: blob.type,
        });
        setFile(newFile);
        setIsVisible(false);
    };
    const onCancel = () => {
        setNewImage(null);
        setIsVisible(false);
        setFile(null);
    };
    return (
        <Modal isVisible={isVisible} handleClose={() => setIsVisible(false)}>
            <div className={classes.image}>
                <Cropper
                    image={selectedImage}
                    crop={crop}
                    aspect={aspect}
                    zoom={zoom}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                />

                {/*<Image src={image} alt={'Картинка, що обрізається'} fill />*/}
            </div>
            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <div className={classes.title}>Збільшення</div>
                    <StyledSlider
                        value={zoom}
                        onChange={(e) => onZoomChange(e.target.value)}
                        min={1}
                        max={3}
                        step={0.01}
                    />
                </div>
                <div className={classes.buttons}>
                    <Button variant={"contained"} onClick={onCancel}>
                        Відмінити
                    </Button>
                    <Button variant={"contained"} onClick={onCrop}>
                        Зберегти
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CropDialog;
