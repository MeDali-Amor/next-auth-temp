import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Settings = async () => {
    const session = await auth();
    return (
        <div>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <Button type="submit" variant="outline">
                    Log out
                </Button>
            </form>
            {JSON.stringify(session)}
        </div>
    );
};

export default Settings;
