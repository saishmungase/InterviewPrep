'use client';


export const Screen = ({ currentQuestion }: { currentQuestion: string }) => {
  return (
    <div className="item a flex justify-center items-center text-[1.1rem] h-[100%]" data-swapy-item="a">
      {currentQuestion ? (
        <p>{currentQuestion}</p>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};
