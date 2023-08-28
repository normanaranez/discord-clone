import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { z } from 'zod';
import { ServerSchemaProps } from '@/schemas/ServerSchema';

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!params.serverId) {
            return new NextResponse('Server ID Missing', { status: 400 });
        }

        const { name, imageUrl  }: ServerSchemaProps = await req.json();

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name: name,
                imageUrl: imageUrl
            },
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log('[SERVER_ID_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}