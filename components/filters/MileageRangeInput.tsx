"use client";

type MileageRangeInputProps = {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export default function MileageRangeInput({
  from,
  to,
  onFromChange,
  onToChange,
}: MileageRangeInputProps) {
  return (
    <div className="w-full">
      <label className="field-label font-body-2">Car mileage / km</label>
      <div className="flex overflow-hidden rounded bg-inputs">
        <input
          className="w-1/2 bg-white px-6 py-3 text-base/5 text-main placeholder:text-main outline-none focus:bg-white"
          placeholder="From"
          inputMode="numeric"
          value={from}
          onChange={(e) => onFromChange(e.target.value.replace(/\D/g, ""))}
        />
        <div className=" w-px bg-gray-light" />
        <input
          className="w-1/2 bg-white px-6 py-3 text-base/5 text-main placeholder:text-main outline-none focus:bg-white"
          placeholder="To"
          inputMode="numeric"
          value={to}
          onChange={(e) => onToChange(e.target.value.replace(/\D/g, ""))}
        />
      </div>
    </div>
  );
}