import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import faqs from "../../constants/faqs";

const Faqs = () => {
  const [show, setShow] = useState([]);
  return (
    <div>
      <div className="mt-3 py-3 w-[900px] mx-auto flex border border-gray-200 rounded-[10px]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center pb-8 pt-4 px-10">
            <div className="flex flex-col">
              <div className="text-gray-700 text-[20px] font-[600]">
                Frequently Asked Questions
              </div>
              <div className="text-[13px]">
                Find quick answers to common queries below.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center px-10 py-2 w-[880px]">
            {faqs.map((faq, index) => {
              return (
                <div className="w-full">
                  <div className="text-[14px] flex items-center justify-between border-1 border-gray-100 px-4 py-3 rounded-[4px] hover:border-gray-200 transition-all duration-200 shadow-2xs">
                    <div className="w-full flex flex-col gap-2">
                      <div className="text-[15px] flex justify-between font-[600]">
                        {faq.question}
                        {!show[index] && (
                          <LuPlus
                            className="cursor-pointer text-[20px] p-0.5 hover:bg-gray-100 hover:border hover:border-gray-100 rounded-full"
                            onClick={() => setShow({ [index]: !show[index] })}
                          />
                        )}
                        {show[index] && (
                          <RxCross2
                            className="cursor-pointer text-[20px] p-0.5 hover:bg-gray-100 hover:border hover:border-gray-100 rounded-full"
                            onClick={() => setShow({ [index]: !show[index] })}
                          />
                        )}
                      </div>
                      {show[index] && (
                        <div className="text-[13px]">{faq.answer}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
