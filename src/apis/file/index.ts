import { getAsync, putAsync } from '#/apis/API';

export class FileRepository {
    /**
     * 파일을 업로드 할 Presigned URl 을 받아오는 함수 getPresignedUrl
     */
    static async getPresignedUrl({
        fileKey,
    }: FileReqParams['presignedUrl']) {
        const { presignedUrl } = await getAsync<FileResponse['presignedUrl']>(
            'presigned',
            {
                searchParams: { fileKey },
            },
        );
        return presignedUrl;
    }

    /**
     * 인계 받은 Presigned URL 로 파일 업로드 요청을 보내는 함수 putUploadFile 
     */
    static async putUploadFile({
        presignedUrl,
        file,
    }: FileReqParams['uploadFile']) {
        await putAsync('', file, {
            prefixUrl: presignedUrl,
            headers: {
                'Content-Type': file.type,
            }
        });
    }
}
