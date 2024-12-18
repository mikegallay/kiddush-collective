"use client";

import React, { useState, useRef } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription,DrawerClose
  } from "@/components/ui/drawer"
import MyInput from "@/app/components/ui/Input"; // Your file upload component
// import { useToast } from "@/components/ui/use-toast"; // Optional Toasts for user feedback
import AudioRecorder from "@/app/components/AudioRecorder";
import { Button } from "@/components/ui/button";
import { UploadFormProps } from "../data/globalProps";
import { customInputClasses } from "../utils/customClasses";
import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"



const AudioInput = ({ localeData, translations, id, formProps, ...props }: any) => {
  // const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isMicAccessible, setIsMicAccessible] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);  // Ref for the file input

  const { toast } = useToast();

  // Handles file upload input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('uploaded',file);
    
    if (file) {
      setUploadedFile(file);
      setAudioURL(null); // Disable recording if a file is uploaded
    }
  };

  // Removes uploaded file
  const clearUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';  // Reset the file input
    }
  };

  // Removes recorded audio
  const clearRecordedAudio = () => {
    setAudioURL(null);
    // setRecording(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    // clearRecordedAudio();
  };

  const checkMicPermissions = async () => {
    console.log('check mikc');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop stream to free resources
      setIsMicAccessible(true);
    } catch {
      setIsMicAccessible(false);
      // console.log("Microphone access denied. Please allow mic to record.");
      // alert('Microphone access denied. Please allow mic to record.')
      toast({
        variant: "destructive",
        title: localeData.recordToastTitle,
        description: localeData.recordToastDescription,
      })
    //   toast({ title: "Microphone access denied. Please allow mic to record." });
    }
  };
  
  const handleRecording = (recording: boolean) => {
    setIsRecording(recording)
  };

  const handleRecordingComplete = (url: string | null, blob: Blob | null) => {
    setAudioURL(url);
    setAudioData(blob);
    formProps.setValue("blob", blob)
};

  const onClick = () => {
    // console.log('on click');
    if (audioURL) clearRecordedAudio();
  }

  return (
    <div className="flex gap-6 flex-row">
      <div className="flex-1 max-w-[589px] relative">
        <div className="flex flex-col gap-2">
          <p className="text-sm -mb-[5px]">{localeData.recordAudio}</p>
          <Drawer>
            <DrawerTrigger asChild>
              <Button disabled={!!uploadedFile} variant="outline" onClick={() => {
              checkMicPermissions().then(() => setDrawerOpen(true));
            }} className={`justify-start ${customInputClasses}`}>{audioURL ? <>{audioURL}</>  : localeData.recordAudioButton}</Button>
            </DrawerTrigger>
            <DrawerContent data-vaul-no-drag>
              <DrawerHeader dir={props.dir ? props.dir : 'ltr'} className={props.dir && props.dir==='rtl' ? 'sm:text-center md:text-right' : ''}>
                <DrawerTitle>{localeData.recordDrawerTitle}</DrawerTitle>
                <DrawerDescription>{localeData.recordDrawerDescription}</DrawerDescription>
              </DrawerHeader>
              <AudioRecorder 
                onComplete={handleRecordingComplete} 
                onRecording={handleRecording}
                preRecorded={audioURL} 
                preData={audioData}
                translations={{startBtn: localeData.recordAudioStart, stopBtn: localeData.recordAudioStop, rerecordBtn: localeData.recordAudioRerecord}}
              />

              <div className="p-3">
                <div className="flex justify-center gap-3">
                <DrawerClose asChild>
                    <Button
                      size="lg"
                      className="w-1/2"
                      variant={audioURL ? 'destructive' : 'outline'}
                      onClick={() => onClick()}
                    >{audioURL ? localeData.recordAudioDeleteCancel  : localeData.recordAudioCancel}</Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button
                      size="lg"
                      className="w-1/2"
                      disabled={!!isRecording}
                    >{localeData.recordAudioAccept}</Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <span className='text-gray-500 font-medium text-xs -mt-1 italic'>{localeData.recordAudioInfo}</span>
        </div>
        {audioURL && (
          <div className="absolute top-0 right-0">
            <button className="text-red-700 text-sm flex flex-row items-center gap-1" onClick={clearRecordedAudio}>{localeData.recordRemove}<CrossCircledIcon/></button>
          </div>
        )}
      </div>
     

      {/* File Upload Input */}
      <div className="flex-1 max-w-[589px] relative">
        <MyInput
          label={localeData.uploadFile}
          id={id}
          type="file"
          name={id}
          accept="audio/*"
          ref={fileInputRef}
          description={localeData.uploadFileInfo}
          translations={translations}
          formProps={formProps}
          disabled={!!audioURL} // Disable file upload if recording exists
          onChange={handleFileChange}
        />

        {uploadedFile && (
          <div className="absolute top-0 right-0">
            <button className="text-red-700 text-sm flex flex-row items-center gap-1" onClick={clearUploadedFile}>{localeData.uploadRemove} <CrossCircledIcon/></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioInput;
