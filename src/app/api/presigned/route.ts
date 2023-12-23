import { NextResponse } from 'next/server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const awsS3Bucket = process.env.AWS_S3_BUCKET;

const storage = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: awsAccessKey || '',
        secretAccessKey: awsSecretKey || '',
    },
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get('fileKey');

    if (!fileKey) {
        return NextResponse.json(
            {
                message: '전송하려는 fileKey 를 요청에 동봉해주세요.',
            },
            { status: 400 },
        );
    }

    const command: PutObjectCommand = new PutObjectCommand({
        Bucket: awsS3Bucket || '',
        Key: fileKey,
    });

    try {
        const url = await getSignedUrl(storage, command, {
            expiresIn: 5,
        });

        return NextResponse.json(
            { url },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: 'Presigned URL 생성 과정에서 문제가 발생했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}
