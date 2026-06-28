import toMyanmarNumber from "@/util/numberHelper";

export default function FamilyTable55({ title, familiesData = [] }) {
    return (
        <div className="keep-together pt-2">
            <p className=" mb-2">{title}</p>
            <table className="w-full border-collapse text-center">
                <thead>
                    <tr className="bg-gray-50 font-semibold">
                        <th className="w-12">စဉ်</th>
                        <th>အမည်</th>
                        <th>လူမျိုး/ဘာသာ</th>
                        <th>ဇာတိ</th>
                        <th>အလုပ်အကိုင်</th>
                        <th>နေရပ်လိပ်စာ</th>
                    </tr>
                </thead>
                <tbody>
                    {familiesData?.length > 0 ? (
                        familiesData.map((s, idx) => (
                            <tr key={idx}>
                                <td>{toMyanmarNumber(idx + 1)}</td>
                                <td>{s.relation_name}</td>
                                <td>{s.race_and_religion}</td>
                                <td>{s.native_town}</td>
                                <td>{s.occupation}</td>
                                <td>{s.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
