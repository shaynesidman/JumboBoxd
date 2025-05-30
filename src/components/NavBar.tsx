import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
  } from "@clerk/nextjs";

export default function NavBar() {
    return (
        <nav>
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-xl font-bold hover:cursor-pointer p-4 rounded">JumboBoxd</h1>
                <div className="flex justify-between items-center gap-4 mx-4">
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );  
}