type FileReqParams = {
    presignedUrl: {
        fileKey: string;
    };
    uploadFile: {
        url: string,
        file: File,
    }
};

type FileResponse = {
    presignedUrl: { 
        url: string
    };
};
