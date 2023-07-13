import Examples from '@/components/Examples';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="relative w-full min-h-screen px-6 py-24 overflow-hidden bg-gray-900 shadow-2xl isolate sm:px-24 xl:py-32">
        <Examples />

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </main>
  );
}
