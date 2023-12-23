type FileReqParams = {
    presignedUrl: {
        fileKey: string;
    };
    uploadFile: {
        presignedUrl: string,
        file: File,
    }
};

type FileResponse = {
    presignedUrl: { 
        presignedUrl: string
    };
};
