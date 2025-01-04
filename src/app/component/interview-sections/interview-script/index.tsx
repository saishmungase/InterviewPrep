'use client';

import { useEffect, useState } from 'react';

export const Script = ({
  currentQuestion,
  onSubmit,
}: {
  currentQuestion: string;
  onSubmit: (answer: string) => Promise<void>;
}) => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [finalTranscript, setFinalTranscript] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && !recognition) {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = 'en-IN';
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              setFinalTranscript((prev) => prev + result[0].transcript);
            } else {
              interimTranscript += result[0].transcript;
            }
          }
          setAnswer(finalTranscript + interimTranscript);
        };

        recognitionInstance.onerror = (event) => {
          console.error('Speech Recognition Error:', event.error);
        };

        setRecognition(recognitionInstance);
      } else {
        console.error('SpeechRecognition is not supported in this browser.');
      }
    }
  }, [recognition, finalTranscript]);

  useEffect(() => {
    setAnswer('');
    setFinalTranscript('');
    if (isRecording && recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }, [currentQuestion]);

  const handleStartRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const handleStopRecording = () => {
    if (recognition) {
      setAnswer((prev) => prev + finalTranscript);
      setFinalTranscript(''); 
      setIsRecording(false);
      recognition.stop();
    }
  };

  const handleSubmit = async () => {
    await onSubmit(answer.trim());
    setAnswer('');
  };

  return (
    <div className="item c h-[100%] flex flex-col justify-center items-center" data-swapy-item="c">
      <textarea
        className="w-full h-3/4 bg-transparent border-0 text-white resize-none overflow-y-auto p-2"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex space-x-4 mt-4">
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded ${isRecording ? 'bg-red-500' : ''}`}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
