// VSL Video section — YouTube embed with analytics
import { FadeIn } from "@/components/FadeIn";
import { trackEvent } from "@/lib/analytics";

export function VSLVideoSection() {
  const videoId = import.meta.env.VITE_VSL_YOUTUBE_VIDEO_ID || "";

  function handleVideoClick() {
    trackEvent("vsl_play");
  }

  return (
    <section id="vsl-video" className="px-6 py-24 md:px-16">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div
            className="relative aspect-video rounded-2xl border border-crimson/20 shadow-2xl shadow-crimson/5 overflow-hidden bg-royal-700"
            onClick={handleVideoClick}
          >
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                title="What Did I Just Sign? — Video Sales Letter"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-crimson/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-crimson ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-royal-300">
                  Video Sales Letter — Configure VITE_VSL_YOUTUBE_VIDEO_ID
                </p>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="font-sans text-sm text-royal-300 text-center mt-4">
            Watch the 8-minute breakdown — then decide.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
