import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Show, SignIn, UserButton, useUser } from "@clerk/react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [ShowSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams(false);
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-10" alt="logo_image" />
        </Link>

        <div className="flex gap-8">
          <Show when="signed-out">
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </Show>
          <Show when="signed-in">
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjob">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                Element: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/MyJobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saveJob"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </Show>
        </div>
      </nav>

      {ShowSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="Onboarding"
            signUpFallbackRedirectUrl="/Onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
