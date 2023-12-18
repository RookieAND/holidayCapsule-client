/* eslint-disable no-unused-vars */
import { type ChangeEvent, useRef } from 'react';

interface UseUploadFileProps {
    maxFileSize?: number;
    allowFileTypes?: string[];
    onError?: {
        exceedFileSize?: (...args: any) => any;
        mismatchExtractType: (...args: any) => any;
    };
    onSubmit: (uploadedFile: File) => any;
    onRemove: (...args: any) => any;
}

/**
 * 특정 input ref 에 파일을 업로드 하는 로직을 간편하게 도와주는 Hook useUploadFile
 */
const useUploadFile = ({
    maxFileSize = 0,
    allowFileTypes,
    onError,
    onSubmit,
    onRemove,
}: UseUploadFileProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const [uploadedFile] = e.target.files ?? [];

        if (!uploadedFile || uploadedFile.size > maxFileSize) {
            onError?.exceedFileSize?.();
            return;
        }

        const [, uploadedFileExtractType] = uploadedFile.name.split('.');

        if (
            allowFileTypes &&
            !allowFileTypes.includes(uploadedFileExtractType.toLowerCase())
        ) {
            onError?.mismatchExtractType?.();
            return;
        }

        onSubmit(uploadedFile);
    };

    const removeUploadedFile = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.value = '';
        onRemove();
    };

    return {
        fileInputRef,
        handleUploadFile,
        removeUploadedFile,
    };
};

export default useUploadFile;
