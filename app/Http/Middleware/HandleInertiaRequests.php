<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
            'success' => fn () => $request->session()->get('success'),
            'error'   => fn () => $request->session()->get('error'),
        ],
        'sharedAlerts' => function () {
            if (!auth()->check()) return [];

            $alerts = [];
            
            // ၁။ ဝန်ထမ်းအသစ် ဝင်ရောက်မှု သတိပေးချက်
            $recentEmp = \App\Models\Employee::with('employment')->orderBy('created_at', 'desc')->first();
            if ($recentEmp && $recentEmp->employment) {
                $alerts[] = [
                    'id' => 'emp_new',
                    'type' => 'success',
                    'title' => 'ဝန်ထမ်းအသစ် ဝင်ရောက်ခြင်း',
                    'text' => "'{$recentEmp->name}' ({$recentEmp->employment->position}) ကို စနစ်ထဲသို့ ထည့်သွင်းပြီးပါပြီ။",
                    'time' => $recentEmp->created_at->diffForHumans()
                ];
            }

            // ၂။ ပြစ်ဒဏ်မှတ်တမ်း ရှိနေသူများအား သတိပေးရန်
            $activePenalties = \App\Models\EmployeeEmployment::whereNotNull('penalty_detail')
                ->where('penalty_detail', '!=', 'မရှိ')
                ->where('penalty_detail', '!=', '')
                ->count();
                
            if ($activePenalties > 0) {
                $alerts[] = [
                    'id' => 'penalty_alert',
                    'type' => 'warning',
                    'title' => 'သတိပြုရန် မှတ်တမ်း',
                    'text' => "စနစ်အတွင်း ပြစ်ဒဏ်မှတ်တမ်းရှိသူ ဝန်ထမ်း ({$activePenalties}) ဦး ရှိနေပါသည်။",
                    'time' => 'ယခုလက်ရှိ'
                ];
            }

            return $alerts;
        },
        ];
    }
}
