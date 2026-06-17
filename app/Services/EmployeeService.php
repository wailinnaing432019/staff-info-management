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
        $employee->referee()->create($storeData);
 
            if (!empty($storeData['educations'])) {
                $employee->educations()->createMany($storeData['educations']);
                 
            }

            
            if (!empty($storeData['trainings'])) {
                $employee->trainings()->createMany($storeData['trainings']);
                
            }
 
            if (!empty($storeData['service_records'])) {
                $employee->serviceRecords()->createMany($storeData['service_records']);
            }

            
            if (!empty($storeData['families'])) {
                $employee->familyMembers()->createMany($storeData['families']);
            }

            
            if (!empty($storeData['abroad_visits'])) {
                $employee->abroadVisits()->createMany($storeData['abroad_visits']);
                
            }
 
 
            if (!empty($storeData['awards'])) {
                $employee->awardsReceived()->createMany($storeData['awards']);
            }

            
            if (!empty($storeData['legal_records'])) {
                $employee->courtDisciplinaryActions()->createMany($storeData['legal_records']);
            }

            
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
            'abroadVisits',
            'referee'
        ])->findOrFail($id);
    }
}