import { NextResponse } from 'next/server';

import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const storage = new S3Client({
    region: 'ap-northeast-2',
});

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
        return NextResponse.json(
            {
                message: '전송하려는 파일의 이름을 요청에 동봉해주세요.',
            },
            { status: 400 },
        );
    }

    const command: PutObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
        Key: fileName,
    });

    try {
        const presignedUrl = await getSignedUrl(storage, command, {
            expiresIn: 3600,
        });
    
        return NextResponse.json(
            { presignedUrl },
            {
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    'Presigned URL 생성 과정에서 문제가 발생했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}
