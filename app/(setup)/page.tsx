import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { intialProfile } from '@/lib/initial-profile';
import { InitialModal } from '@/components/modals/initial-modal';
import { UserButton } from '@clerk/nextjs';
const SetupPage = async () => {

    const profile = await intialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }

    return (
        <>
            {/* <UserButton afterSignOutUrl="/"/> */}
            <InitialModal />
        </>
    )
}
 
export default SetupPage;