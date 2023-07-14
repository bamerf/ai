import { useCompletion } from 'ai/react';

export default function QAModal({ open }: { open: boolean }) {
  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: '/api/qa-pinecone',
    });

  const formattedCompletion = completion.split('\n').map((line, index) => {
    return (
      <p
        key={index}
        className="mt-1 text-sm prose text-gray-200"
        dangerouslySetInnerHTML={{
          __html: line,
        }}
      />
    );
  });

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="How to create a Corellium device snapshot?"
          className="w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm focus:outline-none  sm:text-sm sm:leading-6"
          value={input}
          onChange={handleInputChange}
        />
      </form>
      <div className="mt-3 sm:mt-5">
        {formattedCompletion}

        {isLoading && !completion && (
          <p className="flex items-center justify-center mt-4">
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </p>
        )}
      </div>
    </div>
  );
}
