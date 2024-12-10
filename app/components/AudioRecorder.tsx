"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";

const AudioRecorder = ({ onComplete, preRecorded = null, preData = null }: { onComplete: (audioURL: string | null, audioData: Blob | null) => void; preRecorded?: string | null; preData?: Blob | null }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(preRecorded);
    const [audioData, setAudioData] = useState<Blob | null>(preData);
    // const [isMicAccessible, setIsMicAccessible] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]); // Use a ref to avoid async state issues.
    
    // const checkMicPermissions = async () => {
    //     try {
    //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //       stream.getTracks().forEach((track) => track.stop()); // Stop stream to free resources
    //       setIsMicAccessible(true);
    //       startRecording();
    //     } catch {
    //       setIsMicAccessible(false);
    //       console.log("Microphone access denied. Please allow mic to record.");
    //       alert('Microphone access denied. Please allow mic to record.')
    //     //   toast({ title: "Microphone access denied. Please allow mic to record." });
    //     }
    //   };

    const startRecording = async () => {
    // if (!isMicAccessible) {
    //     checkMicPermissions()
    // }else{

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Stream tracks:", stream.getTracks());
  
        const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/ogg;codecs=opus";
  
        const recorder = new MediaRecorder(stream, { mimeType });
        setMediaRecorder(recorder);
        audioChunksRef.current = []; // Clear previous chunks.
  
        recorder.ondataavailable = (event) => {
          console.log("Data available:", event.data.size, event.data.type);
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
  
        recorder.onstop = () => {
          console.log("Recording stopped. Processing audio...");
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            console.log("Audio Blob:", audioBlob);
  
            if (audioBlob.size > 0) {
              const generatedURL = URL.createObjectURL(audioBlob);
              console.log("Generated Audio URL:", generatedURL);
              setAudioData(audioBlob);
              setAudioURL(generatedURL);
              onComplete(generatedURL,audioBlob);
            } else {
              console.error("Recording failed. Blob size is 0.");
            }
          } else {
            console.error("No audio chunks captured.");
          }
        };

        setTimeout(() => {
            recorder.stop(); // Automatically stop after a fixed duration
            setIsRecording(false);
          }, 30000); // Limit to 30 seconds
  
        recorder.start();
        setIsRecording(true);
        console.log("Recording started...");
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    // }
    };
  
    const stopRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
        console.log("Recording stopped.");
      }
    };

    const deleteRecording = () => {
        setMediaRecorder(null);
        setAudioURL(null);
        setAudioData(null);
        onComplete(null, null);
        setIsRecording(false);
        audioChunksRef.current = [];
    };

    
  
    return (
      <div className="px-4 flex flex-row gap-4 items-center">
        <Button onClick={isRecording 
                ? stopRecording
                : audioURL 
                    ? deleteRecording
                    : startRecording
            }>
            {isRecording 
                ? 'Stop Recording'
                : audioURL 
                    ? 'Re-Record'
                    : 'Start Recording'
            }
        </Button>

        {isRecording && <div className="rounded-full bg-red-700 pulse w-5 h-5" />}
        {audioURL && <audio src={audioURL} controls />}
      </div>
    );
  };

export default AudioRecorder;
