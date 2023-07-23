import { currencyFormater } from "@/lib/utils";

const ExpenseItem = ({ color, title, amount }) => {
  return (
    <button>
      <div className="flex justify-between p-4 bg-slate-700 rounded-3xl">
        <div className="flex gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <h4 className="capitalize">{title}</h4>
        </div>
        <p>{currencyFormater(amount)}</p>
      </div>
    </button>
  );
};

export default ExpenseItem;
