import { ChangeEvent, useEffect, useState } from "react";

export function uploadImage(e: ChangeEvent<HTMLInputElement>, setIsError: Function, setImage: Function) {
    if (e.target.files && e.target.files?.length > 0) {
        const mbSize = e.target.files[0].size / 1024 / 1024;
        if (mbSize > 1)
            setIsError(true);
        else
            setIsError(false);

        setImage({
            imageFile: e.target.files[0],
            imagePreview: URL.createObjectURL(e.target.files[0]),
            imageSize: e.target.files[0].size,
        });
    }
};