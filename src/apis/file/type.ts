type FileReqParams = {
    presignedUrl: {
        fileKey: string;
    };
    uploadFile: {
        presignedUrl: string,
        fileBuffer: Buffer,
        mimetype: string,
    }
};

type FileResponse = {
    presignedUrl: { 
        presignedUrl: string
    };
};
