import { LuMapPin } from "react-icons/lu";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { TbSend } from "react-icons/tb";
import SendContactMessage from "./SendContactMessage";
import { useState } from "react";

const GetInTouch = () => {
  const [showSendContactMessageForm, setShowSendContactMessageForm] =
    useState(false);
  return (
    <div>
      <div className="mt-3 py-3 w-[900px] flex border border-gray-200 rounded-[10px]">
        <div className="flex flex-col flex-grow min-w-full">
          <div className="flex justify-between items-center pb-8 pt-4 px-10">
            <div className="flex flex-col">
              <div className="text-gray-700 text-[20px] font-[600]">
                Let's get in touch
              </div>
              <div className="text-[13px]">
                We're open for any suggestion or just to have a chat
              </div>
            </div>
            <div
              className="btn-primary flex gap-2 items-center justify-center"
              onClick={() => setShowSendContactMessageForm(true)}
            >
              <TbSend className="text-[18px]" />
              <div>Send us a message</div>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-2 items-center px-10 py-2 w-[50%]">
              <LuMapPin className="w-8 h-8" />
              <div className="flex flex-col">
                <div className="font-[600] text-[15px]">Address</div>
                <div className="text-[14px]">
                  Stree No 7, Musalipedu, Kandadu, Yerpedu, Tirupati, Andhra
                  Pradesh, India
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center px-10 py-2 w-[50%]">
              <MdOutlinePhoneInTalk className="w-6 h-6" />
              <div className="flex flex-col">
                <div className="font-[600] text-[15px]">Phone</div>
                <div className="text-[14px]">+91-9701755690</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-2 items-center px-10 py-2 w-[50%]">
              <SiMinutemailer className="w-6 h-6" />
              <div className="flex flex-col">
                <div className="font-[600] text-[15px]">Email</div>
                <div className="text-[14px]">rohithkumar45@gamil.com</div>
              </div>
            </div>
            <div className="flex gap-2 items-center px-10 py-2 w-[50%]">
              <TbWorldWww className="w-6 h-6" />
              <div className="flex flex-col">
                <div className="font-[600] text-[15px]">Website</div>
                <div className="text-[14px]">www.dreamaway.com</div>
              </div>
            </div>
          </div>
          <div className="w-full p-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31019.687006483924!2d79.62650541159567!3d13.629705809211938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d46ca5eb2dcd9%3A0xaabf38e0b5deff68!2sMusalipedu%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1757330848587!5m2!1sen!2sin"
              className="border-0 w-full h-[400px]"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      {showSendContactMessageForm && (
        <SendContactMessage
          setShowSendContactMessageForm={setShowSendContactMessageForm}
        />
      )}
    </div>
  );
};

export default GetInTouch;
