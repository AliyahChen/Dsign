import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import { Slider, Typography } from "@mui/material";

import { AuthContext } from "./context/authContext";

import getCroppedImg from "./utils/cropImage";
import closeIcon from "./icons/close-icon.png";
import closeIconHover from "./icons/close-icon-hover.png";

interface Prop {
  url?: string;
}
interface OverlayProps {
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
  setNewPhotoDetail: (returnedUrl: string, returnedFile: File) => void;
  currentAaspect: number;
  currentImgUrl: string;
}

const Wrapper = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 100;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #00000030;
  z-index: 101;
`;

const CloseIcon = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -15px;
  right: -15px;
  opacity: 0.8;
  background-image: url(${closeIcon});
  background-size: cover;
  background-position: center;
  &:hover {
    background-image: url(${closeIconHover});
  }
`;

const OverlayModal = styled.div`
  padding: 50px;
  width: 80vw;
  max-width: 1300px;
  height: 80vh;
  max-height: 800px;
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 102;
  background-color: white;
`;

const CropperContainer = styled.div`
  width: 80%;
  height: 90%;
  position: relative;
`;

const NewPhotoContainer = styled.div`
  width: 100%;
`;

const NewPhotoHeaderContainer = styled.div`
  padding: 0 20px;
  height: 40px;
  width: 100%;
  color: #3c3c3c;
  font-size: 24px;
  line-height: 40px;
  align-items: center;
`;

const CollectionContainer = styled.div`
  margin-top: 10px;
  padding: 20px;
  width: 100%;
  max-height: 650px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(4, auto);
  overflow: scroll;
  scrollbar-width: none;
  border: 1px solid #b4b4b4;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CollectionImg = styled.div`
  width: 135px;
  height: 135px;
  background-image: ${(props: Prop) => props.url};
  background-size: cover;
  background-position: center;
  &:hover {
    cursor: pointer;
    border: 1px solid #3c3c3c;
    box-shadow: 1px 1px 5px #3c3c3c30;
  }
`;

const UploadPic = styled.label`
  margin-left: 10px;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: #3c3c3c;
  text-align: center;
  border: 1px solid #3c3c3c40;
  border-radius: 10px;
  background-color: #3c3c3c30;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #3c3c3c80;
  }
`;

const ControlContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const SliderContainer = styled.div`
  margin: 0 20px;
  width: 150px;
`;

const Btn = styled.button`
  margin-left: 20px;
  height: 40px;
  color: #3c3c3c;
  font-size: 18px;
  border: 1px solid #3c3c3c40;
  border-radius: 10px;
  background-color: #3c3c3c30;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #3c3c3c80;
  }
`;

const portalElement = document.getElementById("overlays") as HTMLElement;

function Overlay({
  setShowOverlay,
  setNewPhotoDetail,
  currentAaspect,
  currentImgUrl,
}: OverlayProps) {
  const { t } = useTranslation();
  const { collection } = useContext(AuthContext);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (currentImgUrl) {
      setImgSrc(currentImgUrl);
    }
  }, []);

  const zoomPercent = (value: number) => `${Math.round(value * 100)}%`;

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const result = String(reader.result);
        setImgSrc(result);
      };
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreainPixel: any) => {
      setCroppedAreaPixels(croppedAreainPixel);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    const { file, url } = (await getCroppedImg(
      imgSrc,
      croppedAreaPixels,
      rotation
    )) as { file: File; url: string };
    const awaitCroppedImageToString = String(url);
    setNewPhotoDetail(awaitCroppedImageToString, file);
    setShowOverlay((prev) => !prev);
  }, [croppedAreaPixels, rotation, imgSrc, setNewPhotoDetail, setShowOverlay]);

  return (
    <>
      {createPortal(
        <Wrapper>
          <Backdrop onClick={() => setShowOverlay((prev) => !prev)} />
          <OverlayModal>
            <CloseIcon onClick={() => setShowOverlay((prev) => !prev)} />
            <CropperContainer>
              {imgSrc ? (
                <Cropper
                  image={imgSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={currentAaspect}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              ) : (
                <NewPhotoContainer>
                  <NewPhotoHeaderContainer>
                    Choose photo from collection or
                    <UploadPic onChange={(e: any) => onUploadFile(e)}>
                      {t("upload_image")}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </UploadPic>
                  </NewPhotoHeaderContainer>
                  <CollectionContainer>
                    {collection.length !== 0 &&
                      collection.map((url) => (
                        <CollectionImg
                          key={url}
                          url={`url(${url})`}
                          onClick={() => setImgSrc(url)}
                        />
                      ))}
                  </CollectionContainer>
                </NewPhotoContainer>
              )}
            </CropperContainer>
            {imgSrc ? (
              <ControlContainer>
                <Btn onClick={() => setImgSrc("")}> {t("change_image")}</Btn>
                <SliderContainer>
                  <Typography>
                    {t("zoom_image")}: {zoomPercent(zoom)}
                  </Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    valueLabelFormat={zoomPercent}
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, newZoom: any) => setZoom(newZoom)}
                  />
                </SliderContainer>
                <SliderContainer>
                  <Typography>
                    {t("rotate_image")}: {`${rotation} °`}
                  </Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e, newRotation: any) => setRotation(newRotation)}
                  />
                </SliderContainer>
                <Btn onClick={showCroppedImage}>{t("confirm_crop")}</Btn>
              </ControlContainer>
            ) : (
              ""
            )}
          </OverlayModal>
        </Wrapper>,
        portalElement
      )}
    </>
  );
}

export default Overlay;
