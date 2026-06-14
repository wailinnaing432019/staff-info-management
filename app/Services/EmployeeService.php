<?php

namespace App\Services;

use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class EmployeeService
{
    public function createEmployee(array $storeData)
    {
        // dd("HELLO IGO");
        return DB::transaction(function () use ($storeData) {
            
            // ၁။ အဓိက Employee မူရင်း Table သိမ်းခြင်း
            // (Request ထဲတွင် Object ခွဲမထားဘဲ တန်းပါလာသဖြင့် ၎င်းထဲမှ တိုက်ရိုက်ယူသိမ်းပါမည်)
             $employee = Employee::create($storeData);
            $employee->physical()->create($storeData);
        $employee->info()->create($storeData);
        $employee->employment()->create($storeData);
        $employee->foreignVisitedPurpose()->create($storeData);

            // ၃။ One-to-Many Arrays (ဇယားကွက်များ သိမ်းခြင်း)

            // ပညာရေး (Education) - Request 'title' ကို Model 'degree_name' သို့ ပြောင်းလဲသိမ်းဆည်းခြင်း
            if (!empty($storeData['educations'])) {
                $employee->educations()->createMany($storeData['educations']);
                 
            }

            // သင်တန်းများ (Training) - Request 'learn_from' ကို Model 'from_date' သို့ ပြောင်းလဲခြင်း
            if (!empty($storeData['trainings'])) {
                $employee->trainings()->createMany($storeData['trainings']);
                
            }

            // တာဝန်ထမ်းဆောင်မှု (Service Record)
            if (!empty($storeData['service_records'])) {
                $employee->serviceRecords()->createMany($storeData['service_records']);
            }

            // မိသားစုဝင်များ (Family Member)
            if (!empty($storeData['families'])) {
                $employee->familyMembers()->createMany($storeData['families']);
            }

            // နိုင်ငံခြားခရီးစဉ် (Abroad Visit)  
            if (!empty($storeData['hasVisitedAbroad'])) {
                $employee->abroadVisits()->createMany($storeData['hasVisitedAbroad']);
                
            }
 

            // ဆုလာဘ်များ (Award Received)
            if (!empty($storeData['awards'])) {
                $employee->awardsReceived()->createMany($storeData['awards']);
            }

            // ဌာနဆိုင်ရာ/တရားရုံး အရေးယူမှု (Court Disciplinary Action)
            if (!empty($storeData['legal_records'])) {
                $employee->courtDisciplinaryActions()->createMany($storeData['legal_records']);
            }

            // ရာဇဝတ်မှုမှတ်တမ်း (Criminal Record)
            if (!empty($storeData['criminal_records'])) {
                $employee->criminalRecords()->createMany($storeData['criminal_records']);
            }

            return $employee;
        });
    }

    public function getEmployeeWithFormats(int $id)
    {
        return Employee::with([
            'physical',
            'info',
            'employment',
            'educations',
            'trainings',
            'familyMembers',
            'foreignVisitedPurpose',
            'courtDisciplinaryActions',
            'criminalRecords',
            'serviceRecords',
            'awardsReceived',
            'abroadVisits'
        ])->findOrFail($id);
    }
}