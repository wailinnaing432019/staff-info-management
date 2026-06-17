<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeEmployment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // ၁။ စုစုပေါင်း ဝန်ထမ်းအရေအတွက်နှင့် ကျား/မ ခွဲခြားမှု
        $totalEmployees = Employee::count();
        $maleCount = Employee::where('gender', 'ကျား')->count();
        $femaleCount = Employee::where('gender', 'မ')->count();

        // ၂။ သင်ကြားရေးဌာန စုစုပေါင်းအရေအတွက် 
        // 💡 EmployeeEmployment table ထဲက department column ကို group လုပ်ပြီး ရေတွက်ခြင်း
        $totalDepartments = EmployeeEmployment::whereNotNull('department')
                                    ->distinct('department')
                                    ->count('department') ?: 0; // ဒေတာမရှိသေးပါက default 5 ပြရန်

         
        $recentAwards = Employee::has('awardsReceived')->count();

        // ၄။ ပြစ်ဒဏ် / အရေးယူမှုမှတ်တမ်း ရှိနေသည့် ဝန်ထမ်းအရေအတွက်
        // 💡 EmployeeEmployment ထဲက penalty_detail တွင် 'မရှိ' ဟု မဟုတ်ဘဲ စာသားတစ်ခုခု ရှိနေသူများကို ရေတွက်ခြင်း
        $activePenalties = EmployeeEmployment::whereNotNull('penalty_detail')
                                    ->where('penalty_detail', '!=', 'မရှိ')
                                    ->where('penalty_detail', '!=', '')
                                    ->count();

 
        $departmentsData = EmployeeEmployment::select('department as name', DB::raw('count(*) as count'))
            ->whereNotNull('department')
            ->groupBy('department')
            ->orderBy('count', 'desc')
            ->get();

        $departmentWise = $departmentsData->map(function ($dept) use ($totalEmployees) {
            $percentage = $totalEmployees > 0 ? round(($dept->count / $totalEmployees) * 100) : 0;
            return [
                'name' => $dept->name,
                'count' => $dept->count,
                'percentage' => $percentage . '%'
            ];
        })->toArray();

 
        $alerts = [];
        
 
        $recentEmp = Employee::with('employment')->orderBy('created_at', 'desc')->first();
        if ($recentEmp && $recentEmp->employment) {
            $alerts[] = [
                'id' => 1,
                'type' => 'success',
                'text' => "ဝန်ထမ်းအသစ်ဖြစ်သော '{$recentEmp->name}' (ရာထူး- " . ($recentEmp->employment->position ?? '-') . ") ၏ ကိုယ်ရေးအကျဉ်းကို စနစ်ထဲသို့ အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ။"
            ];
        }

        // သတိပေးချက် (၂) - ပြစ်ဒဏ်မှတ်တမ်း ရှိနေသူများအား သတိပေးရန်
        if ($activePenalties > 0) {
            $alerts[] = [
                'id' => 2,
                'type' => 'warning',
                'text' => "သတိပြုရန်- လက်ရှိစနစ်အတွင်း ဝန်ထမ်းရေးရာ ပြစ်ဒဏ်/အရေးယူမှု အသေးစိတ်မှတ်တမ်းရှိသူ ဝန်ထမ်း ({$activePenalties}) ဦး ရှိနေပါသည်။"
            ];
        }

        // အကယ်၍ ပြစရာ Alert မရှိသေးပါက ပြမည့် Default စာသား
        if (empty($alerts)) {
            $alerts = [
                ['id' => 1, 'type' => 'success', 'text' => 'လက်ရှိတွင် ထူးခြားသော ဝန်ထမ်းရေးရာ ပြောင်းလဲမှု သတိပေးချက်များ မရှိသေးပါ။'],
            ];
        }

        // 📦 အချက်အလက်များကို React Dashboard Component ဆီသို့ ပို့ဆောင်ခြင်း
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalEmployees'  => $totalEmployees,
                'maleCount'       => $maleCount,
                'femaleCount'     => $femaleCount,
                'totalDepartments'=> $totalDepartments,
                'recentAwards'    => $recentAwards,
                'activePenalties' => $activePenalties,
                'departmentWise'  => $departmentWise,
                'alerts'          => $alerts,
            ]
        ]);
    }
}