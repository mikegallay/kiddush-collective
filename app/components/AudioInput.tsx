"use client";

import React, { useState, useEffect } from "react";
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
import { PlusIcon } from "@radix-ui/react-icons";


const AudioInput = ({ localeData, translations, id, formProps }: any) => {
    // const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [audioData, setAudioData] = useState<Blob | null>(null);
    const [isMicAccessible, setIsMicAccessible] = useState(true);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

//   const toast = useToast();

  const location = 'hi'

  // Handles file upload input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setAudioURL(null); // Disable recording if a file is uploaded
    }
  };

  // Removes uploaded file
  const clearUploadedFile = () => {
    setUploadedFile(null);
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
      console.log("Microphone access denied. Please allow mic to record.");
      alert('Microphone access denied. Please allow mic to record.')
    //   toast({ title: "Microphone access denied. Please allow mic to record." });
    }
  };
  
const handleRecordingComplete = (url: string | null, blob: Blob | null) => {
    setAudioURL(url);
    setAudioData(blob);
    formProps.setValue("blob", blob)

// setDrawerOpen(false);
// setUploadedFile(null); // Disable file upload if recording is done
};

function onClick() {
  console.log('on click');
  
  if (audioURL) clearRecordedAudio();
    // setValue("specific_location", location)
}

  

  return (
    <div>
      {/* File Upload Input */}
      <MyInput
        label={localeData.uploadFile}
        id={id}
        type="file"
        name={id}
        accept="audio/*"
        description={localeData.uploadFileInfo}
        translations={translations}
        formProps={formProps}
        disabled={!!audioURL} // Disable file upload if recording exists
        onChange={handleFileChange}
      />

      {/* <MyInput label={localeData.uploadFile} id="file" type="file" name="file" accept="audio/*" description={localeData.uploadFileInfo} translations={translations} formProps={{register, errors}}/> */}


      {uploadedFile && (
        <div>
          <p>{`Uploaded file: ${uploadedFile.name}`}</p>
          <button onClick={clearUploadedFile}>Remove Uploaded File</button>
        </div>
      )}

      {/* Audio Recording Option */}

      {/* {recordingDrawer(register,setValue,localeData)} */}
      

      {/* Drawer for Audio Recording */}
      {/* <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        <AudioRecorder onComplete={handleRecordingComplete} />
      </Drawer> */}

      <Drawer >
        <DrawerTrigger asChild>
          <Button variant="outline"  onClick={() => {
          checkMicPermissions().then(() => setDrawerOpen(true));
        }} className={`justify-start w-full ${customInputClasses}`}>{audioURL ? <>{audioURL}</>  : `I want to record my own`}</Button>
        </DrawerTrigger>
        <DrawerContent data-vaul-no-drag>
          <DrawerHeader>
            <DrawerTitle>{localeData.mapDrawerTitle}</DrawerTitle>
            <DrawerDescription>{localeData.mapDrawerDescription}</DrawerDescription>
          </DrawerHeader>
          <AudioRecorder onComplete={handleRecordingComplete} preRecorded={audioURL} preData={audioData} />

         

    {/* {audioURL && (
        <div>
          <audio src={audioURL} controls />
          <button onClick={clearRecordedAudio}>Remove Recorded Audio</button>
        </div>
      )} */}
          <div className="p-3">
            <div className="flex justify-center gap-3">
             <DrawerClose asChild>
                <Button
                  size="lg"
                  className="w-1/2"
                  variant={audioURL ? 'destructive' : 'outline'}
                  onClick={() => onClick()}
                >{`${audioURL ? 'Delete &' : ''} ${localeData.cancelButton}`}</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button
                  size="lg"
                  className="w-1/2"
                  
                  
                >{localeData.makeSelectionButton}</Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AudioInput;
