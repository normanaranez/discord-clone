
import { auth } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error('Unauthorized');

    console.log('userId', userId);
    
    return { userId: userId };
};

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(async () => await handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(['image', 'pdf'])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
