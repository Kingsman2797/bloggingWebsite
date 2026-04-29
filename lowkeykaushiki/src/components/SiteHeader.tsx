import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#d8c8b9]/80 bg-[#fbfaf6]/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <HamburgerMenu />
      </div>
    </header>
  );
}
