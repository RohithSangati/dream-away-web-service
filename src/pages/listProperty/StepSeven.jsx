import { useEffect, useState } from "react";
import InputField from "../../components/field/InputField";

const StepSeven = ({ formData, setFormData }) => {
  const [key, setKey] = useState(1);
  useEffect(() => {
    setKey(key + 1);
  }, []);
  return (
    <div key={key} className="flex-grow flex flex-col">
      <div className="text-[18px] font-[600] text-gray-800 text-center">
        Enter Your Banking details
      </div>
      <div className="flex gap-10 pt-15 flex-wrap">
        <InputField
          label={"Account Number"}
          width={"500px"}
          name={"accountNumber"}
          value={formData?.accountNumber ?? null}
          onChange={(e) =>
            setFormData({ ...formData, accountNumber: e.target.value })
          }
        />
        <InputField
          label={"Confirm Account Number"}
          width={"500px"}
          name={"confirmAccountNumber"}
          value={formData?.confirmAccountNumber ?? null}
          onChange={(e) =>
            setFormData({ ...formData, confirmAccountNumber: e.target.value })
          }
        />
      </div>
      <div className="flex gap-10 pt-10 flex-wrap">
        <InputField
          label={"IFSC code"}
          width={"500px"}
          name={"ifscCode"}
          value={formData?.ifscCode ?? null}
          onChange={(e) =>
            setFormData({ ...formData, ifscCode: e.target.value })
          }
        />
        <InputField
          label={"Bank Name"}
          width={"500px"}
          name={"bankName"}
          value={formData?.bankName ?? null}
          onChange={(e) =>
            setFormData({ ...formData, bankName: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default StepSeven;
