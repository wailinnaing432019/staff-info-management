export default function Referee({ data, setData }) {
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


            <div className="col-span-1 md:col-span-3 border-b pb-1 mt-2">
                <h3 className="text-base font-bold text-blue-800">ဝန်ထမ်း၏ လုပ်ရည်ကိုင်ရည်နှင့်အကျင့်စာရိတ္တထောက်ခံသူ</h3>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">အမည်</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.referee_name} onChange={e => setData('referee_name', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ရာထူး</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.referee_position} onChange={e => setData('referee_position', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ဌာန</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.referee_department} onChange={e => setData('referee_department', e.target.value)} />
            </div>



            <div className="col-span-1 md:col-span-3 border-b pb-1 mt-4">
                <h3 className="text-base font-bold text-blue-800">ပါမောက္ခချုပ်/ ကျောင်းအုပ်ကြီး</h3>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">အမည်</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.rector_name} onChange={e => setData('rector_name', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ရာထူး</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.rector_position} onChange={e => setData('rector_position', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ဌာန</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.rector_department} onChange={e => setData('rector_department', e.target.value)} />
            </div>



            <div className="col-span-1 md:col-span-3 border-b pb-1 mt-4">
                <h3 className="text-base font-bold text-blue-800">ဌာနအကြီးအကဲ</h3>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">အမည်</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.dept_head_name} onChange={e => setData('dept_head_name', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ရာထူး</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.dept_head_position} onChange={e => setData('dept_head_position', e.target.value)} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ဌာန</label>
                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.dept_head_department} onChange={e => setData('dept_head_department', e.target.value)} />
            </div>

        </div>
    );
}