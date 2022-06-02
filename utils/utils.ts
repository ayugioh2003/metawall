import { ChangeEvent, useEffect, useState } from "react";

export function uploadImage(e: ChangeEvent<HTMLInputElement>, setIsError: Function, setImage: Function, isAvatar?: boolean) {
    if (e.target.files && e.target.files?.length > 0) {
        const mbSize = e.target.files[0].size / 1024 / 1024;
        if (mbSize > 1)
            setIsError(true);
        else
            setIsError(false);

        if (isAvatar) {
            var image = new Image();
            image.onload = function () {
                var width = image.naturalWidth | image.width;
                var height = image.naturalHeight | image.height;
                if (width !== height)
                    setIsError(true);
                if (width < 300 || height < 300)
                    setIsError(true);
            };
            var objectURL = window.URL.createObjectURL(e.target.files[0]);
            image.src = objectURL;
        }

        setImage({
            imageFile: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0]),
            imageSize: e.target.files[0].size,
        });
    }
};