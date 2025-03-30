import dynamic from "next/dynamic";

const ParallaxContainer = dynamic(
  () => import("@/components/ParallaxContainer"),
  {
    ssr: false,
  },
);

export default function Page() {
  return <ParallaxContainer />;
}
