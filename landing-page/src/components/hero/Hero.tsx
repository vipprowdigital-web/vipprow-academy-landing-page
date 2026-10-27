import HeroTextAnimation from "./HeroTextAnimation";
import LightRaysLazy from "./LightRaysLazy";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        background: "var(--gradient-scene)",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-start justify-center z-20 pointer-events-none">
        <HeroTextAnimation />
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-center z-20 pointer-events-none">
        <LightRaysLazy
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
    </section>
  );
}
