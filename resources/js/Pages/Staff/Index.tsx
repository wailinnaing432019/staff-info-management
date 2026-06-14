import React, { useState, useEffect, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Message from './components/Message';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Eye, PencilLine, Trash, User2, UserIcon } from 'lucide-react';

export default function Index({ employees, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const isFirstRender = useRef(true);
    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                '/employees',
                { search: search },
                { preserveState: true, replace: true }
            );
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleDelete = (id, name) => {
        if (confirm(`ဝန်ထမ်း "${name}" ကို တကယ်ပဲ ဖျက်မှာ သေချာပါသလား?`)) {
            router.delete(`/employees/${id}`);
        }
    };

    const getMyanmarWords = (name, count = 1) => {
        if (!name) return '';
        try {

            const segmenter = new Intl.Segmenter('my', { granularity: 'word' });
            const segments = segmenter.segment(name);


            const words = Array.from(segments)
                .map(s => s.segment)
                .filter(w => w.trim() !== '');


            return words.slice(0, count).join('');
        } catch (e) {

            return name.substring(0, 4);
        }
    };
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Employee</h2>}
        >
            <Head title="Employees" />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">


                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold text-gray-800 flex "><User2 className='mr-2' /> ဝန်ထမ်းများ စာရင်းစနစ်</h2>
                        <div className="w-full md:w-80">
                            <input
                                type="text"
                                placeholder="ဝန်ထမ်းအမည်ဖြင့် ရှာဖွေရန်..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* 📊 Employee Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b">
                                <tr>
                                    <th className="p-3 text-center">စဉ်</th>
                                    <th className="p-3">ဝန်ထမ်းအမှတ်</th>
                                    <th className="p-3">အမည်</th>
                                    <th className="p-3">License</th>
                                    <th className="p-3 text-center">ကျား/မ</th>
                                    <th className="p-3">မွေးသက္ကရာဇ်</th>
                                    <th className="p-3">လူမျိုး</th>
                                    <th className="p-3">ဘာသာ</th>
                                    <th className="p-3">မှတ်ပုံတင်အမှတ် </th>
                                    <th className="p-3">အဖအမည်</th>
                                    <th className="p-3 text-center">လုပ်ဆောင်ချက်</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employees.data.length > 0 ? (
                                    employees.data.map((emp, index) => (
                                        <tr key={emp.id} className="hover:bg-gray-50">
                                            <td className="p-3 text-center text-gray-400 font-mono">
                                                {employees.from + index}
                                            </td>
                                            <td className="p-3 font-semibold text-gray-900 font-mono">{emp.staff_number || '-'}</td>
                                            <td className="p-3 font-bold text-indigo-600">{emp.name}</td>
                                            <td className="p-3 font-bold text-indigo-600">


                                                {emp.info && emp.info.image_path ? (
                                                    <a
                                                        href={`/storage/${emp.info.image_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={`/storage/${emp.info.image_path}`}
                                                            alt={emp.name}
                                                            // 💡 border-1 အစား Tailwind ရဲ့ border အမှန်ကို သုံးထားပါတယ် (w-12 h-12 ဆိုပြီး အချိုးညီဝိုင်းရင် ပိုလှပါတယ် ဆရာ)
                                                            className="w-16 h-12 rounded border border-slate-400 object-cover transition-transform duration-200 hover:scale-110"
                                                        />
                                                    </a>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                                                        {getMyanmarWords(emp.name, 1)}
                                                    </div>
                                                )}

                                            </td>
                                            <td className="p-3 text-center">{emp.gender}</td>
                                            <td className="p-3 font-mono text-xs">{emp.date_of_birth || '-'}</td>
                                            <td className="p-3">{emp.race || '-'}</td>
                                            <td className="p-3">{emp.religion || '-'}</td>
                                            <td className="p-3 text-xs font-semibold">{emp.nrc_state && `${emp.nrc_state}/`}
                                                {emp.nrc_township || ''}
                                                {emp.nrc_type && `(${emp.nrc_type})`}
                                                {emp.nrc_number ? ` ${emp.nrc_number}` : '-'}</td>
                                            <td className="p-3">{emp.father_name || '-'}</td>
                                            <td className="p-3 text-center">
                                                <div className=' flex items-center justify-center gap-2'>
                                                    <Link href={`/employees/${emp.id}`} className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md"><Eye size={16} /></Link>
                                                    <Link href={`/employees/${emp.id}/edit`} className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md"><PencilLine size={16} /></Link>
                                                    <button onClick={() => handleDelete(emp.id, emp.name)} className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md"><Trash size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="p-8 text-center text-gray-400">ရှာဖွေထားသော ဝန်ထမ်းအမည် မရှိပါဗျာ။</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 📄 Pagination Links */}
                    <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                        <div>စုစုပေါင်း ဝန်ထမ်း <span className="font-bold text-gray-800">{employees.total}</span> ဦး ရှိပါသည်။</div>
                        <div className="flex gap-1">
                            {employees.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 border rounded-md ${link.active
                                        ? 'bg-black text-white border-black font-bold'
                                        : 'bg-white hover:bg-gray-100 text-gray-600'
                                        } ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}