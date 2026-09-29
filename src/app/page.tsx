import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WhatIDo } from "@/components/sections/what-i-do";
import { Nepsof } from "@/components/sections/nepsof";
import { SelectedWork } from "@/components/sections/project-case-study";
import { HowIBuild } from "@/components/sections/how-i-build";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatIDo />
      <Nepsof />
      <SelectedWork />
      <HowIBuild />
      <Contact />
    </>
  );
}
